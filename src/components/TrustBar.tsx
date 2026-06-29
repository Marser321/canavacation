import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Star, Quote, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const TrustBar: React.FC = () => {
  const { t } = useLanguage();

  // Testimonials with flag codes
  const reviews = [
    {
      name: t('trust.reviews.0.name'),
      flag: "🇨🇴",
      location: t('trust.reviews.0.location'),
      text: t('trust.reviews.0.text'),
    },
    {
      name: t('trust.reviews.1.name'),
      flag: "🇺🇸",
      location: t('trust.reviews.1.location'),
      text: t('trust.reviews.1.text'),
    },
    {
      name: t('trust.reviews.2.name'),
      flag: "🇪🇸",
      location: t('trust.reviews.2.location'),
      text: t('trust.reviews.2.text'),
    }
  ];

  return (
    <section id="confianza" className="py-20 bg-navy text-white relative overflow-hidden">
      {/* Decorative ocean gradient in background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-coral/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Aggregated Authority Numbers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center pb-16 border-b border-white/10">
          <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl font-black text-coral font-sans flex items-center gap-2">
              4.9 <Star className="fill-coral text-coral h-8 w-8" />
            </h2>
            <p className="mt-2 text-lg font-semibold text-white/95">
              {t('trust.rating')}
            </p>
            <div className="mt-4 flex gap-4">
              <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white/80 border border-white/5">
                {t('trust.googleReviews')}
              </span>
              <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white/80 border border-white/5">
                {t('trust.tripadvisor')}
              </span>
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-navy-deep/50 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-teal/20 flex items-center justify-center text-teal-bright flex-shrink-0">
              <Award className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-sans text-white">
                {t('trust.authorityTitle')}
              </h3>
              <p className="mt-2 text-sm text-white/80 leading-relaxed font-light">
                {t('trust.authorityDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Customer Reviews Grid */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-navy-deep/30 border border-white/5 rounded-3xl p-8 relative flex flex-col justify-between hover:bg-navy-deep/60 transition-colors duration-300"
              >
                {/* Quote Icon */}
                <Quote className="absolute top-6 right-6 h-8 w-8 text-teal/20" />
                
                <div>
                  {/* Star Rating */}
                  <div className="flex space-x-1 text-coral mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="fill-current h-4 w-4" />
                    ))}
                  </div>
                  
                  {/* Text */}
                  <p className="text-white/80 text-sm font-light leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>

                {/* Profile Details */}
                <div className="mt-8 flex items-center gap-3 border-t border-white/5 pt-4">
                  <div className="text-2xl">{rev.flag}</div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                    <p className="text-xs text-white/50">{rev.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
