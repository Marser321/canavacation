import React from 'react';
import { MessageCircle, PlayCircle, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { buildWhatsAppLink } from './WhatsAppFloat';

const testimonialVideo = '/testimonios/testimonio-cana-vacations-short.mp4';
const testimonialPoster = '/testimonios/testimonio-cana-vacations-poster.jpg';
const youtubeShortUrl = 'https://www.youtube.com/shorts/w0gbhVmhPQE';

export const VideoTestimonials: React.FC = () => {
  const { t } = useLanguage();
  const highlights = t('videoTestimonials.highlights') as string[];
  const whatsappUrl = buildWhatsAppLink({});

  return (
    <section id="testimonios" className="relative overflow-hidden bg-navy-deep py-20 text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-teal/15 blur-[90px]" />
      <div className="absolute -left-24 bottom-20 h-72 w-72 rounded-full bg-coral/10 blur-[90px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-coral/30 bg-coral/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-coral">
            <Star className="h-4 w-4 fill-coral" />
            {t('videoTestimonials.badge')}
          </div>

          <h2 className="mt-6 max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
            {t('videoTestimonials.title')}
          </h2>

          <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-white/78 sm:text-lg">
            {t('videoTestimonials.subtitle')}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {highlights.map((item, index) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-teal/20 text-teal-bright">
                  {index === 0 ? <PlayCircle className="h-5 w-5" /> : null}
                  {index === 1 ? <ShieldCheck className="h-5 w-5" /> : null}
                  {index === 2 ? <Sparkles className="h-5 w-5" /> : null}
                </div>
                <p className="text-sm font-semibold leading-snug text-white/90">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-coral px-7 py-4 text-sm font-bold text-navy-deep shadow-lg shadow-coral/15 transition-all duration-300 hover:bg-white hover:scale-[1.02]"
            >
              <MessageCircle className="h-5 w-5" />
              {t('videoTestimonials.ctaWhatsApp')}
            </a>
            <a
              href={youtubeShortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/25 bg-white/5 px-7 py-4 text-sm font-bold text-white transition-all duration-300 hover:border-coral/70 hover:text-coral"
            >
              <PlayCircle className="h-5 w-5" />
              {t('videoTestimonials.ctaYoutube')}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto w-full max-w-4xl"
        >
          <div className="grid items-center gap-6 lg:grid-cols-[minmax(260px,360px)_1fr]">
            <div className="relative mx-auto w-full max-w-[315px] rounded-[2.25rem] border border-white/15 bg-black p-3 shadow-2xl shadow-black/35">
              <div className="absolute left-1/2 top-3 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-black" />
              <video
                className="aspect-[9/16] w-full rounded-[1.65rem] bg-navy object-cover"
                controls
                playsInline
                preload="metadata"
                poster={testimonialPoster}
                aria-label={t('videoTestimonials.videoLabel')}
              >
                <source src={testimonialVideo} type="video/mp4" />
                {t('videoTestimonials.videoFallback')}
              </video>
            </div>

            <div className="rounded-3xl border border-white/10 bg-navy/60 p-6 shadow-xl sm:p-8">
              <div className="flex items-center gap-1 text-coral">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="mt-5 text-xl font-semibold leading-relaxed text-white sm:text-2xl">
                {t('videoTestimonials.quote')}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-white/68">
                {t('videoTestimonials.context')}
              </p>
              <div className="mt-7 border-t border-white/10 pt-5">
                <p className="text-sm font-bold uppercase tracking-wider text-teal-bright">
                  {t('videoTestimonials.footerLabel')}
                </p>
                <p className="mt-2 text-sm text-white/70">
                  {t('videoTestimonials.footerText')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
