import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy-deep text-white/60 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Logo & Claim */}
          <div className="md:col-span-2 space-y-4">
            <a 
              href="https://canavacations.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block"
            >
              <img 
                src="/brand/cana-vacations-logo-on-dark.png"
                alt="Cana Vacations" 
                className="h-20 w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-102"
              />
            </a>
            <p className="text-sm font-light text-white/70 max-w-sm leading-relaxed">
              "{t('footer.claim')}"
            </p>
            <p className="text-xs font-light text-white/50 leading-relaxed max-w-sm">
              {t('footer.offices')}
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t('nav.contact')}
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-light">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-teal-bright flex-shrink-0" />
                <a href="tel:+18093602625" className="hover:text-coral transition-colors">
                  +1 (809) 360-2625 (RD)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-teal-bright flex-shrink-0" />
                <a href="tel:+17046490329" className="hover:text-coral transition-colors">
                  +1 (704) 649-0329 (US)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-teal-bright flex-shrink-0" />
                <a href="mailto:contacto@canavacations.com" className="hover:text-coral transition-colors">
                  contacto@canavacations.com
                </a>
              </li>
            </ul>
          </div>

          {/* Payment Methods Visual */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t('footer.paymentTitle')}
            </h4>
            <p className="text-xs font-light leading-relaxed">
              {t('footer.paymentDesc')}
            </p>
            <div className="flex gap-2">
              <span className="bg-white/10 text-white font-semibold text-2xs px-2.5 py-1 rounded border border-white/5 uppercase">
                Visa
              </span>
              <span className="bg-white/10 text-white font-semibold text-2xs px-2.5 py-1 rounded border border-white/5 uppercase">
                MC
              </span>
              <span className="bg-white/10 text-white font-semibold text-2xs px-2.5 py-1 rounded border border-white/5 uppercase">
                Amex
              </span>
              <span className="bg-white/10 text-white font-semibold text-2xs px-2.5 py-1 rounded border border-white/5 uppercase">
                Apple Pay
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>{t('footer.rights')}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-coral transition-colors">{t('footer.legal')}</a>
            <a href="#" className="hover:text-coral transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-coral transition-colors">{t('footer.terms')}</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
