import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAtelierPieces, getBundles } from '../../data/products';

/* Small subcomponent — keeps the row markup uniform between Atelier & Bundles */
function ListRow({ image, title, meta, price, originalPrice, badge, footer }) {
  return (
    <div className="group flex gap-5 items-start py-5 first:pt-0 last:pb-0 border-b border-border/40 last:border-b-0">
      <div className="relative shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-deepBrown ring-1 ring-border shadow-[0_6px_18px_-4px_rgba(0,0,0,0.5)]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          loading="lazy"
          decoding="async"
          width="200"
          height="200"
        />
        {badge && (
          <span className="absolute top-2 right-2 bg-primary text-deepBrown text-[10px] font-bold tracking-wide px-1.5 py-0.5 rounded">
            {badge}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-serif text-lg text-textPrimary mb-1 leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-1">
          {title}
        </h4>
        {meta && <p className="text-sm text-textSecondary mb-3 line-clamp-1">{meta}</p>}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            {originalPrice && (
              <span className="text-xs text-textTertiary line-through ltr-numerals">
                AED {originalPrice}
              </span>
            )}
            <span className="text-base font-medium text-primary ltr-numerals">
              AED {price}
            </span>
          </div>
          {footer}
        </div>
      </div>
    </div>
  );
}

export default function YasCollection() {
  const { t } = useTranslation();
  const atelierPieces = getAtelierPieces();
  const bundles = getBundles();

  return (
    <section
      className="relative overflow-hidden feature-panel section-edge-top section-edge-bottom"
      aria-label="Yas Collection"
    >
      {/* Quiet ambient glows — kept subtle, not loud */}
      <div className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full bg-primary/[0.07] blur-[140px] pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full bg-accent/[0.05] blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="container-page section-padding relative">
        <div className="text-center section-header">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-eyebrow uppercase mb-7 backdrop-blur-sm">
            <span className="w-1 h-1 rounded-full bg-primary animate-breathe" />
            {t('collection.exclusive')}
          </span>
          <h2 className="font-serif text-h1 text-textPrimary mb-5 text-balance">
            {t('collection.title')}
          </h2>
          <p className="text-body-lg text-textSecondary max-w-2xl mx-auto text-pretty">
            {t('collection.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Atelier Pieces */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="card-surface p-7 md:p-9"
          >
            <div className="flex items-center justify-between mb-6 pb-5 border-b border-border/60">
              <div className="flex items-center gap-3">
                <span className="text-primary text-xl leading-none">✦</span>
                <h3 className="font-serif text-xl text-textPrimary leading-none">
                  {t('collection.atelier')}
                </h3>
              </div>
              <span className="text-eyebrow text-textTertiary">01</span>
            </div>

            <div>
              {atelierPieces.slice(0, 3).map((p) => (
                <ListRow
                  key={p.id}
                  image={p.images[0]}
                  title={p.nameEn}
                  meta={p.specs.material}
                  price={p.price}
                  footer={
                    p.stockCount > 0 && p.stockCount <= 5 ? (
                      <span className="text-xs text-badgeRed font-medium whitespace-nowrap">
                        {t('collection.limited')} {p.stockCount}
                      </span>
                    ) : null
                  }
                />
              ))}
            </div>

            <Link to="/shop?tier=atelier" className="link-cta mt-7">
              {t('collection.viewAtelier')}
            </Link>
          </motion.div>

          {/* Bundles */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="card-surface p-7 md:p-9"
          >
            <div className="flex items-center justify-between mb-6 pb-5 border-b border-border/60">
              <div className="flex items-center gap-3">
                <span className="text-primary text-xl leading-none">✦</span>
                <h3 className="font-serif text-xl text-textPrimary leading-none">
                  {t('collection.bundles')}
                </h3>
              </div>
              <span className="text-eyebrow text-textTertiary">02</span>
            </div>

            <div>
              {bundles.slice(0, 3).map((p) => (
                <ListRow
                  key={p.id}
                  image={p.images[0]}
                  title={p.nameEn}
                  meta={p.specs.beadCount}
                  price={p.price}
                  originalPrice={p.originalPrice}
                  badge={
                    p.isSale && p.originalPrice
                      ? `-${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%`
                      : null
                  }
                  footer={
                    p.stockCount > 0 ? (
                      <span className="text-xs text-success font-medium whitespace-nowrap">
                        {t('collection.inStock')}
                      </span>
                    ) : null
                  }
                />
              ))}
            </div>

            <Link to="/shop?tag=bundle" className="link-cta mt-7">
              {t('collection.viewBundles')}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
