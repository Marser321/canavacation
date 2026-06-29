import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  q: string;
  a: string;
}

export const FAQ: React.FC = () => {
  const { t, language } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqEs: FAQItem[] = [
    {
      q: "¿Vale la pena el plan VIP?",
      a: "Totalmente. El plan VIP está pensado para evitar las aglomeraciones y la masificación del turismo de masas. Por ejemplo, en Isla Saona VIP viajas en lancha rápida (llegas antes de los catamaranes masivos) y visitas 3 playas vírgenes en un grupo reducido. En Buggy VIP utilizas vehículos Polaris nuevos y potentes a tu propio ritmo."
    },
    {
      q: "¿Qué pasa si llueve el día del tour?",
      a: "Tenemos una Política de Lluvia Flexible. Si las condiciones meteorológicas impiden la salida del tour de forma segura, te ofreceremos reprogramar la fecha sin costo o te devolveremos el 90% de tu depósito (el 10% restante cubre los costos transaccionales bancarios no reembolsables)."
    },
    {
      q: "¿El transporte de recogida en el hotel está incluido?",
      a: "Sí, la recogida y regreso al lobby de tu hotel está incluida en la tarifa estándar para las zonas de Bávaro, Punta Cana, Cabeza de Toro, Arena Gorda, Uvero Alto y Macao. Para zonas más alejadas como Cap Cana (+$10) o Bayahibe (+$15), aplica un pequeño recargo de traslado por persona debido a la distancia."
    },
    {
      q: "¿Cómo funciona el pago del depósito y el saldo restante?",
      a: "Para asegurar tus asientos, pagas un pequeño depósito online (entre $15 y $25 USD por persona según el plan) de forma segura con tu tarjeta de crédito. El saldo restante lo pagas el día del tour directamente en el destino (efectivo en USD/DOP o tarjeta de crédito)."
    },
    {
      q: "¿Los niños e infantes pagan tarifa completa?",
      a: "Los infantes de 0 a 2 años viajan completamente gratis en todas las excursiones (siempre que vayan acompañados de sus padres). Los niños de 3 a 11 años disfrutan de una tarifa con descuento de aproximadamente el 50% de la tarifa del adulto. A partir de los 12 años pagan tarifa estándar."
    },
    {
      q: "¿En qué idioma es la excursión?",
      a: "Nuestros guías son oficiales y certificados de turismo, y dominan perfectamente tanto el español como el inglés (bilingües). Si requieres otro idioma especial para grupos privados (ej. francés o alemán), podemos coordinarlo con antelación."
    },
    {
      q: "¿Con cuánta anticipación debo reservar?",
      a: "Recomendamos reservar con la mayor antelación posible, especialmente para los planes VIP, ya que los cupos están estrictamente limitados (lanchas de máximo 15-20 personas) y suelen agotarse con semanas de antelación en temporada alta."
    },
    {
      q: "¿Qué políticas de cancelación tienen?",
      a: "Puedes cancelar tu reserva y obtener un reembolso del 90% del depósito si nos avisas con al menos 24 horas de antelación a la hora programada del tour. El 10% retenido cubre las comisiones de pasarela de pago y bancarias fijas no reembolsables. Los no-shows pierden el 100%."
    },
    {
      q: "¿Cuánto tiempo tardan en confirmar mi recogida después del depósito?",
      a: "Inmediatamente después de recibir tu depósito de reserva, nuestro equipo te enviará un correo de confirmación. En un plazo de 10 a 15 minutos, un asesor especializado se contactará contigo por WhatsApp para coordinar la hora exacta de recogida en tu hotel."
    },
    {
      q: "¿Qué cosas debo llevar el día del tour?",
      a: "Se recomienda llevar traje de baño, toalla de playa, bloqueador solar biodegradable, gafas de sol, ropa ligera de cambio y dinero en efectivo (dólares o pesos) para compras adicionales, souvenirs o propinas."
    }
  ];

  const faqEn: FAQItem[] = [
    {
      q: "Is the VIP plan worth it?",
      a: "Absolutely. The VIP upgrade is designed to keep you away from mass tourism crowds. In Saona VIP, you travel in a fast speedboat (arriving 45 minutes before the massive catamarans) and visit 3 virgin beaches in a small group. In Buggy VIP, you drive premium Polaris buggies on private trails at your own pace."
    },
    {
      q: "What happens if it rains on the tour day?",
      a: "We have a Flexible Weather Policy. If bad weather makes it unsafe to run the tour, you can reschedule for free or receive a 90% refund of your booking deposit (the remaining 10% covers non-refundable banking/transaction gateway fees)."
    },
    {
      q: "Is hotel pickup and drop-off included?",
      a: "Yes, round-trip transportation from your hotel lobby is free for the main areas: Bávaro, Punta Cana, Cabeza de Toro, Arena Gorda, Uvero Alto, and Macao. Pickups in further areas like Cap Cana (+$10) or Bayahibe (+$15) have a small distance supplement per traveler."
    },
    {
      q: "How does the deposit and balance payment work?",
      a: "To lock in your seats, you pay a small deposit online today (between $15 and $25 USD per person) securely via Stripe. The remaining balance is paid on the day of the tour at destination (cash in USD/DOP or credit card)."
    },
    {
      q: "Do kids and infants pay full price?",
      a: "Infants aged 0 to 2 travel completely free on all tours. Children aged 3 to 11 receive a discounted rate of roughly 50% off the adult price. Children aged 12 and older pay standard adult pricing."
    },
    {
      q: "What language is the tour conducted in?",
      a: "Our tour guides are officially certified and fully bilingual in English and Spanish. For private charters, we can also coordinate guides in French, German, or Italian."
    },
    {
      q: "How far in advance should I book my spot?",
      a: "We highly recommend booking as early as possible. VIP tours are strictly capped (e.g., maximum 15-20 travelers per boat) to ensure quality service, and they sell out weeks in advance during high season."
    },
    {
      q: "What is the cancellation policy?",
      a: "You can cancel your booking for a 90% deposit refund if you notify us at least 24 hours prior to the scheduled tour start. The remaining 10% covers fixed transaction gateway fees. No-shows lose 100%."
    },
    {
      q: "How long does it take to confirm my pickup time after booking?",
      a: "Immediately upon paying the deposit, you will receive an email receipt. Within 10 to 15 minutes, our local concierge team will text you on WhatsApp to confirm the exact hotel lobby pickup window."
    },
    {
      q: "What should I bring on the day of the tour?",
      a: "We recommend bringing swimwear, a beach towel, biodegradable sunscreen, sunglasses, a dry change of clothes, and extra cash (USD/DOP) for local souvenirs, tips, or personal purchases."
    }
  ];

  const currentFaq = language === 'es' ? faqEs : faqEn;

  return (
    <section id="faq" className="py-24 bg-white text-navy">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy font-sans">
            {t('faq.title')}
          </h2>
          <p className="mt-4 text-lg text-slate">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {currentFaq.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="border border-slate/10 rounded-2xl overflow-hidden bg-bgSoft hover:border-teal/30 transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between font-semibold text-navy text-base sm:text-lg focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`h-5 w-5 text-teal transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-1 text-slate text-sm sm:text-base leading-relaxed font-light">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
