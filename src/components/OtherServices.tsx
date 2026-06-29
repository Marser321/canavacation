import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Hotel, Plane, Car, Sparkles, ArrowUpRight } from 'lucide-react';

export const OtherServices: React.FC = () => {
  const { t } = useLanguage();
  const serviceImagePath = '/imagenes_servicios/premium-2026';

  const services = [
    {
      icon: Hotel,
      title: t('services.hotels.title'),
      desc: t('services.hotels.desc'),
      href: 'https://canavacations.com/hoteles/',
      tag: 'hotels',
      image: `${serviceImagePath}/hoteles-wide.jpg`
    },
    {
      icon: Plane,
      title: t('services.flights.title'),
      desc: t('services.flights.desc'),
      href: 'https://canavacations.com/',
      tag: 'flights',
      image: `${serviceImagePath}/vuelos-wide.jpg`
    },
    {
      icon: Car,
      title: t('services.cars.title'),
      desc: t('services.cars.desc'),
      href: 'https://canavacations.com/alquiler-de-autos/',
      tag: 'cars',
      image: `${serviceImagePath}/autos-wide.jpg`
    },
    {
      icon: Sparkles,
      title: t('services.custom.title'),
      desc: t('services.custom.desc'),
      href: 'https://canavacations.com/',
      tag: 'custom',
      image: `${serviceImagePath}/paquetes-wide.jpg`
    }
  ];

  const handleOutboundClick = (serviceName: string) => {
    // Push event to dataLayer
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'outbound_service_click',
        service_name: serviceName
      });
    }
  };

  return (
    <section id="otros-servicios" className="py-16 bg-white border-t border-b border-slate/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-navy uppercase tracking-wider">
            {t('services.title')}
          </h3>
        </div>

        {/* Banners Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <a
                key={idx}
                href={svc.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleOutboundClick(svc.tag)}
                className="group flex min-h-[270px] flex-col justify-between rounded-2xl bg-bgSoft border border-slate/10 hover:border-coral/50 hover:bg-white hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              >
                <div className="h-32 overflow-hidden bg-slate/10">
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="p-5">
                  <div className="-mt-10 w-11 h-11 rounded-xl bg-white shadow-md border border-slate/10 flex items-center justify-center text-teal group-hover:bg-coral group-hover:text-navy-deep transition-colors relative z-10">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="mt-4 text-base font-bold text-navy group-hover:text-coral transition-colors">
                    {svc.title}
                  </h4>
                  <p className="mt-1.5 text-xs text-slate leading-relaxed">
                    {svc.desc}
                  </p>
                </div>

                <div className="px-5 pb-5 flex items-center text-xs font-semibold text-teal group-hover:text-coral gap-0.5 self-end">
                  canavacations.com
                  <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
