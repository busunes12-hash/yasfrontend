import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { formatPrice } from '../../utils/formatPrice';
import { trackAddToCart } from '../../utils/analytics';
import Badge from './Badge';

/**
 * StickyATC — fixed bottom bar on mobile PDP.
 * Appears after the user scrolls past the main CTA button.
 * Disappears when the main CTA is visible again.
 */
export default function StickyATC({ product, mainCtaRef, onNotify }) {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const { addItem } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!mainCtaRef?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: '0px 0px -80px 0px' }
    );
    observer.observe(mainCtaRef.current);
    return () => observer.disconnect();
  }, [mainCtaRef]);

  if (!product) return null;
  const name = lang === 'ar' ? product.nameAr : product.nameEn;
  const isLowStock = !product.isSoldOut && product.stockCount > 0 && product.stockCount <= 3;

  const handleAdd = () => {
    addItem(product, 1);
    trackAddToCart(product, 1);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 inset-x-0 z-40 lg:hidden"
        >
          {/* Trust micro-strip above */}
          <div className="bg-deepBrown/95 backdrop-blur-md border-t border-primary/30 px-4 py-1.5">
            <p className="text-[10px] text-center text-primary/90 font-medium tracking-wider uppercase">
              {lang === 'ar'
                ? '✦ شحن مجاني · إرجاع 30 يوم · كاش عند الاستلام'
                : '✦ Free delivery · 30-day returns · Cash on delivery'}
            </p>
          </div>

          <div className="bg-surface border-t border-border shadow-warmLg safe-area-bottom">
            <div className="flex items-center gap-3 px-3 py-3">
              {/* Thumbnail */}
              <img
                src={product.images?.[0]}
                alt={name}
                className="w-12 h-12 rounded-lg object-cover bg-background shrink-0 border border-border"
              />

              {/* Name + price */}
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold text-textPrimary truncate leading-tight ${lang === 'ar' ? 'font-arabic' : ''}`}>
                  {name}
                </p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-sm font-bold text-primary ltr-numerals">
                    {formatPrice(product.price, lang)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-2xs text-textTertiary line-through ltr-numerals">
                      {formatPrice(product.originalPrice, lang)}
                    </span>
                  )}
                  {isLowStock && (
                    <Badge variant="sale" className="text-[9px] px-1.5 py-0">
                      {product.stockCount} {lang === 'ar' ? 'باقي' : 'left'}
                    </Badge>
                  )}
                </div>
              </div>

              {/* CTA */}
              {product.isSoldOut ? (
                <button
                  type="button"
                  onClick={onNotify}
                  className="shrink-0 btn-ghost text-xs px-4 py-3"
                >
                  {lang === 'ar' ? 'نبّهني' : 'Notify me'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleAdd}
                  className="shrink-0 btn-primary text-xs px-5 py-3 font-semibold"
                >
                  {lang === 'ar' ? 'أضفها' : 'Add to bag'}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
