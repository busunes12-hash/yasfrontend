/**
 * Yas Beads — collection families, in strategic order.
 *
 * Each collection has:
 *  - id, slug
 *  - nameAr / nameEn       — display name
 *  - taglineAr / taglineEn — one-line positioning
 *  - descriptionAr / descriptionEn — one-line description
 *  - image
 *  - order
 */
export const collections = [
  {
    id: 'saffron',
    slug: 'saffron',
    nameAr: 'الزعفران',
    nameEn: 'Saffron',
    taglineAr: 'التوقيع',
    taglineEn: 'The Signature',
    descriptionAr: 'مسابيح بعبق الزعفران',
    descriptionEn: 'Saffron-infused beads',
    image: 'https://yasbeads.com/cdn/shop/files/FA0E0C04-B2B8-4246-A48C-83FB456D732E.jpg?v=1751061527',
    order: 1,
  },
  {
    id: 'amber',
    slug: 'amber',
    nameAr: 'الكهرمان',
    nameEn: 'Amber',
    taglineAr: 'الاقتناء',
    taglineEn: 'The Investment',
    descriptionAr: 'كهرمان بلطيقي أصلي',
    descriptionEn: 'Real Baltic amber',
    image: 'https://yasbeads.com/cdn/shop/files/69344518-A1AC-4139-B4FB-A49B40006B3C.jpg?v=1734351398',
    order: 2,
  },
  {
    id: 'professional',
    slug: 'professional',
    nameAr: 'الاحترافية',
    nameEn: 'Professional',
    taglineAr: 'رفيق اليوم',
    taglineEn: 'The Daily Companion',
    descriptionAr: 'مصقولة ومتوازنة',
    descriptionEn: 'Polished & balanced',
    image: 'https://yasbeads.com/cdn/shop/files/6E1C3C0D-52E3-47DB-A112-EBA91F8BD393.jpg?v=1763302315',
    order: 3,
  },
  {
    id: 'fragrant',
    slug: 'fragrant',
    nameAr: 'الفواحة',
    nameEn: 'Fragrant',
    taglineAr: 'أبعد من الزعفران',
    taglineEn: 'Beyond Saffron',
    descriptionAr: 'عطور متنوعة',
    descriptionEn: 'Diverse scents',
    image: 'https://yasbeads.com/cdn/shop/files/5F363D29-84A9-447A-88CD-236E1A7BE2DE.jpg?v=1721165523',
    order: 4,
  },
  {
    id: 'natural',
    slug: 'natural',
    nameAr: 'الطبيعية',
    nameEn: 'Natural',
    taglineAr: 'البداية',
    taglineEn: 'The First Piece',
    descriptionAr: 'أحجار وأخشاب طبيعية',
    descriptionEn: 'Natural stones & woods',
    image: 'https://yasbeads.com/cdn/shop/files/1BE926A6-5A90-44BF-86D6-9BBC24CD8608.jpg?v=1745793350',
    order: 5,
  },
  {
    id: 'accessories',
    slug: 'accessories',
    nameAr: 'الإكسسوارات',
    nameEn: 'Accessories',
    taglineAr: 'لإكمال الإطلالة',
    taglineEn: 'Complete the Set',
    descriptionAr: 'أساور متطابقة',
    descriptionEn: 'Matching bracelets',
    image: 'https://yasbeads.com/cdn/shop/files/4F02A692-062B-480C-9E53-B0B207C82C9D.jpg?v=1734348694',
    order: 6,
  },
];

export const getCollection = (slug) => collections.find((c) => c.slug === slug);
