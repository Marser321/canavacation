import type { VercelRequest, VercelResponse } from '@vercel/node';

const GHL_BASE = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';
const GUIDE_TAG = 'lead-magnet';

const isValidEmail = (value: unknown): value is string =>
  typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const ghlHeaders = (apiKey: string) => ({
  Authorization: `Bearer ${apiKey}`,
  Version: GHL_VERSION,
  'Content-Type': 'application/json'
});

/**
 * Captures a guide request without exposing a GHL webhook in the browser.
 * The `lead-magnet` tag starts the corresponding GHL workflow, which sends
 * the guide email.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!apiKey || !locationId) {
    console.error('Missing GHL_API_KEY or GHL_LOCATION_ID in environment variables.');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  const email = req.body?.email;
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'A valid email address is required' });
  }

  try {
    const contactResponse = await fetch(`${GHL_BASE}/contacts/upsert`, {
      method: 'POST',
      headers: ghlHeaders(apiKey),
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        locationId,
        source: 'Cana Vacations website — Guia Punta Cana'
      })
    });

    if (!contactResponse.ok) {
      console.error('GHL lead magnet contact upsert failed:', await contactResponse.text());
      return res.status(502).json({ message: 'Could not save contact' });
    }

    const contactData = (await contactResponse.json()) as { contact?: { id?: string }; id?: string };
    const contactId = contactData.contact?.id ?? contactData.id;
    if (!contactId) {
      console.error('GHL lead magnet contact upsert returned no contact ID.');
      return res.status(502).json({ message: 'Could not identify contact' });
    }

    const tagResponse = await fetch(`${GHL_BASE}/contacts/${contactId}/tags`, {
      method: 'POST',
      headers: ghlHeaders(apiKey),
      body: JSON.stringify({ tags: [GUIDE_TAG] })
    });

    if (!tagResponse.ok) {
      console.error('GHL lead magnet tag failed:', await tagResponse.text());
      return res.status(502).json({ message: 'Could not start guide delivery' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('GHL lead magnet API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
