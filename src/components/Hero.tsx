import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { buildWhatsAppLink } from './WhatsAppFloat';
import { Shield, Clock, MapPin, MessageSquareCode } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  const handleScrollToSelector = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.querySelector('#experiencias');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const trustChips = [
    { icon: Shield, label: t('hero.chips.cancellation') },
    { icon: Clock, label: t('hero.chips.confirmation') },
    { icon: MapPin, label: t('hero.chips.pickup') },
    { icon: MessageSquareCode, label: t('hero.chips.bilingual') }
  ];

  const whatsappUrl = buildWhatsAppLink({});

  return (
    <div className="relative min-h-[100svh] flex items-end bg-navy-deep overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: "url('/imagenes_excursiones/premium-2026/hero-caribe-premium-wide.jpg')",
          backgroundPosition: 'center 48%',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/65 to-navy/15 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/20 to-transparent z-0" />

      {/* Main Content Layout */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-10 sm:pb-14">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-left"
        >
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/85 backdrop-blur-sm">
            {t('hero.eyebrow')}
          </div>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight font-sans max-w-4xl">
            {t('hero.headline')}
          </h1>
          <p className="mt-6 text-base sm:text-xl text-white/88 font-light max-w-2xl leading-relaxed">
            {t('hero.subheadline')}
          </p>

          {/* Action Buttons */}
          <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={handleScrollToSelector}
              className="w-full sm:w-auto bg-coral text-navy-deep font-bold px-8 py-4 rounded-full text-base sm:text-lg hover:bg-white hover:text-navy transition-all duration-300 shadow-lg shadow-coral/20 hover:scale-[1.02]"
            >
              {t('hero.ctaPrimary')}
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/5 border border-white/70 text-white hover:bg-white hover:text-navy-deep font-bold px-8 py-4 rounded-full text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02] backdrop-blur-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.34 4.95L2 22l5.27-1.38a9.86 9.86 0 0 0 4.77 1.22h.01c5.46 0 9.91-4.45 9.91-9.91A9.86 9.86 0 0 0 19.05 4.9 9.84 9.84 0 0 0 12.04 2Zm0 18.17h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.13.82.84-3.05-.2-.31a8.2 8.2 0 0 1-1.26-4.4 8.25 8.25 0 0 1 8.24-8.24 8.18 8.18 0 0 1 5.83 2.42 8.18 8.18 0 0 1 2.42 5.84 8.25 8.25 0 0 1-8.24 8.24Zm4.52-6.17c-.25-.12-1.47-.72-1.7-.8-.23-.08-.4-.12-.56.12-.17.25-.65.8-.8.96-.14.17-.3.19-.55.07-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.9 2.4 1.02 2.56c.12.17 1.76 2.68 4.27 3.76.6.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.29Z" />
              </svg>
              {t('hero.ctaSecondary')}
            </a>
          </div>

          <p className="mt-4 text-sm text-white/70 italic">
            {t('hero.microcopy')}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl w-full"
        >
          {trustChips.map((chip, idx) => {
            const Icon = chip.icon;
            return (
              <div 
                key={idx}
                className="bg-navy/55 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-lg group hover:bg-navy/70 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center text-teal-bright group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="mt-3 text-sm font-medium text-white tracking-wide">
                  {chip.label}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};
