import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { MailCheck } from 'lucide-react';

export const LeadMagnet: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/ghl/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!response.ok) throw new Error('GHL guide request failed');

      // Google Analytics dataLayer push
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'submit_lead',
          lead_type: 'weather_guide'
        });
      }

      setSubmitted(true);
    } catch (err) {
      console.error('GHL guide request failed:', err);
      setSubmitError('No pudimos enviar tu solicitud. Por favor, inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="guia" className="py-20 bg-bgSoft text-navy">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main box */}
        <div className="bg-navy border border-slate/10 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-white">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-teal/20 rounded-full blur-3xl pointer-events-none" />

          {submitted ? (
            <div className="text-center py-6 flex flex-col items-center">
              <div className="w-16 h-16 bg-teal-bright/20 text-teal-bright rounded-full flex items-center justify-center mb-6">
                <MailCheck className="h-8 w-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-sans">
                {t('lead.successTitle')}
              </h3>
              <p className="mt-4 text-base text-white/80 max-w-xl font-light">
                {t('lead.successDescription')}
              </p>
            </div>
          ) : (
            <div>
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-coral font-bold uppercase tracking-wider text-xs bg-coral/10 px-3.5 py-1.5 rounded-full">
                  {t('lead.badge')}
                </span>
                <h3 className="text-2xl sm:text-4xl font-bold font-sans mt-4">
                  {t('lead.title')}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-white/80 font-light leading-relaxed">
                  {t('lead.subtitle')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="lead-email" className="text-xs font-semibold text-white/80 mb-2 uppercase tracking-wide">
                    {t('lead.labelEmail')}
                  </label>
                  <input
                    type="email"
                    id="lead-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={t('lead.placeholderEmail')}
                    className="bg-navy-deep/60 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-coral transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-coral text-navy-deep font-bold py-4 rounded-xl hover:bg-white hover:text-navy transition-all duration-300 shadow-lg shadow-coral/10 flex items-center justify-center gap-2"
                  >
                    {loading ? "..." : t('lead.cta')}
                  </button>
                </div>
                {submitError && (
                  <p className="text-sm text-coral text-center" role="alert">
                    {submitError}
                  </p>
                )}
              </form>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
