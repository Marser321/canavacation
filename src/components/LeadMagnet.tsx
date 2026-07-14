import React from 'react';
import { Download } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const GUIDE_URL = '/guia-cana-vacations-republica-dominicana.pdf';

export const LeadMagnet: React.FC = () => {
  const { t } = useLanguage();

  const trackDownload = () => {
    window.dataLayer?.push({
      event: 'guide_download',
      guide_name: 'guia_cana_vacations_republica_dominicana'
    });
  };

  return (
    <section id="guia" className="py-20 bg-bgSoft text-navy">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy border border-slate/10 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-48 h-48 bg-teal/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative text-center max-w-2xl mx-auto">
            <span className="text-coral font-bold uppercase tracking-wider text-xs bg-coral/10 px-3.5 py-1.5 rounded-full">
              {t('lead.badge')}
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold font-sans mt-4">
              {t('lead.title')}
            </h3>
            <p className="mt-3 text-sm sm:text-base text-white/80 font-light leading-relaxed">
              {t('lead.subtitle')}
            </p>

            <a
              href={GUIDE_URL}
              download="Guia-de-viajes-Cana-Vacations.pdf"
              onClick={trackDownload}
              className="mt-8 w-full sm:w-auto sm:min-w-80 bg-coral text-navy-deep font-bold px-7 py-4 rounded-xl hover:bg-white hover:text-navy transition-all duration-300 shadow-lg shadow-coral/10 inline-flex items-center justify-center gap-2"
            >
              <Download className="h-5 w-5" aria-hidden="true" />
              {t('lead.cta')}
            </a>

            <p className="mt-4 text-xs text-white/60">
              {t('lead.fileNote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
