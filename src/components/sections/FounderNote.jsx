import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';

/**
 * FounderNote — humanises the brand on the homepage.
 * Sits between the saffron feature and reviews.
 */
export default function FounderNote() {
  const { t } = useTranslation();
  const { lang } = useLanguage();

  return (
    <section className="bg-background relative overflow-hidden" aria-label="Founder note">
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/[0.04] blur-3xl pointer-events-none" />

      <div className="container-page section-padding relative">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Founder portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 relative mx-auto w-full max-w-sm"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden glow-gold ring-1 ring-border bg-deepBrown">
              <img
                src="https://yasbeads.com/cdn/shop/files/FA0E0C04-B2B8-4246-A48C-83FB456D732E.jpg?v=1751061527"
                alt={lang === 'ar' ? 'ياس، مؤسس ياس بيدز' : 'Yas, founder of Yas Beads'}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Signature plate */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="hidden sm:flex absolute -bottom-5 ltr:-right-5 rtl:-left-5 bg-surface/95 backdrop-blur-md rounded-lg shadow-warmLg p-4 items-center gap-3 border border-border"
            >
              <div className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center border border-primary/30 font-serif text-base">
                Y
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-textTertiary">
                  {lang === 'ar' ? 'المؤسس' : 'Founder'}
                </p>
                <p className="text-sm font-semibold text-textPrimary">Yas · ياس</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-3"
          >
            <span className="eyebrow mb-6 block">
              ✦ {lang === 'ar' ? 'كلمةٌ من المؤسس' : 'A note from the founder'}
            </span>

            {/* Decorative quote mark */}
            <span aria-hidden="true" className="block font-serif text-7xl text-primary/30 leading-none mb-3 select-none">"</span>

            <h2
              className={
                lang === 'ar'
                  ? 'font-arabic text-h2 text-textPrimary leading-[1.6] mb-7'
                  : 'font-serif text-h2 text-textPrimary mb-7'
              }
            >
              {t('sections.founderTitle')}
            </h2>

            <p className="text-body text-textSecondary mb-8 max-w-xl">
              {t('sections.founderBody')}
            </p>

            <Link to="/about" className="link-cta">
              {t('sections.founderCta')}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
