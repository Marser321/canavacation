import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { buildWhatsAppLink } from './WhatsAppFloat';
import { AnimatePresence, motion } from 'framer-motion';

export const StickyCTA: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8; // Trigger after scrolling 80% of viewport height
      if (window.scrollY > heroHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToPlans = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.querySelector('#experiencias');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappUrl = buildWhatsAppLink({});

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 w-full bg-navy/95 backdrop-blur-md border-t border-slate/20 py-3 px-4 z-40 md:hidden flex space-x-3 shadow-2xl"
        >
          {/* WhatsApp Secondary CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 border border-coral text-coral font-bold py-3 rounded-full text-center text-sm active:bg-coral/10 transition-colors"
          >
            WhatsApp
          </a>

          {/* Primary View Plans CTA */}
          <button
            onClick={handleScrollToPlans}
            className="flex-1 bg-coral text-navy-deep font-bold py-3 rounded-full text-center text-sm active:bg-white active:text-navy transition-colors shadow-md shadow-coral/20"
          >
            {t('hero.ctaPrimary')}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
