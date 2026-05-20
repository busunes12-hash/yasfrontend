import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function SaffronFeature() {
  const { t } = useTranslation();
  const features = [
    t('sections.saffronFeatures.1'),
    t('sections.saffronFeatures.2'),
    t('sections.saffronFeatures.3'),
  ];

  return (
    <section className="relative overflow-hidden bg-deepBrown text-textPrimary" aria-label="Saffron feature">
      {/* Top hairline */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Soft gold radial glows */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/[0.08] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-32 w-[600px] h-[600px] rounded-full bg-accent/[0.06] blur-3xl pointer-events-none" />

      <div className="container-page section-padding-lg relative">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-eyebrow text-xs uppercase tracking-widest mb-6">
            {t('saffron.exclusive')}
          </span>
          <h2 className="font-serif text-h1 text-textPrimary mb-6">
            {t('saffron.title')}
          </h2>
          <p className="text-body-lg text-textSecondary max-w-2xl mx-auto">
            {t('saffron.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden glow-gold ring-1 ring-primary/20">
              <img
                src="https://yasbeads.com/cdn/shop/files/FA0E0C04-B2B8-4246-A48C-83FB456D732E.jpg?v=1751061527"
                alt="Yas Beads saffron misbaha"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating limited-drop chip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="hidden md:flex absolute -top-5 ltr:-right-5 rtl:-left-5 bg-surface/95 backdrop-blur-md rounded-full px-4 py-2 items-center gap-2 border border-primary/30 shadow-warm"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-breathe" />
              <span className="text-eyebrow text-primary font-semibold">{t('saffron.limited')}</span>
            </motion.div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <ul className="space-y-4 mb-12">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <span
                    className="shrink-0 w-7 h-7 rounded-full border border-primary/40 bg-primary/10 text-primary flex items-center justify-center text-xs mt-0.5 transition-all duration-300 group-hover:bg-primary group-hover:text-deepBrown"
                    aria-hidden="true"
                  >
                    ✦
                  </span>
                  <span className="text-textPrimary/85 text-body">{f}</span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-surface/30 backdrop-blur-sm border border-primary/20 rounded-xl p-6">
                <span className="text-2xl mb-3 block">✦</span>
                <h3 className="font-semibold text-textPrimary mb-2">{t('saffron.fragrance')}</h3>
                <p className="text-sm text-textSecondary">{t('saffron.fragranceDesc')}</p>
              </div>
              <div className="bg-surface/30 backdrop-blur-sm border border-primary/20 rounded-xl p-6">
                <span className="text-2xl mb-3 block">✦</span>
                <h3 className="font-semibold text-textPrimary mb-2">{t('saffron.exclusivity')}</h3>
                <p className="text-sm text-textSecondary">{t('saffron.exclusivityDesc')}</p>
              </div>
            </div>

            <Link to="/shop?collection=saffron" className="btn-primary">
              {t('saffron.cta')}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom hairline */}
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </section>
  );
}
