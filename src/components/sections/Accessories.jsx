import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductsByCollection } from '../../data/products';

export default function Accessories() {
  const { t } = useTranslation();
  const accessories = getProductsByCollection('accessories');

  return (
    <section
      className="relative overflow-hidden section-bg-soft section-edge-top section-edge-bottom"
      aria-label="Accessories"
    >
      <div className="container-page section-padding">
        <div className="text-center section-header">
          <span className="eyebrow mb-5">{t('accessories.eyebrow')}</span>
          <h2 className="font-serif text-h1 text-textPrimary mb-5 text-balance">
            {t('accessories.title')}
          </h2>
          <p className="text-body text-textSecondary max-w-2xl mx-auto text-pretty">
            {t('accessories.subtitle')}
          </p>
          <div className="ornament-divider mt-10 max-w-xs mx-auto">
            <span className="dot" />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {accessories.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              <Link to={`/product/${p.slug}`} className="block group">
                <div className="media-frame aspect-square mb-5 transition-transform duration-300 group-hover:-translate-y-1">
                  <img
                    src={p.images[0]}
                    alt={p.nameEn}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="600"
                  />
                  {p.isSale && (
                    <div className="absolute top-3 ltr:right-3 rtl:left-3 bg-primary text-deepBrown text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-md shadow-md">
                      {t('product.sale')}
                    </div>
                  )}
                  {p.isSoldOut && (
                    <div className="absolute top-3 ltr:right-3 rtl:left-3 bg-badgeRed text-textPrimary text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-md shadow-md">
                      {t('product.soldOut')}
                    </div>
                  )}
                </div>
                <h3 className="font-serif text-lg text-textPrimary mb-1 leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-1">
                  {p.nameEn}
                </h3>
                <p className="text-sm text-textSecondary mb-3 line-clamp-1">{p.specs.length}</p>
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-primary ltr-numerals">
                    AED {p.price}
                  </span>
                  {p.inStock && (
                    <span className="text-[11px] text-success font-medium tracking-wide">
                      {t('product.inStock')}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/shop?collection=accessories" className="link-cta">
            {t('accessories.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
