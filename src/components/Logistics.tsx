import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { MapPin, CloudRain, ShieldCheck, CalendarRange, Languages, MessageSquare } from 'lucide-react';

export const Logistics: React.FC = () => {
  const { t } = useLanguage();

  const logisticsItems = [
    {
      icon: MapPin,
      title: t('logistics.pickupTitle'),
      desc: t('logistics.pickupDesc')
    },
    {
      icon: CloudRain,
      title: t('logistics.weatherTitle'),
      desc: t('logistics.weatherDesc')
    },
    {
      icon: ShieldCheck,
      title: t('logistics.paymentTitle'),
      desc: t('logistics.paymentDesc')
    },
    {
      icon: CalendarRange,
      title: t('logistics.cancellationTitle'),
      desc: t('logistics.cancellationDesc')
    },
    {
      icon: Languages,
      title: t('logistics.guideTitle'),
      desc: t('logistics.guideDesc')
    }
  ];

  return (
    <section id="logistica" className="py-24 bg-navy-deep text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            {t('logistics.title')}
          </h2>
          <p className="mt-4 text-lg text-white/70">
            {t('logistics.subtitle')}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* Main Surcharges / Pickup Info - span 3 */}
          <div className="md:col-span-3 bg-navy border border-white/10 rounded-3xl p-8 shadow-xl flex flex-col justify-between hover:bg-navy/80 transition-colors duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal/20 rounded-xl flex items-center justify-center text-teal-bright flex-shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{logisticsItems[0].title}</h3>
                <p className="mt-3 text-sm text-white/80 leading-relaxed font-light">
                  {logisticsItems[0].desc}
                </p>
              </div>
            </div>
            
            {/* Pickup checklist tags visual */}
            <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-white/5">
              {['Bávaro', 'Punta Cana', 'Cabeza de Toro', 'Arena Gorda', 'Uvero Alto', 'Macao'].map((z) => (
                <span key={z} className="bg-teal/10 text-teal-bright text-xs font-semibold px-3 py-1 rounded-full border border-teal/20">
                  {z} ({t('logistics.free')})
                </span>
              ))}
              {['Cap Cana (+$10)', 'Bayahibe (+$15)'].map((z) => (
                <span key={z} className="bg-coral/10 text-coral text-xs font-semibold px-3 py-1 rounded-full border border-coral/20">
                  {z}
                </span>
              ))}
            </div>
          </div>

          {/* Rain policy - span 3 */}
          <div className="md:col-span-3 bg-navy border border-white/10 rounded-3xl p-8 shadow-xl flex flex-col justify-between hover:bg-navy/80 transition-colors duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal/20 rounded-xl flex items-center justify-center text-teal-bright flex-shrink-0">
                <CloudRain className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{logisticsItems[1].title}</h3>
                <p className="mt-3 text-sm text-white/80 leading-relaxed font-light">
                  {logisticsItems[1].desc}
                </p>
              </div>
            </div>
            <div className="mt-6 bg-teal/10 border border-teal/20 rounded-2xl p-4 text-teal-bright text-xs font-medium leading-relaxed">
              <strong>{t('logistics.weatherGuaranteeLabel')}:</strong> {t('logistics.weatherGuaranteeText')}
            </div>
          </div>

          {/* Secure deposit - span 2 */}
          <div className="md:col-span-2 bg-navy border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:bg-navy/80 transition-colors duration-300">
            <div className="w-10 h-10 bg-teal/20 rounded-xl flex items-center justify-center text-teal-bright mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{logisticsItems[2].title}</h3>
              <p className="mt-2 text-xs text-white/70 leading-relaxed font-light">
                {logisticsItems[2].desc}
              </p>
            </div>
          </div>

          {/* 24h Cancellation - span 2 */}
          <div className="md:col-span-2 bg-navy border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:bg-navy/80 transition-colors duration-300">
            <div className="w-10 h-10 bg-teal/20 rounded-xl flex items-center justify-center text-teal-bright mb-4">
              <CalendarRange className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{logisticsItems[3].title}</h3>
              <p className="mt-2 text-xs text-white/70 leading-relaxed font-light">
                {logisticsItems[3].desc}
              </p>
            </div>
          </div>

          {/* Bilingual Guides - span 2 */}
          <div className="md:col-span-2 bg-navy border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:bg-navy/80 transition-colors duration-300">
            <div className="w-10 h-10 bg-teal/20 rounded-xl flex items-center justify-center text-teal-bright mb-4">
              <Languages className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{logisticsItems[4].title}</h3>
              <p className="mt-2 text-xs text-white/70 leading-relaxed font-light">
                {logisticsItems[4].desc}
              </p>
            </div>
          </div>

          {/* Human Concierge Advisor Banner - span 6 */}
          <div className="md:col-span-6 bg-gradient-to-r from-navy to-navy-deep border border-white/15 rounded-3xl p-8 shadow-xl mt-6 flex flex-col sm:flex-row items-center gap-6 justify-between">
            <div className="flex items-center gap-5">
              <img
                src="/brand/cana-vacations-mark.png"
                alt=""
                className="w-16 h-16 rounded-2xl bg-navy-deep/80 object-contain p-1.5 border border-coral/50 shadow-glow-coral"
              />
              <div>
                <span className="text-teal-bright font-bold uppercase tracking-wider text-xs flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  {t('logistics.adviserTitle')}
                </span>
                <h4 className="text-lg font-bold mt-1 text-white">{t('logistics.adviserName')}</h4>
                <p className="text-xs text-white/70 leading-relaxed font-light max-w-lg mt-0.5">
                  {t('logistics.adviserDesc')}
                </p>
              </div>
            </div>
            
            <a
              href={`https://wa.me/18093602625`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-coral text-navy-deep font-bold px-6 py-3 rounded-full hover:bg-white hover:text-navy transition-all duration-300 flex items-center gap-2 flex-shrink-0 shadow-lg shadow-coral/10 hover:scale-103"
            >
              {t('logistics.adviserCta')}
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
