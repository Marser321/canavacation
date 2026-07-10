import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { CONFIG, PICKUP_ZONES } from '../config';
import { products } from '../data/products';
import { X, Calendar, ShieldAlert, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { extractPaymentUrl, readWebhookResponse } from '../lib/ghl';
import { BrandedSelect } from './BrandedSelect';
import {
  calculateQuote,
  formatUSD,
  getPaymentAmounts,
  getTodayDateInputValue,
  isPastDateInput,
  parseClampedNumber,
  TRAVELER_LIMITS
} from '../lib/quote';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
  plan?: 'classic' | 'vip';
  quoteData?: {
    adults: number;
    children: number;
    infants: number;
    pickupZone: string;
    totalPrice: number;
    depositAmount: number;
    balanceAmount: number;
  } | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  productId = '',
  plan = 'classic',
  quoteData = null
}) => {
  const { t, language } = useLanguage();

  // Selected tour states
  const [selectedTourId, setSelectedTourId] = useState(productId || products[0].id);
  const [selectedPlan, setSelectedPlan] = useState<'classic' | 'vip'>(plan || 'classic');

  // Step state
  const [step, setStep] = useState(1);

  // Form input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [hotel, setHotel] = useState('');
  const [pickupZone, setPickupZone] = useState(PICKUP_ZONES[0].name);
  
  // New CRM meeting fields
  const [country, setCountry] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [allergies, setAllergies] = useState('');
  
  // Checkbox T&C
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Payment Option selection (50% deposit vs 100% full)
  const [paymentChoice, setPaymentChoice] = useState<'deposit' | 'full'>('deposit');
  
  // Travelers (fallback when not coming from quoter)
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMode, setSuccessMode] = useState<'booking' | 'paymentLink'>('booking');
  const [dateError, setDateError] = useState('');

  // Sync inputs with props when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedTourId(productId || products[0].id);
      setSelectedPlan(plan || 'classic');
      setStep(1);
      setSuccess(false);
      setSuccessMode('booking');
      setDateError('');
      setAcceptTerms(false);
      setPaymentChoice('deposit');
      
      if (quoteData) {
        setAdults(quoteData.adults);
        setChildren(quoteData.children);
        setInfants(quoteData.infants);
        setPickupZone(quoteData.pickupZone);
      } else {
        setAdults(2);
        setChildren(0);
        setInfants(0);
        setPickupZone(PICKUP_ZONES[0].name);
      }
    }
  }, [isOpen, productId, plan, quoteData]);

  // Active tour and pricing models
  const tour = products.find(p => p.id === selectedTourId) || products[0];
  const quote = calculateQuote(tour, selectedPlan, { adults, children, infants }, pickupZone, PICKUP_ZONES);
  const paymentAmounts = getPaymentAmounts(quote, paymentChoice);
  const minTourDate = getTodayDateInputValue();
  const tourOptions = products.map((p) => ({
    value: p.id,
    label: language === 'es' ? p.es.title : p.en.title
  }));
  const planOptions = [
    { value: 'classic', label: 'Classic' },
    { value: 'vip', label: 'VIP' }
  ];
  const pickupOptions = PICKUP_ZONES.map((zone) => ({
    value: zone.name,
    label: `${zone.name} ${zone.surcharge > 0 ? `(+${formatUSD(zone.surcharge)}/pax)` : `(${t('quoter.free')})`}`
  }));

  // Weekday Validation
  useEffect(() => {
    if (!date) {
      setDateError('');
      return;
    }

    if (isPastDateInput(date)) {
      setDateError(t('booking.pastDateWarning'));
      return;
    }

    // Parse date in local time avoiding offset shifts
    const selectedDate = new Date(date + 'T00:00:00');
    const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Get active operating days from config
    const tourOps = (CONFIG.operatingDays as any)[selectedTourId];
    const allowedDays = tourOps ? tourOps[selectedPlan] : [0, 1, 2, 3, 4, 5, 6];

    if (!allowedDays.includes(dayOfWeek)) {
      // Build localized operating days list
      const dayNames = allowedDays.map((d: number) => t(`booking.weekdays.${d}`));
      const formattedDays = dayNames.join(', ');
      setDateError(t('booking.invalidDateWarning').replace('{days}', formattedDays));
    } else {
      setDateError('');
    }
  }, [date, selectedTourId, selectedPlan, t]);

  if (!isOpen) return null;

  // Step 1: Submit lead details to GHL Webhook (Cart Abandonment Capture)
  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !date || !hotel || !country || dateError) return;

    setLoading(true);

    try {
      // POST to GHL Webhook
      if (CONFIG.ghlWebhookUrl) {
        await fetch(CONFIG.ghlWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            phone,
            tour: tour.id,
            plan: selectedPlan,
            date,
            hotel,
            pickupZone,
            country,
            roomNumber,
            allergies,
            adults: quote.adults,
            children: quote.children,
            infants: quote.infants,
            totalPrice: quote.totalPrice,
            depositAmount: quote.depositAmount,
            balanceAmount: quote.balanceAfterDeposit,
            paymentChoice,
            amountDueNow: paymentAmounts.amountDueNow,
            balanceDueAtDestination: paymentAmounts.balanceDueAtDestination,
            tag: 'checkout-step-1',
            status: 'abandoned_cart',
            source: window.location.hostname
          })
        });
      }

      // dataLayer tracking
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'start_booking',
          product_id: tour.id,
          plan: selectedPlan,
          adults: quote.adults,
          children: quote.children,
          infants: quote.infants,
          date,
          nationality: country,
          value: quote.totalPrice,
          currency: 'USD'
        });
      }

      setStep(2);
    } catch (err) {
      console.error("GHL step 1 webhook failed:", err);
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Finalize checkout and redirect to Stripe
  const handleProceedToPayment = async () => {
    if (!acceptTerms || dateError) return;
    setLoading(true);

    try {
      // Google Analytics dataLayer push
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'deposit_click',
          product_id: tour.id,
          plan: selectedPlan,
          payment_choice: paymentChoice,
          value: paymentAmounts.amountDueNow,
          currency: 'USD'
        });
      }

      // Llamar a nuestro endpoint interno en lugar del webhook externo
      const response = await fetch('/api/ghl/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tag: 'checkout-payment-request',
          status: 'payment_requested',
          source: window.location.hostname,
          contact: {
            name,
            email,
            phone,
            country
          },
          trip: {
            productId: tour.id,
            productTitle: language === 'es' ? tour.es.title : tour.en.title,
            plan: selectedPlan,
            date,
            hotel,
            pickupZone: quote.pickupZone,
            roomNumber,
            allergies
          },
          travelers: {
            adults: quote.adults,
            children: quote.children,
            infants: quote.infants,
            payingTravelers: quote.payingTravelers,
            totalTravelers: quote.totalTravelers
          },
          quote: {
            adultUnitPrice: quote.adultUnitPrice,
            childUnitPrice: quote.childUnitPrice,
            adultSubtotal: quote.adultSubtotal,
            childSubtotal: quote.childSubtotal,
            pickupSurchargePerTraveler: quote.pickupSurchargePerTraveler,
            pickupSurcharge: quote.pickupSurcharge,
            totalPrice: quote.totalPrice,
            depositAmount: quote.depositAmount,
            fullPaymentAmount: quote.fullPaymentAmount,
            balanceAfterDeposit: quote.balanceAfterDeposit,
            currency: 'USD'
          },
          payment: {
            choice: paymentAmounts.choice,
            amountDueNow: paymentAmounts.amountDueNow,
            balanceDueAtDestination: paymentAmounts.balanceDueAtDestination,
            requiresExactAmount: true
          }
        })
      });

      const responsePayload = await readWebhookResponse(response);
      if (!response.ok) throw new Error('GHL payment workflow rejected the quote');

      // En la API V2 intentamos extraer la paymentUrl
      const paymentUrl = extractPaymentUrl(responsePayload) || (responsePayload as any).paymentUrl;
      if (paymentUrl) {
        window.location.href = paymentUrl;
        return;
      }

      setSuccessMode('paymentLink');
      setSuccess(true);
    } catch (err) {
      console.error("GHL exact payment request failed:", err);
      setSuccessMode('paymentLink');
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-navy-deep/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-lg h-full bg-navy text-white flex flex-col shadow-2xl border-l border-white/10 z-10 overflow-y-auto">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-navy-deep">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white font-sans">
              {t('booking.modalTitle')}
            </h3>
            <p className="text-xs text-teal-bright mt-0.5 uppercase tracking-wider font-semibold">
              {language === 'es' ? tour.es.title : tour.en.title} · {selectedPlan.toUpperCase()}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-full focus:outline-none"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6">
          {success ? (
            /* Fallback Success view */
            <div className="text-center py-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-teal-bright/20 text-teal-bright rounded-full flex items-center justify-center mb-6">
                <Check className="h-8 w-8" />
              </div>
              <h4 className="text-2xl font-bold font-sans">
                {successMode === 'paymentLink' ? t('booking.paymentLinkPendingTitle') : t('booking.successTitle')}
              </h4>
              <p className="mt-4 text-sm text-white/80 leading-relaxed font-light">
                {successMode === 'paymentLink' ? t('booking.paymentLinkPendingDesc') : t('booking.successDesc')}
              </p>
              <button
                onClick={onClose}
                className="mt-8 bg-coral text-navy-deep font-bold px-8 py-3.5 rounded-xl uppercase text-xs tracking-wider w-full hover:bg-white"
              >
                {t('booking.ctaClose')}
              </button>
            </div>
          ) : (
            <div>
              {/* Steps indicators */}
              <div className="flex justify-between items-center mb-6 bg-navy-deep/40 rounded-xl p-3 border border-white/5">
                <span className={`text-xs font-bold uppercase tracking-wider ${step === 1 ? 'text-coral' : 'text-white/40'}`}>
                  {t('booking.step1')}
                </span>
                <span className="text-white/20">➔</span>
                <span className={`text-xs font-bold uppercase tracking-wider ${step === 2 ? 'text-coral' : 'text-white/40'}`}>
                  {t('booking.step2')}
                </span>
              </div>

              {step === 1 ? (
                /* Step 1: Contact Form */
                <form onSubmit={handleNextStep} className="space-y-4">
                  {/* Tour / Plan settings */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="modal-tour-select" className="text-2xs font-semibold text-white/70 uppercase tracking-wide block mb-1">
                        {t('booking.tourLabel')}
                      </label>
                      <BrandedSelect
                        id="modal-tour-select"
                        value={selectedTourId}
                        onChange={setSelectedTourId}
                        options={tourOptions}
                        size="sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="modal-plan-select" className="text-2xs font-semibold text-white/70 uppercase tracking-wide block mb-1">
                        {t('booking.planLabel')}
                      </label>
                      <BrandedSelect
                        id="modal-plan-select"
                        value={selectedPlan}
                        onChange={(nextPlan) => setSelectedPlan(nextPlan as 'classic' | 'vip')}
                        options={planOptions}
                        size="sm"
                      />
                    </div>
                  </div>

                  {/* Name */}
                  <div className="flex flex-col">
                    <label htmlFor="booking-name" className="text-2xs font-semibold text-white/80 uppercase tracking-wide mb-1.5">
                      {t('booking.labelName')} *
                    </label>
                    <input
                      type="text"
                      id="booking-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder={t('booking.placeholderName')}
                      className="bg-navy-deep/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-coral"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label htmlFor="booking-email" className="text-2xs font-semibold text-white/80 uppercase tracking-wide mb-1.5">
                        {t('booking.labelEmail')} *
                      </label>
                      <input
                        type="email"
                        id="booking-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="jane@example.com"
                        className="bg-navy-deep/60 border border-white/10 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-coral"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="booking-phone" className="text-2xs font-semibold text-white/80 uppercase tracking-wide mb-1.5">
                        {t('booking.labelPhone')} *
                      </label>
                      <input
                        type="tel"
                        id="booking-phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="+1 (704) 123-4567"
                        className="bg-navy-deep/60 border border-white/10 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-coral"
                      />
                    </div>
                  </div>

                  {/* Country/Nationality */}
                  <div className="flex flex-col">
                    <label htmlFor="booking-country" className="text-2xs font-semibold text-white/80 uppercase tracking-wide mb-1.5">
                      {t('booking.labelCountry')} *
                    </label>
                    <input
                      type="text"
                      id="booking-country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                      placeholder={t('booking.placeholderCountry')}
                      className="bg-navy-deep/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-coral"
                    />
                  </div>

                  {/* Hotel & Room Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2 flex flex-col">
                      <label htmlFor="booking-hotel" className="text-2xs font-semibold text-white/80 uppercase tracking-wide mb-1.5">
                        {t('booking.labelHotel')} *
                      </label>
                      <input
                        type="text"
                        id="booking-hotel"
                        value={hotel}
                        onChange={(e) => setHotel(e.target.value)}
                        required
                        placeholder="Lopesan Costa Bávaro"
                        className="bg-navy-deep/60 border border-white/10 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-coral"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="booking-room" className="text-2xs font-semibold text-white/80 uppercase tracking-wide mb-1.5">
                        {t('booking.roomShortLabel')}
                      </label>
                      <input
                        type="text"
                        id="booking-room"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                        placeholder="3104"
                        className="bg-navy-deep/60 border border-white/10 rounded-xl px-3 py-3 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Date Picker (with operational weekday validation) */}
                  <div className="flex flex-col">
                    <label htmlFor="booking-date" className="text-2xs font-semibold text-white/80 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-coral" />
                      {t('booking.labelDate')} *
                    </label>
                    <input
                      type="date"
                      id="booking-date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={minTourDate}
                      required
                      className={`brand-date-input bg-navy-deep/60 border rounded-xl px-4 py-3 text-xs text-white focus:outline-none cursor-pointer ${
                        dateError ? 'border-alert focus:border-alert' : 'border-white/10 focus:border-coral'
                      }`}
                    />
                    {dateError && (
                      <span className="text-alert text-2xs font-medium mt-1.5 flex items-center gap-1">
                        {dateError}
                      </span>
                    )}
                  </div>

                  {/* Pickup Zone Selector */}
                  <div className="flex flex-col">
                    <label htmlFor="booking-pickup-select" className="text-2xs font-semibold text-white/80 uppercase tracking-wide mb-1.5">
                      {t('booking.pickupZoneLabel')}
                    </label>
                    <BrandedSelect
                      id="booking-pickup-select"
                      value={pickupZone}
                      onChange={setPickupZone}
                      options={pickupOptions}
                      size="sm"
                    />
                  </div>

                  {/* Allergies / Health Conditions */}
                  <div className="flex flex-col">
                    <label htmlFor="booking-allergies" className="text-2xs font-semibold text-white/80 uppercase tracking-wide mb-1.5">
                      {t('booking.labelAllergies')}
                    </label>
                    <input
                      type="text"
                      id="booking-allergies"
                      value={allergies}
                      onChange={(e) => setAllergies(e.target.value)}
                      placeholder={t('booking.placeholderAllergies')}
                      className="bg-navy-deep/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                    />
                  </div>

                  {/* Travelers counts */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div>
                      <label htmlFor="booking-adults" className="text-3xs font-semibold text-white/60 uppercase block mb-1">
                        {t('booking.adultsShort')}
                      </label>
                      <input
                        type="number"
                        id="booking-adults"
                        min="1"
                        max="30"
                        value={adults}
                        onChange={(e) => setAdults(parseClampedNumber(e.target.value, TRAVELER_LIMITS.adults.min, TRAVELER_LIMITS.adults.max))}
                        className="w-full bg-navy-deep/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white text-center focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="booking-children" className="text-3xs font-semibold text-white/60 uppercase block mb-1">
                        {t('booking.childrenShort')}
                      </label>
                      <input
                        type="number"
                        id="booking-children"
                        min="0"
                        max="30"
                        value={children}
                        onChange={(e) => setChildren(parseClampedNumber(e.target.value, TRAVELER_LIMITS.children.min, TRAVELER_LIMITS.children.max))}
                        className="w-full bg-navy-deep/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white text-center focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="booking-infants" className="text-3xs font-semibold text-white/60 uppercase block mb-1">
                        {t('booking.infantsShort')}
                      </label>
                      <input
                        type="number"
                        id="booking-infants"
                        min="0"
                        max="10"
                        value={infants}
                        onChange={(e) => setInfants(parseClampedNumber(e.target.value, TRAVELER_LIMITS.infants.min, TRAVELER_LIMITS.infants.max))}
                        className="w-full bg-navy-deep/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white text-center focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Next Step CTA */}
                  <button
                    type="submit"
                    disabled={loading || !!dateError}
                    className="w-full bg-coral text-navy-deep font-bold py-4 rounded-xl text-center mt-6 hover:bg-white hover:text-navy transition-all duration-300 shadow-lg shadow-coral/10 uppercase text-xs tracking-wider flex items-center justify-center gap-1 disabled:opacity-50"
                  >
                    {loading ? "..." : t('booking.ctaNext')}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                /* Step 2: Payment Selector & Confirmation */
                <div className="space-y-6">
                  {/* Summary Box */}
                  <div className="bg-navy-deep/60 border border-white/10 rounded-2xl p-5 space-y-4">
                    <h5 className="text-sm font-bold border-b border-white/5 pb-3">
                      {t('booking.summaryTitle')}
                    </h5>
                    
                    <div className="text-xs space-y-2.5 font-light text-white/80">
                      <div className="flex justify-between">
                        <span>{t('booking.excursion')}:</span>
                        <span className="font-semibold text-white">
                          {language === 'es' ? tour.es.title : tour.en.title} ({selectedPlan.toUpperCase()})
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('booking.hotel')}:</span>
                        <span className="font-semibold text-white">{hotel} ({pickupZone})</span>
                      </div>
                      {roomNumber && (
                        <div className="flex justify-between">
                          <span>{t('booking.roomShortLabel')}:</span>
                          <span className="font-semibold text-white">{roomNumber}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>{t('booking.date')}:</span>
                        <span className="font-semibold text-white">{date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('booking.passengers')}:</span>
                        <span className="font-semibold text-white">
                          {quote.adults} {t('booking.adults')}{quote.children > 0 ? `, ${quote.children} ${t('booking.children')}` : ''}{quote.infants > 0 ? `, ${quote.infants} ${t('booking.infants')}` : ''}
                        </span>
                      </div>
                      {allergies && (
                        <div className="flex justify-between text-coral">
                          <span>{t('booking.restrictions')}:</span>
                          <span className="font-semibold">{allergies}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-white/5 space-y-2 text-xs text-white/60">
                      <div className="flex justify-between">
                        <span>{t('booking.excursionSubtotal')}:</span>
                        <span>{formatUSD(quote.travelerSubtotal)}</span>
                      </div>
                      {quote.pickupSurcharge > 0 && (
                        <div className="flex justify-between text-coral">
                          <span>{t('booking.pickupSurcharge')}:</span>
                          <span>{formatUSD(quote.pickupSurcharge)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm font-bold text-white border-t border-white/5 pt-2">
                        <span>{t('booking.totalPrice')}:</span>
                        <span className="text-coral">{formatUSD(quote.totalPrice)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Choices Switcher Card */}
                  <div className="space-y-4">
                    <label className="text-2xs font-semibold text-white/70 uppercase tracking-wider block">
                      {t('booking.paymentOptionLabel')}
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentChoice('deposit')}
                        className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                          paymentChoice === 'deposit'
                            ? 'bg-navy-deep border-coral shadow-glow-coral'
                            : 'bg-navy-deep/30 border-white/5 hover:bg-navy-deep/60'
                        }`}
                      >
                        <span className="text-xs font-bold text-white">
                          {t('booking.paymentChoiceDeposit')}
                        </span>
                        <span className="text-xl font-black text-coral mt-2">
                          {formatUSD(quote.depositAmount)}
                        </span>
                        <span className="text-3xs text-white/50 mt-1 font-light block leading-none">
                          {t('booking.payBalanceAtDestination')}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentChoice('full')}
                        className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all relative ${
                          paymentChoice === 'full'
                            ? 'bg-navy-deep border-coral shadow-glow-coral'
                            : 'bg-navy-deep/30 border-white/5 hover:bg-navy-deep/60'
                        }`}
                      >
                        <span className="text-xs font-bold text-white flex items-center gap-1">
                          {t('booking.paymentChoiceFull')}
                          <Sparkles className="h-3.5 w-3.5 text-coral flex-shrink-0" />
                        </span>
                        <span className="text-xl font-black text-coral mt-2">
                          {formatUSD(quote.fullPaymentAmount)}
                        </span>
                        <span className="text-3xs text-teal-bright mt-1 font-semibold block leading-none">
                          {t('booking.expressCheckin')}
                        </span>
                      </button>
                    </div>

                    {paymentChoice === 'full' && (
                      <div className="bg-teal/10 border border-teal/20 rounded-2xl p-4 text-teal-bright text-2xs leading-relaxed flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-coral flex-shrink-0" />
                        <span>
                          <strong>{t('booking.fullPaymentPromo')}</strong>
                        </span>
                      </div>
                    )}

                    {paymentChoice === 'deposit' && (
                      <div className="bg-navy-deep/60 border border-white/5 rounded-2xl p-4 flex justify-between items-center text-xs">
                        <span className="text-white/60">{t('booking.balanceAtDest')}:</span>
                        <span className="font-bold text-white">{formatUSD(paymentAmounts.balanceDueAtDestination)}</span>
                      </div>
                    )}
                  </div>

                  {/* Terms Checkbox and outsourced legal statement */}
                  <div className="space-y-4 pt-2 border-t border-white/5">
                    <div className="bg-navy-deep/80 border border-white/10 rounded-2xl p-4 space-y-3">
                      <h6 className="text-2xs font-bold text-coral uppercase tracking-wide flex items-center gap-1.5">
                        <ShieldAlert className="h-4 w-4" />
                        {t('booking.legalLiabilityTitle')}
                      </h6>
                      <p className="text-3xs text-white/70 leading-relaxed font-light">
                        {t('booking.legalLiabilityText')}
                      </p>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer text-xs font-light text-white/80 select-none">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="h-4 w-4 rounded border-white/20 bg-navy-deep text-coral focus:ring-coral focus:ring-offset-navy mt-0.5 cursor-pointer"
                      />
                      <span>
                        {t('booking.labelTerms')} *
                      </span>
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="border border-white/20 text-white p-4 rounded-xl hover:bg-white/10 transition-colors"
                      aria-label="Back"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>

                    <button
                      onClick={handleProceedToPayment}
                      disabled={loading || !acceptTerms || !!dateError}
                      className="flex-1 bg-coral text-navy-deep font-bold py-4 rounded-xl text-center hover:bg-white hover:text-navy transition-all duration-300 shadow-glow-coral uppercase text-xs tracking-wider flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "..." : t('booking.ctaPayDeposit')}
                      <Check className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
