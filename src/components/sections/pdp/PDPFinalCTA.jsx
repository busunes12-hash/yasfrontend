import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../context/LanguageContext';
import { formatPrice } from '../../../utils/formatPrice';
import { cn } from '../../../utils/cn';
import Badge from '../../ui/Badge';

const WA_NUMBER = '971553779772';

/**
 * Final CTA — last chance to convert before related-products.
 * Echoes the product, restates urgency + guarantee, gives one decisive button.
 */
export default function PDPFinalCTA({ product, onAdd, onNotify }) {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  if (!product) return null;

  const name = lang === 'ar' ? product.nameAr : product.nameEn;
  const promise = lang === 'ar' ? product.promiseAr : product.promiseEn;
  const lowStock = !product.isSoldOut && product.stockCount > 0 && product.stockCount <= 5;

  const waMessage = encodeURIComponent(
    lang === 'ar'
      ? `السلام عليكم، أبغى أستفسر عن: ${product.nameAr}`
      : `Hello, I'd like to enquire about: ${product.nameEn}`
  );

  return (
    <section className="relative bg-background overflow-hidden cv-auto" aria-label="Final call to action">
      <div className="absolute inset-0 bg-gradient-to-b from-deepBrown/40 via-transparent to-deepBrown/40 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/[0.07] blur-3xl pointer-events-none" />

      <div className="container-page py-16 md:py-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="eyebrow mb-4 block">
            ✦ {lang === 'ar' ? 'القرار' : 'The decision'}
          </span>

          <h2 className={cn('text-h2 md:text-display text-textPrimary mb-4 text-balance', lang === 'ar' ? 'font-arabic font-semibold' : 'font-serif')}>
            {t('pdp.ctaTitle')}
          </h2>

          {promise && (
            <p className={cn('text-body-lg italic text-primary mb-3', lang === 'ar' ? 'font-arabic' : 'font-serif')}>
              {promise}
            </p>
          )}

          <p className="text-body text-textSecondary max-w-xl mx-auto mb-8">
            {t('pdp.ctaSub')}
          </p>

          {/* Mini product card */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-5 mb-8 rounded-2xl bg-surface/60 backdrop-blur-sm border border-primary/20 max-w-md mx-auto w-full">
            <img
              src={product.images?.[0]}
              alt={name}
              className="w-20 h-20 rounded-xl object-cover bg-deepBrown shrink-0"
              loading="lazy"
            />
            <div className="text-start flex-1 min-w-0">
              <p className={cn('font-semibold text-textPrimary text-sm truncate mb-1', lang === 'ar' ? 'font-arabic' : '')}>
                {name}
              </p>
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="text-lg font-medium text-primary ltr-numerals">
                  {formatPrice(product.price, lang)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-textTertiary line-through ltr-numerals">
                    {formatPrice(product.originalPrice, lang)}
                  </span>
                )}
              </div>
              {lowStock && (
                <Badge variant="sale" className="text-[10px]">
                  {t('product.leftInStock', { count: product.stockCount })}
                </Badge>
              )}
              {product.isSoldOut && (
                <Badge variant="soldout" className="text-[10px]">
                  {t('product.soldOut')}
                </Badge>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
            {product.isSoldOut ? (
              <button onClick={onNotify} className="btn-primary flex-1">
                {t('product.notifyMe')}
              </button>
            ) : (
              <button onClick={onAdd} className="btn-primary flex-1">
                {t('pdp.ctaPrimary')}
              </button>
            )}
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost flex-1"
            >
              {t('pdp.ctaSecondary')}
            </a>
          </div>

          {/* Reassurance row */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-2xs text-textTertiary">
            <span className="flex items-center gap-1.5">
              <span className="text-primary">✦</span>
              {lang === 'ar' ? 'إرجاع 30 يوم' : '30-day returns'}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-primary">✦</span>
              {lang === 'ar' ? 'كاش عند الاستلام' : 'Cash on delivery'}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-primary">✦</span>
              {lang === 'ar' ? 'شحن مجاني للخليج' : 'Free GCC delivery'}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
