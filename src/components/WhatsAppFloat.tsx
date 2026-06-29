import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { CONFIG } from '../config';

interface WhatsAppLinkParams {
  product?: string;
  plan?: string;
  date?: string;
  adults?: number;
  children?: number;
  customText?: string;
}

export const buildWhatsAppLink = ({ product, plan, date, adults, children, customText }: WhatsAppLinkParams): string => {
  const number = CONFIG.whatsappNumber;
  
  if (customText) {
    return `https://wa.me/${number}?text=${encodeURIComponent(customText)}`;
  }

  let text = "Hola Cana Vacations, me interesa cotizar una excursión.";
  const isEn = document.documentElement.lang === 'en';

  if (isEn) {
    text = "Hello Cana Vacations, I am interested in booking an excursion.";
  }

  if (product) {
    if (isEn) {
      text = `Hi! I would like to check availability for ${product}`;
      if (plan) text += ` (${plan} plan)`;
      if (date) text += ` on ${date}`;
      if (adults !== undefined) {
        text += ` for ${adults} adults`;
        if (children !== undefined && children > 0) {
          text += ` and ${children} children`;
        }
      }
      text += `. Can you help me?`;
    } else {
      text = `¡Hola! Me gustaría consultar disponibilidad para la excursión de ${product}`;
      if (plan) text += ` (plan ${plan})`;
      if (date) text += ` para el día ${date}`;
      if (adults !== undefined) {
        text += ` para ${adults} adultos`;
        if (children !== undefined && children > 0) {
          text += ` y ${children} niños`;
        }
      }
      text += `. ¿Me ayudan a confirmar?`;
    }
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
};

export const WhatsAppFloat: React.FC = () => {
  const { t } = useLanguage();
  const waUrl = buildWhatsAppLink({});

  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      {/* Tooltip */}
      <div className="absolute right-16 bottom-2 bg-navy text-white text-xs font-semibold py-2 px-3 rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-slate/20">
        {t('float.whatsappTooltip')}
      </div>
      
      {/* Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <svg
          className="w-8 h-8 fill-current group-hover:rotate-12 transition-transform duration-300"
          viewBox="0 0 24 24"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.34 4.95L2 22l5.27-1.38a9.86 9.86 0 0 0 4.77 1.22h.01c5.46 0 9.91-4.45 9.91-9.91A9.86 9.86 0 0 0 19.05 4.9 9.84 9.84 0 0 0 12.04 2Zm0 18.17h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.13.82.84-3.05-.2-.31a8.2 8.2 0 0 1-1.26-4.4 8.25 8.25 0 0 1 8.24-8.24 8.18 8.18 0 0 1 5.83 2.42 8.18 8.18 0 0 1 2.42 5.84 8.25 8.25 0 0 1-8.24 8.24Zm4.52-6.17c-.25-.12-1.47-.72-1.7-.8-.23-.08-.4-.12-.56.12-.17.25-.65.8-.8.96-.14.17-.3.19-.55.07-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.9 2.4 1.02 2.56c.12.17 1.76 2.68 4.27 3.76.6.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.29Z" />
        </svg>
      </a>
    </div>
  );
};
