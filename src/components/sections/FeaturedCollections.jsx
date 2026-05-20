import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collections } from '../../data/collections';

export default function FeaturedCollections() {
  const { t } = useTranslation();

  // Sort collections by order
  const sorted = [...collections].sort((a, b) => (a.order || 99) - (b.order || 99));

  return (
    <section
      className="relative overflow-hidden section-bg-soft section-edge-top section-edge-bottom"
      aria-label="Featured collections"
    >
      <div className="container-page section-padding">
        <div className="text-center section-header">
          <span className="eyebrow mb-5">{t('collections.title')}</span>
          <h2 className="font-serif text-h1 text-textPrimary mb-6 text-balance max-w-3xl mx-auto">
            {t('collections.subtitle')}
          </h2>
          <div className="ornament-divider mt-10 max-w-xs mx-auto">
            <span className="dot" />
          </div>
        </div>

        {/* Mobile horizontal scroll */}
        <div className="md:hidden -mx-4 px-4 flex gap-5 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory w-full box-border">
          {sorted.map((c, i) => (
            <motion.div
              key={c.id}
              className="snap-start shrink-0 w-[78%]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              <Link to={`/shop?collection=${c.slug}`} className="block group">
                <div className="media-frame aspect-[4/5] mb-4">
                  <img
                    src={c.image}
                    alt={c.nameEn}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="750"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deepBrown via-deepBrown/35 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-eyebrow text-primary mb-2">{c.taglineEn}</p>
                    <h3 className="font-serif text-2xl text-textPrimary leading-tight">
                      {c.nameEn}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {sorted.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              <Link to={`/shop?collection=${c.slug}`} className="block group">
                <div className="media-frame aspect-[4/5] mb-5 transition-transform duration-300 group-hover:-translate-y-1">
                  <img
                    src={c.image}
                    alt={c.nameEn}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deepBrown via-deepBrown/40 to-transparent" />
                  <div className="absolute bottom-7 left-7 right-7">
                    <p className="text-eyebrow text-primary mb-2 opacity-90">{c.taglineEn}</p>
                    <h3 className="font-serif text-3xl text-textPrimary leading-tight">
                      {c.nameEn}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2 link-cta">
                  <span>{t('collections.explore')}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
