import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useProducts } from '../../hooks/useProducts';

export default function BestSellers() {
  const { t } = useTranslation();
  const { bestsellers } = useProducts();

  return (
    <section className="relative overflow-hidden" aria-label="Best sellers">
      <div className="container-page section-padding">
        <div className="flex items-end justify-between flex-wrap gap-8 mb-16 md:mb-20">
          <div className="max-w-2xl">
            <span className="eyebrow mb-5">{t('bestsellers.eyebrow')}</span>
            <h2 className="font-serif text-h1 text-textPrimary mb-5 text-balance">
              {t('bestsellers.title')}
            </h2>
            <p className="text-body text-textSecondary max-w-xl text-pretty">
              {t('bestsellers.subtitle')}
            </p>
          </div>
          <Link to="/shop?tag=bestseller" className="link-cta self-end">
            {t('bestsellers.viewAll')}
          </Link>
        </div>

        {/* Mobile horizontal scroll */}
        <div className="md:hidden -mx-4 px-4 flex gap-5 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory w-full box-border">
          {bestsellers.slice(0, 8).map((p, i) => (
            <div key={p.id} className="snap-start shrink-0 w-[72%] xs:w-[60%]">
              <ProductCard product={p} eager={i === 0} />
            </div>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-8">
          {bestsellers.slice(0, 8).map((p, i) => (
            <ProductCard key={p.id} product={p} eager={i < 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
