import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { products } from '../data/products';
import { Clock, Tag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatUSD } from '../lib/quote';

export const ExperienceSelector: React.FC = () => {
  const { t, language } = useLanguage();

  const handleScrollToProduct = (e: React.MouseEvent<HTMLButtonElement>, anchor: string) => {
    e.preventDefault();
    const element = document.querySelector(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Bento grids look great when the sizes are asymmetric.
  // We can define custom classes for each of the 4 cards.
  const bentoGridClasses = [
    "col-span-12 md:col-span-7 lg:col-span-8", // Saona: wide card
    "col-span-12 md:col-span-5 lg:col-span-4", // Buggy: compact card
    "col-span-12 md:col-span-5 lg:col-span-4", // Party Boat: compact card
    "col-span-12 md:col-span-7 lg:col-span-8"  // Santo Domingo: wide card
  ];

  return (
    <section id="experiencias" className="py-24 bg-bgSoft text-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy font-sans">
            {t('selector.title')}
          </h2>
          <p className="mt-4 text-lg text-slate leading-relaxed">
            {t('selector.subtitle')}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {products.map((product, index) => {
            const details = language === 'es' ? product.es : product.en;
            const previewImage = product.selectorImage;
            const gridClass = bentoGridClasses[index % bentoGridClasses.length];
            const startingPrice = product.pricing.classic.adult;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${gridClass} relative h-[360px] sm:h-[380px] rounded-2xl overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                  style={{ backgroundImage: `url(${previewImage})` }}
                />
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/92 via-navy/38 to-navy/5 z-10 transition-opacity duration-300 group-hover:opacity-95" />
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-navy-deep/45 to-transparent z-10" />
                
                {/* Content Container */}
                <div className="absolute inset-0 z-20 p-6 sm:p-8 flex flex-col justify-between text-white">
                  {/* Top Bar: Tags */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="bg-coral text-navy-deep text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1 shadow-sm shadow-coral/25 max-w-[72%]">
                      <Tag className="h-3 w-3" />
                      <span className="truncate">{details.bestFor}</span>
                    </span>
                    
                    <span className="bg-navy/75 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                      <Clock className="h-3 w-3 text-teal-bright" />
                      {product.durationHours} {t('product.hours')}
                    </span>
                  </div>

                  {/* Bottom Area: Info & CTA */}
                  <div>
                    <p className="text-white/80 text-xs font-medium uppercase tracking-widest">
                      {t('selector.from')} <span className="text-coral text-lg font-bold">{formatUSD(startingPrice)}</span>
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-bold font-sans mt-1">
                      {details.title}
                    </h3>
                    <p className="text-white/70 text-sm font-light mt-2 line-clamp-2 max-w-xl">
                      {details.headline}
                    </p>
                    
                    {/* Action Button */}
                    <div className="mt-5">
                      <button
                        onClick={(e) => handleScrollToProduct(e, product.anchor)}
                        className="bg-transparent border border-white/40 group-hover:border-coral group-hover:bg-coral group-hover:text-navy-deep text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-all duration-300 flex items-center gap-2 hover:scale-102"
                      >
                        {t('selector.explore')}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
