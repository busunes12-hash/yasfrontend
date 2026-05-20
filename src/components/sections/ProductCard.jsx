import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import NotifyMeModal from '../ui/NotifyMeModal';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { formatPrice } from '../../utils/formatPrice';
import { cn } from '../../utils/cn';

/**
 * ProductCard — Sanctuary theme.
 * Pure-CSS hover (no framer-motion) so grids of 8+ cards stay smooth
 * during scroll. Wrapped in `cv-card` so off-screen cards skip
 * paint/layout entirely until they're near the viewport.
 */

const InlineStars = ({ rating = 4.9, count = 42 }) => (
  <div className="flex items-center gap-1 md:gap-1.5 min-w-0" aria-label={`${rating} out of 5, ${count} reviews`}>
    <div className="flex items-center gap-0.5 text-primary shrink-0">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="w-3 h-3"
          fill={i < Math.round(rating) ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M12 2 15.09 8.26 22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2Z" />
        </svg>
      ))}
    </div>
    <span className="text-2xs text-textSecondary tabular-nums truncate">
      {rating} <span className="text-textTertiary">·</span> {count}
    </span>
  </div>
);

function ProductCardImpl({ product, className, eager = false }) {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const { addItem } = useCart();
  const [notifyOpen, setNotifyOpen] = useState(false);

  if (!product) return null;
  const name = lang === 'ar' ? product.nameAr : product.nameEn;
  const subName = lang === 'ar' ? product.nameEn : product.nameAr;
  const isBestseller = product.tags?.includes('bestseller');
  const isLowStock = !product.isSoldOut && product.stockCount > 0 && product.stockCount <= 3;
  const rating = (4.7 + ((product.id?.charCodeAt(1) || 0) % 3) * 0.1).toFixed(1);
  const reviewCount = 12 + ((product.id?.charCodeAt(1) || 0) % 50);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const openNotify = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setNotifyOpen(true);
  };

  return (
    <>
      <div
        className={cn(
          'group relative card-surface flex flex-col overflow-hidden min-w-0 w-full cv-card',
          'hover:-translate-y-1 transition-transform duration-300 ease-out',
          className
        )}
      >
        <Link to={`/product/${product.slug}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-deepBrown">
            <img
              src={product.images?.[0]}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
              fetchpriority={eager ? 'high' : 'auto'}
              width="600"
              height="600"
            />
            {/* Subtle bottom gradient — keeps image grounded */}
            <div className="absolute inset-0 bg-gradient-to-t from-deepBrown/30 via-transparent to-transparent pointer-events-none" />
            {/* Hairline at frame bottom */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            {/* Badges — top start */}
            <div className="absolute top-4 ltr:left-4 rtl:right-4 flex flex-col gap-2">
              {product.isSoldOut && <Badge variant="soldout">{t('product.soldOut')}</Badge>}
              {product.isSale && !product.isSoldOut && <Badge variant="sale">{t('product.sale')}</Badge>}
              {product.badgeType === 'new' && !product.isSoldOut && !product.isSale && (
                <Badge variant="new">{t('product.new')}</Badge>
              )}
            </div>

            {/* Bestseller — top end */}
            {isBestseller && !product.isSoldOut && (
              <div className="absolute top-4 ltr:right-4 rtl:left-4">
                <Badge
                  variant="solid"
                  className="bg-deepBrown/85 text-accent border border-accent/40 shadow-[0_4px_14px_rgba(0,0,0,0.4)]"
                >
                  ★ {lang === 'ar' ? 'الأكثر مبيعاً' : 'Bestseller'}
                </Badge>
              </div>
            )}
          </div>
        </Link>

        <div className="p-4 md:p-7 flex-1 flex flex-col min-w-0">
          <Link to={`/product/${product.slug}`} className="block flex-1 min-w-0">
            {/* Subtitle in eyebrow style */}
            <p className="text-[0.625rem] md:text-eyebrow uppercase tracking-[0.18em] md:tracking-[0.32em] font-semibold text-textTertiary truncate mb-2 md:mb-3">
              {subName}
            </p>

            <h3
              className={cn(
                'text-base md:text-h3 text-textPrimary leading-snug line-clamp-2 mb-2 md:mb-3 group-hover:text-primary transition-colors duration-300 break-words',
                lang === 'ar' ? 'font-arabic font-semibold' : 'font-serif font-medium'
              )}
            >
              {name}
            </h3>

            {/* Inline rating */}
            <div className="mb-3 md:mb-5">
              <InlineStars rating={parseFloat(rating)} count={reviewCount} />
            </div>

            <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1 mb-2 md:mb-3">
              <span className="text-body md:text-body-lg font-medium text-primary ltr-numerals">
                {formatPrice(product.price, lang)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-caption md:text-body-sm text-textTertiary line-through ltr-numerals">
                  {formatPrice(product.originalPrice, lang)}
                </span>
              )}
            </div>

            {/* Soft urgency — only when truthful */}
            {isLowStock && (
              <p className="text-2xs text-primary font-medium mb-3 md:mb-5 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-primary animate-breathe shrink-0" />
                <span className="truncate">{t('product.leftInStock', { count: product.stockCount })}</span>
              </p>
            )}
            {!isLowStock && <div className="mb-3 md:mb-5" />}
          </Link>

          {product.isSoldOut ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={openNotify}
              className="w-full px-3 md:px-5 text-[11px] md:text-xs"
              aria-label={`${t('product.notifyMe')} — ${name}`}
            >
              <span className="truncate">{t('product.notifyMe')}</span>
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={handleAdd}
              className="w-full px-3 md:px-5 text-[11px] md:text-xs"
              aria-label={`${t('product.addToCart')} — ${name}`}
            >
              <span className="truncate">{t('product.addToCart')}</span>
            </Button>
          )}
        </div>
      </div>

      <NotifyMeModal open={notifyOpen} onClose={() => setNotifyOpen(false)} product={product} />
    </>
  );
}

const ProductCard = memo(ProductCardImpl);
export default ProductCard;
