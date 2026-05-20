import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { products } from '../data/products';
import ProductCard from '../components/sections/ProductCard';
import SEO from '../components/seo/SEO';

export default function Sale() {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const saleProducts = products.filter((p) => p.isSale);

  return (
    <>
      <SEO
        title="Final Editions — Up to 30% Off"
        titleAr="الإصدارات الأخيرة — خصم يصل إلى 30٪"
        description="Closing editions from the Yas atelier — heirloom prayer beads at exceptional value. Numbered, signed, and never made the same way twice."
        descriptionAr="إصدارات تُغلق من أتيليه ياس — مسابيح متوارَثة بقيمةٍ استثنائية. مرقّمة، موقّعة، ولا تُعاد بالطريقة ذاتها مرتين."
        url="/sale"
        lang={lang}
      />
      <div className="bg-background">
        {/* Hero banner */}
        <div className="relative bg-deepBrown text-textPrimary border-b border-primary/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-deepBrown via-background to-deepBrown" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/[0.08] blur-3xl pointer-events-none" />
          <div className="container-page py-20 md:py-28 text-center relative">
            <span className="eyebrow text-accent mb-5">
              {lang === 'ar' ? 'الإصدارات الأخيرة' : 'Final Editions'}
            </span>
            <h1 className="font-serif text-display text-textPrimary mb-6 mt-3 text-balance">
              {lang === 'ar' ? 'وداع الإصدار · حتى 30٪' : 'Edition Farewell · Up to 30% Off'}
            </h1>
            <p className="text-body-lg text-textSecondary max-w-xl mx-auto">
              {lang === 'ar'
                ? 'قطعٌ أخيرة من إصدارات تُغلق. مرقّمة، موقّعة، ولا تُعاد بالطريقة ذاتها مرتين.'
                : 'The last pieces from closing editions. Numbered, signed, and never made the same way twice.'}
            </p>
          </div>
        </div>

        <div className="container-page section-padding">
          {saleProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-body text-textSecondary">{t('shop.noResults')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {saleProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
