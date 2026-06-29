import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { products } from '../data/products';
import { PICKUP_ZONES } from '../config';
import { Calculator, HelpCircle, Sparkles } from 'lucide-react';
import { calculateQuote, clampNumber, formatUSD, TRAVELER_LIMITS } from '../lib/quote';

interface InteractiveQuoterProps {
  initialProductId?: string;
  initialPlan?: 'classic' | 'vip';
  onBookQuote: (quoteData: {
    productId: string;
    plan: 'classic' | 'vip';
    adults: number;
    children: number;
    infants: number;
    pickupZone: string;
    totalPrice: number;
    depositAmount: number;
    balanceAmount: number;
  }) => void;
}

export const InteractiveQuoter: React.FC<InteractiveQuoterProps> = ({ 
  initialProductId, 
  initialPlan,
  onBookQuote 
}) => {
  const { t, language } = useLanguage();

  // State controls
  const [selectedProductId, setSelectedProductId] = useState(initialProductId || products[0].id);
  const [selectedPlan, setSelectedPlan] = useState<'classic' | 'vip'>(initialPlan || 'classic');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [selectedPickup, setSelectedPickup] = useState(PICKUP_ZONES[0].name);

  // Sync with props if they change
  useEffect(() => {
    if (initialProductId) setSelectedProductId(initialProductId);
    if (initialPlan) setSelectedPlan(initialPlan);
  }, [initialProductId, initialPlan]);

  // Find selected tour data
  const selectedTour = products.find(p => p.id === selectedProductId) || products[0];
  const quote = calculateQuote(selectedTour, selectedPlan, { adults, children, infants }, selectedPickup, PICKUP_ZONES);

  const handleBook = () => {
    onBookQuote({
      productId: selectedProductId,
      plan: selectedPlan,
      adults: quote.adults,
      children: quote.children,
      infants: quote.infants,
      pickupZone: quote.pickupZone,
      totalPrice: quote.totalPrice,
      depositAmount: quote.depositAmount,
      balanceAmount: quote.balanceAfterDeposit
    });
  };

  return (
    <section id="cotizador" className="py-24 bg-navy-deep text-white relative">
      {/* Visual background lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-coral font-bold uppercase tracking-wider text-xs bg-coral/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Calculator className="h-3.5 w-3.5" />
            {t('quoter.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans mt-4">
            {t('quoter.title')}
          </h2>
          <p className="mt-4 text-lg text-white/70">
            {t('quoter.subtitle')}
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Controls Box (Left Side) */}
          <div className="lg:col-span-7 bg-navy border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            
            {/* Tour Selection */}
            <div>
              <label htmlFor="quoter-tour" className="text-xs font-semibold text-white/80 uppercase tracking-wider block mb-2">
                {t('quoter.labelTour')}
              </label>
              <select
                id="quoter-tour"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full bg-navy-deep/80 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-coral transition-colors cursor-pointer"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id} className="bg-navy">
                    {language === 'es' ? p.es.title : p.en.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Plan Selection */}
            <div>
              <label className="text-xs font-semibold text-white/80 uppercase tracking-wider block mb-3">
                {t('quoter.labelPlan')}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedPlan('classic')}
                  className={`py-3.5 px-4 rounded-2xl font-semibold text-sm transition-all border ${
                    selectedPlan === 'classic'
                      ? 'bg-white text-navy-deep border-white shadow-md'
                      : 'bg-navy-deep/40 text-white/70 border-white/10 hover:bg-navy-deep/60'
                  }`}
                >
                  {t('quoter.classicPlanName')}
                </button>
                <button
                  onClick={() => setSelectedPlan('vip')}
                  className={`py-3.5 px-4 rounded-2xl font-semibold text-sm transition-all border flex items-center justify-center gap-1.5 ${
                    selectedPlan === 'vip'
                      ? 'bg-coral text-navy-deep border-coral shadow-glow-coral'
                      : 'bg-navy-deep/40 text-white/70 border-white/10 hover:bg-navy-deep/60'
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  {t('quoter.vipPlanName')}
                </button>
              </div>
            </div>

            {/* Travelers Count Counters */}
            <div className="space-y-4 pt-2">
              <span className="text-xs font-semibold text-white/80 uppercase tracking-wider block">
                {t('quoter.travelersLabel')}
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Adults */}
                <div className="bg-navy-deep/40 border border-white/10 rounded-2xl p-4 flex flex-col justify-between items-center text-center">
                  <span className="text-xs font-medium text-white/70">{t('quoter.labelAdults')}</span>
                  <div className="flex items-center space-x-4 mt-3">
                    <button
                      onClick={() => setAdults((current) => clampNumber(current - 1, TRAVELER_LIMITS.adults.min, TRAVELER_LIMITS.adults.max))}
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center font-bold text-lg hover:bg-white/10 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-lg font-bold w-4">{adults}</span>
                    <button
                      onClick={() => setAdults((current) => clampNumber(current + 1, TRAVELER_LIMITS.adults.min, TRAVELER_LIMITS.adults.max))}
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center font-bold text-lg hover:bg-white/10 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="bg-navy-deep/40 border border-white/10 rounded-2xl p-4 flex flex-col justify-between items-center text-center">
                  <span className="text-xs font-medium text-white/70">{t('quoter.labelChildren')}</span>
                  <div className="flex items-center space-x-4 mt-3">
                    <button
                      onClick={() => setChildren((current) => clampNumber(current - 1, TRAVELER_LIMITS.children.min, TRAVELER_LIMITS.children.max))}
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center font-bold text-lg hover:bg-white/10 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-lg font-bold w-4">{children}</span>
                    <button
                      onClick={() => setChildren((current) => clampNumber(current + 1, TRAVELER_LIMITS.children.min, TRAVELER_LIMITS.children.max))}
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center font-bold text-lg hover:bg-white/10 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Infants */}
                <div className="bg-navy-deep/40 border border-white/10 rounded-2xl p-4 flex flex-col justify-between items-center text-center">
                  <span className="text-xs font-medium text-white/70">{t('quoter.labelInfants')}</span>
                  <div className="flex items-center space-x-4 mt-3">
                    <button
                      onClick={() => setInfants((current) => clampNumber(current - 1, TRAVELER_LIMITS.infants.min, TRAVELER_LIMITS.infants.max))}
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center font-bold text-lg hover:bg-white/10 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-lg font-bold w-4">{infants}</span>
                    <button
                      onClick={() => setInfants((current) => clampNumber(current + 1, TRAVELER_LIMITS.infants.min, TRAVELER_LIMITS.infants.max))}
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center font-bold text-lg hover:bg-white/10 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Pickup Surcharge Selection */}
            <div>
              <label htmlFor="quoter-pickup" className="text-xs font-semibold text-white/80 uppercase tracking-wider block mb-2">
                {t('quoter.labelPickup')}
              </label>
              <select
                id="quoter-pickup"
                value={selectedPickup}
                onChange={(e) => setSelectedPickup(e.target.value)}
                className="w-full bg-navy-deep/80 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-coral transition-colors cursor-pointer"
              >
                {PICKUP_ZONES.map((zone) => (
                  <option key={zone.name} value={zone.name} className="bg-navy">
                    {zone.name} {zone.surcharge > 0 ? `(+${formatUSD(zone.surcharge)}/pax)` : `(${t('quoter.free')})`}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Pricing Breakdown (Right Side) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-navy to-navy-deep border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <h3 className="text-xl font-bold font-sans border-b border-white/10 pb-4 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-coral animate-pulse" />
              {t('quoter.breakdownTitle')}
            </h3>

            {/* Detail rows */}
            <div className="mt-6 space-y-3.5 text-sm">
              <div className="flex justify-between text-white/80">
                <span>{t('quoter.itemAdults')} ({quote.adults} × {formatUSD(quote.adultUnitPrice)})</span>
                <span className="font-semibold text-white">{formatUSD(quote.adultSubtotal)}</span>
              </div>
              
              {quote.children > 0 && (
                <div className="flex justify-between text-white/80">
                  <span>{t('quoter.itemChildren')} ({quote.children} × {formatUSD(quote.childUnitPrice)})</span>
                  <span className="font-semibold text-white">{formatUSD(quote.childSubtotal)}</span>
                </div>
              )}

              {quote.infants > 0 && (
                <div className="flex justify-between text-teal-bright">
                  <span>{t('quoter.itemInfants')} ({quote.infants})</span>
                  <span className="font-semibold">{t('quoter.free')}</span>
                </div>
              )}

              {quote.pickupSurcharge > 0 && (
                <div className="flex justify-between text-coral">
                  <span>{t('quoter.itemPickup')} ({quote.payingTravelers} × {formatUSD(quote.pickupSurchargePerTraveler)})</span>
                  <span className="font-semibold">{formatUSD(quote.pickupSurcharge)}</span>
                </div>
              )}

              {/* Total Price Row */}
              <div className="flex justify-between text-base font-bold pt-4 border-t border-white/10 text-white">
                <span>{t('quoter.totalPrice')}</span>
                <span className="text-lg text-coral">{formatUSD(quote.totalPrice)}</span>
              </div>
            </div>

            {/* Payment Divisions Breakdown */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
              <div className="bg-navy/70 border border-white/10 rounded-2xl p-4">
                <span className="text-xs text-white/70 block uppercase tracking-wider font-semibold">
                  {t('quoter.depositRequired')}
                </span>
                <span className="text-2xl font-black text-coral block mt-1">
                  {formatUSD(quote.depositAmount)}
                </span>
              </div>

              <div className="bg-navy-deep/60 border border-white/5 rounded-2xl p-4">
                <span className="text-xs text-white/50 block uppercase tracking-wider font-medium">
                  {t('quoter.balanceAtDestination')}
                </span>
                <span className="text-lg font-bold text-white block mt-1">
                  {formatUSD(quote.balanceAfterDeposit)}
                </span>
              </div>
              
              <p className="text-2xs text-white/50 leading-relaxed font-light">
                * {t('quoter.depositNote')}
              </p>
            </div>

            {/* Book Now Button */}
            <button
              onClick={handleBook}
              className="w-full bg-coral text-navy-deep font-bold py-4 rounded-2xl text-center mt-6 hover:bg-white hover:text-navy transition-all duration-300 shadow-lg shadow-coral/15 uppercase tracking-wider font-sans hover:scale-102"
            >
              {t('quoter.ctaBookQuote')}
            </button>

            {/* Help Prompt */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/60">
              <HelpCircle className="h-4 w-4 text-teal-bright" />
              <span>{t('quoter.infoHelp')}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
