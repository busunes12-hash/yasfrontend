import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

/**
 * CollectionCard — Sanctuary theme.
 * Now displays the collection's strategic tagline ("The Signature.")
 * underneath the name, instead of a flat English subtitle.
 */
export default function CollectionCard({ collection, index = 0, featured = false }) {
  const { lang, isRTL } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={featured ? 'sm:col-span-2 sm:row-span-2' : ''}
    >
      <Link
        to={`/shop?collection=${collection.slug}`}
        className="group block relative overflow-hidden rounded-xl bg-surface border border-border transition-all duration-500 hover:border-primary/60 h-full shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
      >
        <div className={`overflow-hidden bg-deepBrown ${featured ? 'aspect-[4/5] sm:aspect-auto sm:h-full sm:min-h-[600px]' : 'aspect-[4/5]'}`}>
          <img
            src={collection.image}
            alt={isRTL ? collection.nameAr : collection.nameEn}
            className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deepBrown/40" />
        </div>

        {/* Overlay caption */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 bg-gradient-to-t from-deepBrown via-deepBrown/85 to-transparent shadow-[0_-4px_12px_rgba(0,0,0,0.3)]">
          <p className="text-[10px] uppercase tracking-[0.32em] text-primary font-semibold mb-2 transition-colors duration-300 group-hover:text-primary-light">
            {isRTL ? collection.taglineAr : collection.taglineEn}
          </p>
          <h3
            className={
              isRTL
                ? 'font-arabic text-2xl md:text-3xl text-textPrimary leading-tight'
                : 'font-serif text-2xl md:text-3xl text-textPrimary leading-tight tracking-[-0.005em]'
            }
          >
            {isRTL ? collection.nameAr : collection.nameEn}
          </h3>
          <div className="mt-3 flex items-center gap-2 text-primary text-eyebrow opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
            <span>{lang === 'ar' ? 'اكتشف' : 'Discover'}</span>
            <span aria-hidden="true">→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
