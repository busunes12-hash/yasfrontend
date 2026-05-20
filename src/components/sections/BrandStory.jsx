import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const VALUES = [
  { key: 'handmade',  glyph: '✦' },
  { key: 'exclusive', glyph: '◆' },
  { key: 'spiritual', glyph: '✧' },
  { key: 'premium',   glyph: '❖' },
];

export default function BrandStory() {
  const { t } = useTranslation();
  const { lang } = useLanguage();

  return (
    <section
      className="relative overflow-hidden feature-panel section-edge-top section-edge-bottom"
      aria-label="Brand story"
    >
      {/* Soft halo behind the section */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[760px] h-[440px] rounded-full bg-primary/[0.07] blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="container-page section-padding relative">
        <div className="grid lg:grid-cols-[0.85fr_1fr] gap-14 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Subtle gold halo behind frame */}
            <div className="absolute -inset-4 rounded-[28px] bg-primary/5 blur-2xl pointer-events-none" aria-hidden="true" />
            <div className="media-frame aspect-[4/5]">
              <img
                src="https://yasbeads.com/cdn/shop/files/FA0E0C04-B2B8-4246-A48C-83FB456D732E.jpg?v=1751061527&width=900"
                alt={lang === 'ar' ? 'أتيليه أبوظبي' : 'Abu Dhabi Atelier'}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width="800"
                height="1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deepBrown/30 to-transparent pointer-events-none" />
            </div>
            {/* Heritage badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="hidden md:flex absolute -bottom-7 ltr:-right-7 rtl:-left-7 bg-surface/95 backdrop-blur-md rounded-2xl shadow-[0_18px_48px_-12px_rgba(0,0,0,0.65)] py-4 px-5 items-center gap-4 border border-primary/30"
            >
              <div className="w-11 h-11 rounded-full bg-primary/15 text-primary flex items-center justify-center border border-primary/40 shadow-[0_0_18px_rgba(212,180,131,0.35)] text-lg">
                ✦
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-textTertiary mb-0.5">
                  {lang === 'ar' ? 'الأتيليه' : 'Atelier'}
                </p>
                <p className="text-sm font-semibold text-textPrimary tracking-wide">
                  {lang === 'ar' ? 'أبوظبي' : 'Abu Dhabi'}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow text-accent mb-6 block">
              {lang === 'ar' ? 'الدار' : 'The House'}
            </span>

            <h2 className="font-serif text-h1 text-textPrimary mb-7 text-balance">
              {t('story.title')}
            </h2>

            <div className="hairline-gold w-20 mb-7" />

            <p className="text-body-lg text-textSecondary mb-10 leading-relaxed text-pretty">
              {t('story.intro')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {VALUES.map((v) => (
                <div
                  key={v.key}
                  className="group relative bg-surface/50 backdrop-blur-md border border-border rounded-xl p-5 transition-all duration-500 hover:border-primary/40 hover:bg-surface/70 hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 w-9 h-9 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center text-primary text-base">
                      {v.glyph}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-textPrimary mb-1.5 leading-tight">
                        {t(`story.${v.key}`)}
                      </h3>
                      <p className="text-sm text-textSecondary leading-relaxed">
                        {t(`story.${v.key}Desc`)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/about" className="btn-primary">
                {t('story.readMore')}
              </Link>
              <Link to="/contact" className="btn-ghost">
                {t('story.contact')}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
