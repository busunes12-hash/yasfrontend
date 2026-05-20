import { useTranslation } from 'react-i18next';
import Hero from '../components/sections/Hero';
import FeaturedCollections from '../components/sections/FeaturedCollections';
import BestSellers from '../components/sections/BestSellers';
import YasCollection from '../components/sections/YasCollection';
import Accessories from '../components/sections/Accessories';
import BrandStory from '../components/sections/BrandStory';
import TrustBadges from '../components/sections/TrustBadges';
import ContactInfo from '../components/sections/ContactInfo';
import Newsletter from '../components/sections/Newsletter';
import { useProducts } from '../hooks/useProducts';
import { getBundles } from '../data/products';
import SEO from '../components/seo/SEO';
import { useLanguage } from '../context/LanguageContext';

/**
 * Homepage — Quiet luxury, devotion, heritage.
 * Yas Beads — the Emirati atelier for heirloom prayer beads.
 *
 * Each non-LCP section is wrapped in `cv-auto` (content-visibility: auto)
 * so the browser skips layout/paint for sections that aren't near the
 * viewport. Big scroll-perf win on long pages.
 */
export default function Home() {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const { bestsellers } = useProducts();
  const bundles = getBundles();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Yas Beads',
    url: 'https://yasbeads.com',
    logo: 'https://yasbeads.com/favicon.svg',
    sameAs: ['https://instagram.com/yasbead'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Arabic', 'English'],
    },
  };

  return (
    <>
      <SEO
        title="Yas Beads — The Emirati Atelier for Heirloom Prayer Beads"
        titleAr="ياس بيدز — الأتيليه الإماراتي للمسابيح المتوارَثة"
        description="Heirloom prayer beads in rare oud, Negin saffron, Baltic amber and precious stone. Hand-finished in Abu Dhabi, in numbered editions of fewer than fifty. Complimentary GCC delivery. Cash on delivery."
        descriptionAr="مسابيحٌ متوارَثة من العود النادر، وزعفران نجين، والكهرمان البلطيقي، والأحجار الكريمة. صياغة يدوية في أبوظبي، في إصدارات مرقّمة لا تتجاوز الخمسين. توصيل مجاني للخليج، مع الدفع عند الاستلام."
        url="/"
        jsonLd={jsonLd}
        lang={lang}
      />

      {/* 1. Hero — emotional hook in 2 seconds (LCP, no cv-auto) */}
      <Hero />

      {/* 2. Featured Collections Slider */}
      <div className="cv-auto"><FeaturedCollections /></div>

      {/* 3. Best Sellers Section */}
      <div className="cv-auto"><BestSellers /></div>

      {/* 4. Yas Collection Section */}
      <div className="cv-auto"><YasCollection /></div>

      {/* 5. Accessories Section */}
      <div className="cv-auto"><Accessories /></div>

      {/* 6. Brand Story / About Us */}
      <div className="cv-auto"><BrandStory /></div>

      {/* 7. Trust Badges */}
      <div className="cv-auto"><TrustBadges /></div>

      {/* 8. Contact Info */}
      <div className="cv-auto"><ContactInfo /></div>

      {/* 9. Newsletter */}
      <div className="cv-auto"><Newsletter /></div>
    </>
  );
}
