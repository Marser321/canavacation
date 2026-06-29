import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { PlanComparator, Product } from '../data/products';
import { Check, X, Clock, Calendar, Sparkles, ChevronRight, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatUSD } from '../lib/quote';

interface ProductSectionProps {
  product: Product;
  onOpenBooking: (productId: string, plan: 'classic' | 'vip') => void;
  onSelectForQuoter: (productId: string, plan: 'classic' | 'vip') => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({ 
  product, 
  onOpenBooking,
  onSelectForQuoter
}) => {
  const { t, language } = useLanguage();
  const details = language === 'es' ? product.es : product.en;
  const images = product.galleryImages;
  const comparatorRows: Array<keyof PlanComparator> = ['group', 'transport', 'spots', 'food', 'pace'];

  const handleSelectPlan = (plan: 'classic' | 'vip') => {
    // Push event to GA datalayer
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'select_plan',
        product_id: product.id,
        plan_selected: plan,
        price: plan === 'classic' ? product.pricing.classic.adult : product.pricing.vip.adult
      });
    }
    onOpenBooking(product.id, plan);
  };

  return (
    <section id={product.id} className="py-20 sm:py-24 bg-white border-b border-slate/10 text-navy scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado del Tour */}
        <div className="border-l-4 border-coral pl-6 mb-12">
          <span className="text-teal font-bold uppercase tracking-wider text-xs flex items-center gap-1.5 mb-2">
            <Clock className="h-4 w-4 text-teal" />
            {product.durationHours} {t('product.hours')} · {t('product.pickupIncluded')} · {t('product.cancelFree')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy font-sans">
            {details.title}
          </h2>
          <p className="mt-2 text-lg sm:text-xl text-slate font-light italic">
            {details.headline}
          </p>
        </div>

        {/* Gallery & Timeline Bento Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          
          {/* Images Gallery Strip (Left side) - span 7 */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="grid grid-cols-3 gap-3 h-[220px] sm:h-[260px]">
              {images.map((img, i) => (
                <div 
                  key={i}
                  className="rounded-xl bg-cover bg-center shadow-md relative group overflow-hidden"
                  style={{ backgroundImage: `url(${img})` }}
                  role="img"
                  aria-label={`${details.title} ${i + 1}`}
                >
                  <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>
              ))}
            </div>

            {/* Inclusiones e Exclusiones Bento Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 bg-bgSoft p-6 rounded-2xl border border-slate/10">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy flex items-center gap-1 mb-3">
                  <Check className="h-4 w-4 text-teal font-bold" />
                  {t('product.includes')}
                </h4>
                <ul className="space-y-2 text-xs font-light text-slate">
                  {details.includes.map((inc, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-teal font-bold select-none">•</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t sm:border-t-0 sm:border-l border-slate/20 pt-4 sm:pt-0 sm:pl-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy flex items-center gap-1 mb-3">
                  <X className="h-4 w-4 text-alert" />
                  {t('product.notIncludes')}
                </h4>
                <ul className="space-y-2 text-xs font-light text-slate">
                  {details.notIncludes.map((ninc, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-alert select-none">•</span>
                      <span>{ninc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sequential Highlights Timeline (Right side) - span 5 */}
          <div className="lg:col-span-5 bg-navy text-white p-6 sm:p-8 rounded-2xl flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div>
              <h3 className="text-base font-bold uppercase tracking-wider border-b border-white/10 pb-4 flex items-center gap-1.5">
                <Calendar className="h-5 w-5 text-coral" />
                {t('product.itineraryTitle')}
              </h3>
              
              <div className="mt-6 relative border-l border-white/15 pl-6 space-y-5 text-xs font-light text-white/80">
                {details.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle marker */}
                    <div className="absolute -left-[30px] top-0.5 w-2 h-2 rounded-full bg-coral border border-navy-deep shadow-sm" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectForQuoter(product.id, 'classic')}
              className="mt-8 text-xs font-semibold text-coral hover:text-white flex items-center gap-1 border-t border-white/10 pt-4 cursor-pointer self-start focus:outline-none"
            >
              <Info className="h-4 w-4" />
              {t('product.quoterCta')}
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

        </div>

        {/* COMPARADOR Classic vs VIP */}
        <div className="mt-12">
          <h3 className="text-xl font-bold tracking-tight text-center font-sans mb-8">
            {t('product.compareTitle')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
            
            {/* Tarjeta Classic */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="group bg-bgSoft border border-slate/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden"
            >
              <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 h-44 overflow-hidden bg-slate/10">
                <img
                  src={product.classicImage}
                  alt={`${details.title} ${t('product.classicPlanName')}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Badge Popular */}
              <div className="absolute top-4 right-4 bg-teal/15 text-teal text-2xs font-extrabold uppercase px-2.5 py-1 rounded-full border border-teal/10">
                {t('product.popularBadge')}
              </div>

              <div>
                <span className="text-2xs font-bold text-slate uppercase tracking-widest">{t('product.planLabel')}</span>
                <h4 className="text-2xl font-bold text-navy mt-1">{t('product.classicPlanName')}</h4>
                
                {/* Price Display */}
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-navy">{formatUSD(product.pricing.classic.adult)}</span>
                  <span className="text-xs text-slate font-light">{t('product.perPerson')}</span>
                </div>
                <p className="text-3xs text-slate/80 font-light mt-1">
                  {t('product.intlRateNote')}
                </p>

                {/* Features detail list */}
                <div className="mt-8 space-y-4 text-xs">
                  {comparatorRows.map((row) => (
                    <div key={row} className="grid grid-cols-3 gap-2 py-2 border-b border-slate/10">
                      <span className="font-bold text-slate">{t(`product.features.${row}`)}:</span>
                      <span className="col-span-2 text-slate font-light">{details.comparator.classic[row]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => handleSelectPlan('classic')}
                  className="w-full bg-navy text-white font-bold py-3.5 rounded-xl text-center hover:bg-teal hover:text-white transition-all shadow-md uppercase text-xs tracking-wider"
                >
                  {t('product.bookClassic')}
                </button>
              </div>
            </motion.div>

            {/* Tarjeta VIP */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="group bg-navy border border-coral rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-glow-coral relative text-white overflow-hidden"
            >
              <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 h-44 overflow-hidden bg-white/5">
                <img
                  src={product.vipImage}
                  alt={`${details.title} ${t('product.vipPlanName')}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Gold Label Badge */}
              <div className="absolute top-4 right-4 bg-coral text-navy-deep text-2xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow-md shadow-coral/10">
                <Sparkles className="h-3 w-3" />
                {t('product.favoriteBadge')}
              </div>

              <div>
                <span className="text-2xs font-bold text-coral uppercase tracking-widest">{t('product.upgradeLabel')}</span>
                <h4 className="text-2xl font-bold text-white mt-1">{t('product.vipPlanName')}</h4>
                
                {/* Price Display with Anchor crossed out */}
                <div className="mt-6 flex items-baseline gap-2">
                  {product.pricing.vip.comparableValue && (
                    <span className="text-lg line-through text-white/50 font-light">
                      {formatUSD(product.pricing.vip.comparableValue)}
                    </span>
                  )}
                  <span className="text-3xl font-extrabold text-coral">{formatUSD(product.pricing.vip.adult)}</span>
                  <span className="text-xs text-white/70 font-light">{t('product.perPerson')}</span>
                </div>
                <p className="text-3xs text-white/50 font-light mt-1">
                  {t('product.intlRateNote')}
                </p>

                {/* Features detail list */}
                <div className="mt-8 space-y-4 text-xs text-white/90">
                  {comparatorRows.map((row) => (
                    <div key={row} className="grid grid-cols-3 gap-2 py-2 border-b border-white/5">
                      <span className="font-bold text-coral">{t(`product.features.${row}`)}:</span>
                      <span className="col-span-2 text-white/80 font-light">{details.comparator.vip[row]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => handleSelectPlan('vip')}
                  className="w-full bg-coral text-navy-deep font-bold py-3.5 rounded-xl text-center hover:bg-white hover:text-navy transition-all shadow-glow-coral uppercase text-xs tracking-wider"
                >
                  {t('product.bookVip')}
                </button>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};
