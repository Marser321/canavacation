import type { VercelRequest, VercelResponse } from '@vercel/node';
import { products, type PlanKey } from '../../src/data/products.js';
import { PICKUP_ZONES } from '../../src/config.js';
import { calculateQuote, getPaymentAmounts, type PaymentChoice, type QuoteBreakdown } from '../../src/lib/quote.js';

const GHL_BASE = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';
const BUSINESS_NAME = 'Cana Vacations';
// Public invoice page host used by GHL when the send response doesn't include a URL.
const INVOICE_LINK_BASE = 'https://link.msgsndr.com/invoice';

const isValidEmail = (value: unknown): value is string =>
  typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const todayISODate = (): string => new Date().toISOString().split('T')[0];

const ghlHeaders = (apiKey: string) => ({
  Authorization: `Bearer ${apiKey}`,
  Version: GHL_VERSION,
  'Content-Type': 'application/json'
});

const buildItemDescription = (payload: any, quote: QuoteBreakdown, choice: PaymentChoice): string => {
  const parts = [
    `Fecha del tour: ${payload.trip?.date || 'a confirmar'}`,
    `Hotel: ${payload.trip?.hotel || '-'} (${quote.pickupZone})`,
    `Pasajeros: ${quote.adults} adultos, ${quote.children} niños, ${quote.infants} infantes`,
    `Total del tour: US$${quote.totalPrice}`
  ];
  if (choice === 'deposit') {
    parts.push(`Depósito 50% — saldo de US$${quote.balanceAfterDeposit} se paga en destino`);
  } else {
    parts.push('Pago total 100%');
  }
  return parts.join(' | ');
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const GHL_API_KEY = process.env.GHL_API_KEY;
  const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    console.error('Missing GHL_API_KEY or GHL_LOCATION_ID in environment variables.');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  const payload = req.body ?? {};
  const contactName = typeof payload.contact?.name === 'string' ? payload.contact.name.trim() : '';
  const contactEmail = payload.contact?.email;
  const contactPhone = typeof payload.contact?.phone === 'string' ? payload.contact.phone.trim() : '';

  if (!contactName || !isValidEmail(contactEmail) || !contactPhone) {
    return res.status(400).json({ message: 'Missing or invalid contact details (name, email, phone)' });
  }

  const product = products.find((p) => p.id === payload.trip?.productId);
  if (!product) {
    return res.status(400).json({ message: 'Unknown productId' });
  }

  const plan: PlanKey = payload.trip?.plan === 'vip' ? 'vip' : 'classic';
  const choice: PaymentChoice = payload.payment?.choice === 'full' ? 'full' : 'deposit';

  // Server-side price calculation: never trust amounts sent by the browser.
  const quote = calculateQuote(
    product,
    plan,
    {
      adults: Number(payload.travelers?.adults),
      children: Number(payload.travelers?.children),
      infants: Number(payload.travelers?.infants)
    },
    typeof payload.trip?.pickupZone === 'string' ? payload.trip.pickupZone : '',
    PICKUP_ZONES
  );
  const { amountDueNow, balanceDueAtDestination } = getPaymentAmounts(quote, choice);

  if (!(amountDueNow > 0)) {
    return res.status(400).json({ message: 'Quote resolved to a non-payable amount' });
  }

  const clientAmount = Number(payload.payment?.amountDueNow);
  if (Number.isFinite(clientAmount) && clientAmount !== amountDueNow) {
    console.warn(`Client amountDueNow (${clientAmount}) differs from server quote (${amountDueNow}); using server value.`);
  }

  const productTitle = product.es.title;

  try {
    // 1. Upsert Contact in GHL (V2 API)
    const contactRes = await fetch(`${GHL_BASE}/contacts/upsert`, {
      method: 'POST',
      headers: ghlHeaders(GHL_API_KEY),
      body: JSON.stringify({
        firstName: contactName.split(' ')[0],
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        locationId: GHL_LOCATION_ID
      })
    });

    if (!contactRes.ok) {
      console.error('GHL Contact Upsert Error:', await contactRes.text());
      return res.status(502).json({ success: false, message: 'Failed to create contact' });
    }

    const contactData = (await contactRes.json()) as any;
    const contactId = contactData.contact?.id || contactData.id;

    if (!contactId) {
      return res.status(502).json({ success: false, message: 'Failed to retrieve contact ID' });
    }

    // 2. Create Invoice in GHL (created as draft)
    const issueDate = todayISODate();
    const choiceLabel = choice === 'deposit' ? 'Depósito 50%' : 'Pago total';
    const invoiceRes = await fetch(`${GHL_BASE}/invoices/`, {
      method: 'POST',
      headers: ghlHeaders(GHL_API_KEY),
      body: JSON.stringify({
        altId: GHL_LOCATION_ID,
        altType: 'location',
        name: `Reserva ${productTitle} (${plan.toUpperCase()}) - ${choiceLabel}`,
        title: 'INVOICE',
        currency: 'USD',
        businessDetails: { name: BUSINESS_NAME },
        contactDetails: {
          id: contactId,
          name: contactName,
          email: contactEmail,
          phoneNo: contactPhone
        },
        issueDate,
        dueDate: issueDate,
        sentTo: { email: [contactEmail] },
        discount: { type: 'percentage', value: 0 },
        items: [
          {
            name: `${productTitle} - Plan ${plan.toUpperCase()} (${choiceLabel})`,
            description: buildItemDescription(payload, quote, choice),
            currency: 'USD',
            amount: amountDueNow,
            qty: 1,
            taxes: []
          }
        ]
      })
    });

    if (!invoiceRes.ok) {
      console.error('GHL Invoice Creation Error:', await invoiceRes.text());
      // Contact was captured; frontend shows the "we'll send you the payment link" fallback.
      return res.status(200).json({
        success: false,
        message: 'Contact created, but GHL failed to generate the invoice automatically.',
        paymentUrl: null
      });
    }

    const invoiceData = (await invoiceRes.json()) as any;
    const invoiceId = invoiceData._id || invoiceData.invoice?._id;

    if (!invoiceId) {
      console.error('GHL invoice created but no _id in response:', JSON.stringify(invoiceData).slice(0, 500));
      return res.status(200).json({ success: false, message: 'Invoice created without ID', paymentUrl: null });
    }

    // 3. Send the invoice: a draft invoice has no payable page until it is sent.
    // "send_manually" marks it sent without GHL emailing the customer (we redirect them ourselves).
    const sendRes = await fetch(`${GHL_BASE}/invoices/${invoiceId}/send`, {
      method: 'POST',
      headers: ghlHeaders(GHL_API_KEY),
      body: JSON.stringify({
        altId: GHL_LOCATION_ID,
        altType: 'location',
        action: 'send_manually',
        liveMode: true,
        sentFrom: { fromName: BUSINESS_NAME, fromEmail: 'reservas@canavacations.com' }
      })
    });

    let sendData: any = null;
    if (sendRes.ok) {
      sendData = await sendRes.json();
    } else {
      console.error('GHL Invoice Send Error (invoice stays draft):', await sendRes.text());
    }

    const paymentUrl =
      sendData?.invoice?.invoiceUrl ||
      sendData?.invoiceUrl ||
      `${INVOICE_LINK_BASE}/${invoiceId}`;

    return res.status(200).json({
      success: true,
      paymentUrl,
      invoiceId,
      amountDueNow,
      balanceDueAtDestination
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
