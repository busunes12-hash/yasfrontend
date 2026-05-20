import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

/**
 * Product grid / carousel section.
 *
 * Layout:
 *   Mobile  → horizontal scroll, 70% card width
 *   Desktop → 3-column (was 4) for more whitespace and image dominance
 *
 * Variants:
 *   scroll  → mobile horizontal, desktop 3-col grid
 *   grid    → mobile 2-col, desktop 3-col grid
 */
export default function ProductGrid({
  products = [],
  title,
  subtitle,
  eyebrow = 'Curated',
  ctaTo = '/shop',
  variant = 'scroll',
}) {
  const { t } = useTranslation();
  if (!products?.length) return null;

  return (
    <section className="bg-background relative">
      <div className="container-page section-padding">
        <div className="flex items-end justify-between flex-wrap gap-6 section-header">
          <div className="max-w-2xl">
            {title && (
              <>
                <span className="eyebrow mb-4">{eyebrow}</span>
                <h2 className="font-serif text-h1 text-textPrimary mb-4 mt-3 text-balance">{title}</h2>
              </>
            )}
            {subtitle && <p className="text-body text-textSecondary">{subtitle}</p>}
          </div>
          <Link to={ctaTo} className="link-cta">
            {t('product.viewAll')}
          </Link>
        </div>

        {variant === 'grid' ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <>
            {/* Mobile horizontal scroll */}
            <div className="md:hidden -mx-5 px-5 flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">
              {products.map((p) => (
                <div key={p.id} className="snap-start shrink-0 w-[72%] xs:w-[60%]">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
            {/* Desktop 3-column grid (was 4) — more breath, larger imagery */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-9">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
