import { Helmet } from 'react-helmet-async';

/**
 * SEO component — per-route <head> management.
 * Handles title, description, Open Graph, Twitter Card, hreflang, and JSON-LD.
 */
export default function SEO({
  title,
  titleAr,
  description,
  descriptionAr,
  image,
  url,
  type = 'website',
  jsonLd,
  lang = 'ar',
  noIndex = false,
}) {
  const siteName = 'Yas Beads | ياس بيدز';
  const siteUrl = 'https://yasbeads.com';
  const defaultImage = `${siteUrl}/og-image.jpg`;
  const defaultDescEn =
    'Yas Beads — the Emirati atelier for heirloom prayer beads. Hand-finished in Abu Dhabi from rare oud, Baltic amber, Negin saffron and precious stone. Numbered editions of fewer than fifty. Complimentary GCC delivery.';
  const defaultDescAr =
    'ياس بيدز — دارٌ إماراتية للمسابيح المتوارَثة. تُصاغ يدوياً في أبوظبي من العود النادر، والكهرمان البلطيقي، وزعفران نجين، والأحجار الكريمة. إصدارات مرقّمة لا تتجاوز الخمسين. توصيل مجاني داخل الخليج.';

  const resolvedTitle = lang === 'ar'
    ? `${titleAr || title || 'ياس بيدز'} | ${siteName}`
    : `${title || 'Yas Beads'} | ${siteName}`;

  const resolvedDesc = lang === 'ar'
    ? (descriptionAr || defaultDescAr)
    : (description || defaultDescEn);

  const resolvedUrl = url ? `${siteUrl}${url}` : siteUrl;
  const resolvedImage = image || defaultImage;

  return (
    <Helmet>
      {/* Primary */}
      <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDesc} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Canonical */}
      <link rel="canonical" href={resolvedUrl} />

      {/* hreflang */}
      <link rel="alternate" hrefLang="ar" href={resolvedUrl} />
      <link rel="alternate" hrefLang="en" href={resolvedUrl} />
      <link rel="alternate" hrefLang="x-default" href={siteUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDesc} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:url" content={resolvedUrl} />
      <meta property="og:locale" content={lang === 'ar' ? 'ar_AE' : 'en_AE'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDesc} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:site" content="@yasbead" />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
