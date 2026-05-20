import { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProducts } from '../hooks/useProducts';
import { collections, getCollection } from '../data/collections';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/sections/ProductCard';
import SEO from '../components/seo/SEO';
import { cn } from '../utils/cn';

export default function Shop() {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const [params, setParams] = useSearchParams();

  const collectionParam = params.get('collection');
  const tagParam = params.get('tag');
  const searchParam = params.get('search');

  const filter = useMemo(
    () => ({ collection: collectionParam, tag: tagParam, search: searchParam }),
    [collectionParam, tagParam, searchParam]
  );

  const { products } = useProducts(filter);
  const activeCollection = collectionParam ? getCollection(collectionParam) : null;

  const setCollection = (slug) => {
    const next = new URLSearchParams(params);
    if (slug) next.set('collection', slug);
    else next.delete('collection');
    setParams(next, { replace: true });
  };

  return (
    <div className="bg-background">
      <SEO
        title={activeCollection ? activeCollection.nameEn : 'Shop All Misbaha'}
        titleAr={activeCollection ? activeCollection.nameAr : 'تسوق جميع المسابيح'}
        description={activeCollection ? activeCollection.descriptionEn : 'Shop all Yas Beads luxury misbaha collections. Saffron, amber, natural and professional.'}
        descriptionAr={activeCollection ? activeCollection.descriptionAr : 'تسوق جميع مجموعات ياس بيدز. زعفران، كهرمان، طبيعية وإحترافية.'}
        url={`/shop${collectionParam ? `?collection=${collectionParam}` : ''}`}
        lang={lang}
      />
      <div className="container-page section-padding">
        {/* Header */}
        <div className="section-header">
          <span className="eyebrow mb-4">
            {activeCollection
              ? (lang === 'ar' ? activeCollection.taglineAr : activeCollection.taglineEn)
              : t('shop.title')}
          </span>
          <h1 className="font-serif text-h1 text-textPrimary mb-5 mt-3 text-balance">
            {activeCollection
              ? lang === 'ar' ? activeCollection.nameAr : activeCollection.nameEn
              : tagParam === 'gift'
                ? (lang === 'ar' ? 'الهدايا' : 'Gifts')
                : tagParam === 'bundle'
                  ? (lang === 'ar' ? 'مجموعات مختارة' : 'Curated Sets')
                  : searchParam
                    ? (lang === 'ar' ? `بحث: ${searchParam}` : `Search: ${searchParam}`)
                    : (lang === 'ar' ? 'الأتيليه' : 'The Atelier')}
          </h1>
          {activeCollection && (
            <>
              <p className="text-body text-textSecondary max-w-2xl mb-4">
                {lang === 'ar' ? activeCollection.heroAr : activeCollection.heroEn}
              </p>
              <p className="eyebrow">
                {lang === 'ar' ? activeCollection.forAr : activeCollection.forEn}
              </p>
            </>
          )}
        </div>

        {/* Filter chips */}
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar mb-12 -mx-4 px-4 pb-1 w-full box-border">
          <button
            type="button"
            onClick={() => setCollection(null)}
            className={cn(
              'shrink-0 rounded-full border px-4 py-2 text-xs font-medium tracking-[0.06em] transition-all duration-300',
              !collectionParam
                ? 'bg-primary text-deepBrown border-primary shadow-warm'
                : 'bg-surface/40 text-textSecondary border-border hover:border-primary hover:text-primary'
            )}
          >
            {t('shop.all')}
          </button>
          {collections.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCollection(c.slug)}
              className={cn(
                'shrink-0 rounded-full border px-4 py-2 text-xs font-medium tracking-[0.06em] transition-all duration-300',
                collectionParam === c.slug
                  ? 'bg-primary text-deepBrown border-primary shadow-warm'
                  : 'bg-surface/40 text-textSecondary border-border hover:border-primary hover:text-primary'
              )}
            >
              {lang === 'ar' ? (c.shortAr || c.nameAr) : (c.shortEn || c.nameEn)}
            </button>
          ))}
        </div>

        {/* Results */}
        {products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-body text-textSecondary mb-8">{t('shop.noResults')}</p>
            <Link to="/shop" className="btn-primary inline-flex">
              {t('shop.all')}
            </Link>
          </div>
        ) : (
          <>
            <p className="text-body-sm text-textSecondary mb-6">
              {t('shop.showing', { count: products.length })}
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
