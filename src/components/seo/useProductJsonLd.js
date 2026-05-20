/**
 * Builds a JSON-LD Product schema object for a given product.
 * Used on ProductDetail pages for rich search results.
 */
export function useProductJsonLd(product, lang = 'ar') {
  if (!product) return null;

  const siteUrl = 'https://yasbeads.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: lang === 'ar' ? product.nameAr : product.nameEn,
    description: lang === 'ar' ? product.descriptionAr : product.descriptionEn,
    image: product.images || [],
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Yas Beads',
    },
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/product/${product.slug}`,
      priceCurrency: 'AED',
      price: product.price,
      availability: product.isSoldOut
        ? 'https://schema.org/OutOfStock'
        : 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Yas Beads',
      },
    },
    // Placeholder aggregate rating — replace with real data from review system
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '42',
      bestRating: '5',
      worstRating: '1',
    },
  };
}
