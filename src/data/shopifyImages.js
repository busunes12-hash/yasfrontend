/**
 * Real Shopify product images extracted from yasbeads.com
 * Format: { slug: ['image-url-1', 'image-url-2', ...] }
 */

export const shopifyImages = {
  // Saffron Collection
  'saffron-red': [
    'https://yasbeads.com/cdn/shop/files/FA0E0C04-B2B8-4246-A48C-83FB456D732E.jpg?v=1751061527',
  ],
  'saffron-pink': [
    'https://yasbeads.com/cdn/shop/files/5B787386-B35D-4893-BAFA-E48C99523438.jpg?v=1741814557',
  ],
  'saffron-amber-noir': [
    'https://yasbeads.com/cdn/shop/files/94C7D05A-E940-46DD-87C6-AD1E09902DCD.jpg?v=1741814590',
  ],
  
  // Amber Collection
  'amber-branch': [
    'https://yasbeads.com/cdn/shop/files/69344518-A1AC-4139-B4FB-A49B40006B3C.jpg?v=1734351398',
  ],
  'amber-honey': [
    'https://yasbeads.com/cdn/shop/files/7F228C35-5A94-4FB7-BCC5-B83F0753B107.jpg?v=1734350579',
  ],
  
  // Professional Collection
  'tiffany': [
    'https://yasbeads.com/cdn/shop/files/6E1C3C0D-52E3-47DB-A112-EBA91F8BD393.jpg?v=1763302315',
  ],
  'pro-onyx': [
    'https://yasbeads.com/cdn/shop/files/8E012334-B76E-4FAD-9645-5678314330BD.jpg?v=1733741918',
  ],
  
  // Fragrant Collection
  'fragrant-rose': [
    'https://yasbeads.com/cdn/shop/files/5F363D29-84A9-447A-88CD-236E1A7BE2DE.jpg?v=1721165523',
  ],
  
  // Natural Collection
  'natural-oud': [
    'https://yasbeads.com/cdn/shop/files/1BE926A6-5A90-44BF-86D6-9BBC24CD8608.jpg?v=1745793350',
  ],
  'natural-wood': [
    'https://yasbeads.com/cdn/shop/files/8FC6EF81-3ACA-46A3-BA96-4180FA49839F.jpg?v=1745792966',
  ],
  
  // Accessories
  'amber-bracelet': [
    'https://yasbeads.com/cdn/shop/files/4F02A692-062B-480C-9E53-B0B207C82C9D.jpg?v=1734348694',
  ],
  
  // Bundles
  'bundle-saffron-set': [
    'https://yasbeads.com/cdn/shop/files/53AF5687-CE52-46CF-8572-BFF6A318C0AB.jpg?v=1734348055',
  ],
  'bundle-fathers-gift': [
    'https://yasbeads.com/cdn/shop/files/BEC63DC2-14D9-45FF-901F-3AA454B2471F.jpg?v=1734347284',
  ],
  'bundle-beginners': [
    'https://yasbeads.com/cdn/shop/files/7F228C35-5A94-4FB7-BCC5-B83F0753B107.jpg?v=1734350579',
  ],
  'bundle-collectors-three': [
    'https://yasbeads.com/cdn/shop/files/4F02A692-062B-480C-9E53-B0B207C82C9D.jpg?v=1734348694',
  ],
};

// Helper function to get Shopify images for a product
export const getShopifyImages = (slug) => {
  return shopifyImages[slug] || [];
};
