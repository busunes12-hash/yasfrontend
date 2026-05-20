/**
 * Yas Beads catalogue — strategically rewritten.
 *
 * Each product has:
 *  - id, slug
 *  - nameAr / nameEn — with Series number where applicable
 *  - promiseAr / promiseEn — the one-line italic promise (max ~10 words)
 *  - descriptionAr / descriptionEn — factual product description
 *  - specs — { beadCount, length, weight, material, fragranceLasts, artisan, series }
 *  - tier — 'entry' | 'core' | 'collector' | 'atelier' | 'bundle'
 *  - tags — ['bestseller', 'gift', 'bundle', 'atelier', ...]
 *
 * Pricing ladder:
 *  - Entry      AED 150–220
 *  - Core       AED 280–400
 *  - Collector  AED 420–600
 *  - Atelier    AED 700–1,200
 *  - Bundles    AED 280–980 (cross-sell)
 */

import { getShopifyImages } from './shopifyImages';

const img = (txt, color = '0A0E0E', bg = 'C9A961', size = '800x800') =>
  `https://placehold.co/${size}/${color}/${bg}?text=${encodeURIComponent(txt)}`;

const buildImages = (label, palette = ['0A0E0E', '0F1515', '1A2222', '222B2B']) =>
  palette.map((c, i) => img(`${label} · ${i + 1}`, c, i % 2 === 0 ? 'C9A961' : 'E2C58A'));

// Use Shopify images if available, otherwise fallback to placeholder images
const getProductImages = (slug, label) => {
  const shopifyImages = getShopifyImages(slug);
  if (shopifyImages && shopifyImages.length > 0) {
    return shopifyImages;
  }
  const placeholders = buildImages(label);
  return placeholders && placeholders.length > 0 ? placeholders : [img(label)];
};

export const products = [
  // ════════════════════════════════════════════════════════════
  // SAFFRON — The Signature
  // ════════════════════════════════════════════════════════════
  {
    id: 'p1',
    slug: 'saffron-red',
    nameAr: 'مسباح زعفران أحمر · الإصدار الثالث',
    nameEn: 'Red Saffron Misbaha · Third Series',
    promiseAr: 'عطر زعفران ناعم.',
    promiseEn: 'Subtle saffron scent.',
    price: 350,
    originalPrice: null,
    images: getProductImages('saffron-red', 'Saffron Red'),
    collection: 'saffron',
    tier: 'core',
    inStock: true,
    stockCount: 4,
    isSale: false,
    isSoldOut: false,
    badgeType: 'new',
    tags: ['bestseller', 'gift', 'signature'],
    descriptionEn:
      'Thirty-three beads, infused with Negin saffron from a single Iranian harvest. The fragrance does not announce itself. You notice it on the third or fourth pass through the beads — quiet, a little warm, never sweet. The cord is hand-knotted in Abu Dhabi, the silver caps pressed by Mahmoud, our master artisan since 2024. Each Series is finished in a batch of forty. This is the Third. The fragrance lasts roughly eighteen months under daily handling.',
    descriptionAr:
      'ثلاث وثلاثون خرزة، مشبعة بزعفران نجين من حصاد إيراني واحد. العطر لا يفرض نفسه. تلاحظه عند الذكر الثالث أو الرابع — هادئ، دافئ قليلاً، لا حلو. الخيط معقود يدوياً في أبوظبي، والقمعان الفضيان من صناعة محمود، حرفينا الأول منذ 2024. كل إصدار يُصنع في دفعة من أربعين. هذا هو الثالث. العطر يدوم حوالي ثمانية عشر شهراً مع الاستخدام اليومي.',
    specs: {
      beadCount: 33,
      length: '38 cm',
      weight: '42 g',
      material: 'Saffron-infused resin · sterling silver caps',
      materialAr: 'راتنج مشبع بالزعفران · قمعان فضة استرلينية',
      fragranceLasts: '~18 months',
      artisan: 'Mahmoud',
      series: 'Third Series · May 2026',
      seriesAr: 'الإصدار الثالث · مايو 2026',
    },
  },
  {
    id: 'p2',
    slug: 'saffron-pink',
    nameAr: 'مسباح زعفران وردي · الإصدار الثاني',
    nameEn: 'Pink Saffron Misbaha · Second Series',
    promiseAr: 'عطر وردي ناعم.',
    promiseEn: 'Soft floral scent.',
    price: 300,
    originalPrice: null,
    images: getProductImages('saffron-pink', 'Saffron Pink'),
    collection: 'saffron',
    tier: 'core',
    inStock: false,
    stockCount: 0,
    isSale: false,
    isSoldOut: true,
    badgeType: 'soldout',
    tags: ['bestseller'],
    descriptionEn:
      'A softer Series. Saffron blended with Taif rose, infused into pale resin. The fragrance is more floral than the Red Series — closer to the scent of a rose garden after rain than to a kitchen. Forty pieces. The Second Series found its homes in nine days. The Third is being finished now.',
    descriptionAr:
      'إصدار أكثر نعومة. زعفران مع ورد طائفي، مدمج في راتنج فاتح. العطر أكثر زهرية من الإصدار الأحمر — أقرب إلى حديقة ورد بعد المطر منه إلى المطبخ. أربعون قطعة. الإصدار الثاني وجد أصحابه في تسعة أيام. الإصدار الثالث قيد الصناعة.',
    specs: {
      beadCount: 33,
      length: '38 cm',
      weight: '40 g',
      material: 'Saffron-rose resin · sterling silver caps',
      materialAr: 'راتنج زعفران وورد · قمعان فضة استرلينية',
      fragranceLasts: '~16 months',
      artisan: 'Mahmoud',
      series: 'Second Series · February 2026',
      seriesAr: 'الإصدار الثاني · فبراير 2026',
    },
  },
  {
    id: 'p11',
    slug: 'saffron-amber-noir',
    nameAr: 'مسباح زعفران عنبر · الإصدار الأول',
    nameEn: 'Saffron Amber Noir · First Series',
    promiseAr: 'عطر عود ثقيل.',
    promiseEn: 'Heavy agarwood scent.',
    price: 920,
    originalPrice: null,
    images: getProductImages('saffron-amber-noir', 'Saffron Noir'),
    collection: 'saffron',
    tier: 'atelier',
    inStock: true,
    stockCount: 2,
    isSale: false,
    isSoldOut: false,
    badgeType: 'new',
    tags: ['atelier', 'collector', 'signature'],
    descriptionEn:
      'Ten pieces, finished by hand by Yas himself. Negin saffron blended with aged Cambodian agarwood, set into deep noir resin and capped in 925 silver. The fragrance is heavier and longer-lasting than the standard Series — closer to twenty-four months. Each piece is signed and numbered. This is the First Series and will not be remade.',
    descriptionAr:
      'عشر قطع، صنعها ياس بنفسه. زعفران نجين ممزوج بعود كمبودي معتق، مغمور في راتنج عنبري داكن، وقمعان من فضة 925. العطر أثقل وأطول من الإصدار العادي — قرابة أربعة وعشرين شهراً. كل قطعة موقّعة ومرقّمة. هذا الإصدار الأول، ولن يُعاد.',
    specs: {
      beadCount: 33,
      length: '40 cm',
      weight: '58 g',
      material: 'Aged agarwood · saffron infusion · 925 silver',
      materialAr: 'عود معتق · زعفران · فضة 925',
      fragranceLasts: '~24 months',
      artisan: 'Yas (founder)',
      series: 'First Series · Numbered 1–10',
      seriesAr: 'الإصدار الأول · مرقّم 1–10',
    },
  },

  // ════════════════════════════════════════════════════════════
  // AMBER — The Investment
  // ════════════════════════════════════════════════════════════
  {
    id: 'p4',
    slug: 'amber-branch',
    nameAr: 'مسباح غصن الكهرمان',
    nameEn: 'Amber Branch Misbaha',
    promiseAr: 'كهرمان بلطيقي أصلي.',
    promiseEn: 'Authentic Baltic amber.',
    price: 450,
    originalPrice: 520,
    images: getProductImages('amber-branch', 'Amber Branch'),
    collection: 'amber',
    tier: 'collector',
    inStock: true,
    stockCount: 2,
    isSale: true,
    isSoldOut: false,
    badgeType: 'sale',
    tags: ['bestseller', 'gift', 'collector'],
    descriptionEn:
      'Real Baltic amber, hand-strung from a single seam. Each bead has a grain, an air bubble, an inclusion you will never find again on another piece. Amber appreciates with handling — the warmth of skin slowly deepens the colour over the years. This is one of two pieces remaining from the original cut.',
    descriptionAr:
      'كهرمان بلطيقي حقيقي، مصفوف يدوياً من عرق واحد. كل خرزة لها نسيج، فقاعة هواء، شائبة لن تجدها في قطعة أخرى. الكهرمان يزداد عمقاً مع الاستخدام — دفء البشرة يُعمّق اللون مع السنين. هذه واحدة من قطعتين متبقيتين من القطع الأصلي.',
    specs: {
      beadCount: 33,
      length: '42 cm',
      weight: '56 g',
      material: 'Baltic amber · sterling silver',
      materialAr: 'كهرمان بلطيقي · فضة استرلينية',
      fragranceLasts: null,
      artisan: 'Hassan',
      series: 'Single Cut · 2 of 12 remain',
      seriesAr: 'قطع واحد · 2 من 12 متبقية',
    },
  },
  {
    id: 'p6',
    slug: 'amber-honey',
    nameAr: 'مسباح كهرمان عسلي',
    nameEn: 'Honey Amber Misbaha',
    promiseAr: 'كهرمان عسلي شفاف.',
    promiseEn: 'Honey-transparent amber.',
    price: 480,
    originalPrice: null,
    images: getProductImages('amber-honey', 'Honey Amber'),
    collection: 'amber',
    tier: 'collector',
    inStock: true,
    stockCount: 1,
    isSale: false,
    isSoldOut: false,
    badgeType: 'new',
    tags: ['bestseller', 'collector'],
    descriptionEn:
      'Honey-toned Baltic amber, deeply translucent. When you hold the strand against a window, light passes through every bead like a string of small lanterns. One piece left from this cut.',
    descriptionAr:
      'كهرمان بلطيقي بلون العسل، شفاف عميق. حين ترفع الخيط أمام نافذة، يمرّ الضوء من كل خرزة كأنها سلسلة فوانيس صغيرة. قطعة واحدة فقط متبقية من هذا القطع.',
    specs: {
      beadCount: 33,
      length: '40 cm',
      weight: '48 g',
      material: 'Honey Baltic amber · sterling silver',
      materialAr: 'كهرمان عسلي بلطيقي · فضة استرلينية',
      fragranceLasts: null,
      artisan: 'Hassan',
      series: 'Single Cut · 1 of 8 remain',
      seriesAr: 'قطع واحد · 1 من 8 متبقية',
    },
  },

  // ════════════════════════════════════════════════════════════
  // PROFESSIONAL — The Daily Companion
  // ════════════════════════════════════════════════════════════
  {
    id: 'p3',
    slug: 'tiffany',
    nameAr: 'مسباح تيفاني · الإصدار الأول',
    nameEn: 'Tiffany Misbaha · First Series',
    promiseAr: 'مسبحة احترافية أنيقة.',
    promiseEn: 'Elegant professional misbaha.',
    price: 280,
    originalPrice: null,
    images: getProductImages('tiffany', 'Tiffany'),
    collection: 'professional',
    tier: 'core',
    inStock: false,
    stockCount: 0,
    isSale: false,
    isSoldOut: true,
    badgeType: 'soldout',
    tags: ['bestseller'],
    descriptionEn:
      'Polished, balanced, deliberately understated. Designed to sit beside a phone on a meeting table without competing with it. The First Series found its homes in three weeks. The Second is being finished now.',
    descriptionAr:
      'مصقولة، متوازنة، هادئة بقصد. مُصمّمة لتجلس بجانب الهاتف على طاولة الاجتماع دون أن تنافسه. الإصدار الأول وجد أصحابه في ثلاثة أسابيع. الإصدار الثاني قيد الصناعة.',
    specs: {
      beadCount: 33,
      length: '36 cm',
      weight: '38 g',
      material: 'Polished resin · sterling silver',
      materialAr: 'راتنج مصقول · فضة استرلينية',
      fragranceLasts: null,
      artisan: 'Mahmoud',
      series: 'First Series · sold out',
      seriesAr: 'الإصدار الأول · نفد',
    },
  },
  {
    id: 'p8',
    slug: 'pro-onyx',
    nameAr: 'مسباح أونيكس إحترافي',
    nameEn: 'Onyx Professional Misbaha',
    promiseAr: 'أونيكس أسود أنيق.',
    promiseEn: 'Polished black onyx.',
    price: 420,
    originalPrice: 470,
    images: getProductImages('pro-onyx', 'Onyx Pro'),
    collection: 'professional',
    tier: 'collector',
    inStock: true,
    stockCount: 5,
    isSale: true,
    isSoldOut: false,
    badgeType: 'sale',
    tags: ['bestseller'],
    descriptionEn:
      'Polished onyx, paired with sterling silver fittings. Modern, confident, quietly serious. Pairs naturally with a steel watch and a navy thobe. Five pieces remain at the introductory price; the next Series will not be reduced.',
    descriptionAr:
      'أونيكس مصقول، مع قطع فضة استرلينية. عصري، واثق، جاد بهدوء. يتناغم بشكل طبيعي مع ساعة فولاذية وثوب كحلي. خمس قطع متبقية بسعر الافتتاح؛ الإصدار التالي لن يُخفّض.',
    specs: {
      beadCount: 33,
      length: '38 cm',
      weight: '52 g',
      material: 'Polished onyx · sterling silver',
      materialAr: 'أونيكس مصقول · فضة استرلينية',
      fragranceLasts: null,
      artisan: 'Hassan',
      series: 'First Series · 5 remain',
      seriesAr: 'الإصدار الأول · 5 متبقية',
    },
  },

  // ════════════════════════════════════════════════════════════
  // FRAGRANT — Beyond Saffron
  // ════════════════════════════════════════════════════════════
  {
    id: 'p7',
    slug: 'fragrant-rose',
    nameAr: 'مسباح فواح بالورد · الإصدار الأول',
    nameEn: 'Rose Fragrant Misbaha · First Series',
    promiseAr: 'عطر ورد الطائف.',
    promiseEn: 'Taif rose fragrance.',
    price: 320,
    originalPrice: null,
    images: getProductImages('fragrant-rose', 'Rose Fragrant'),
    collection: 'fragrant',
    tier: 'core',
    inStock: true,
    stockCount: 3,
    isSale: false,
    isSoldOut: false,
    badgeType: null,
    tags: ['gift'],
    descriptionEn:
      'Beads infused with Taif rose oil — the same rose that perfumes the Kaaba once a year. Three pieces remain in this Series. The fragrance lasts roughly twelve months.',
    descriptionAr:
      'خرزات مشبعة بزيت ورد الطائف — الورد ذاته الذي يُعطّر الكعبة مرّة في السنة. ثلاث قطع متبقية في هذا الإصدار. العطر يدوم حوالي اثني عشر شهراً.',
    specs: {
      beadCount: 33,
      length: '38 cm',
      weight: '40 g',
      material: 'Rose-infused resin · sterling silver',
      materialAr: 'راتنج مشبع بالورد · فضة استرلينية',
      fragranceLasts: '~12 months',
      artisan: 'Mahmoud',
      series: 'First Series · 3 remain',
      seriesAr: 'الإصدار الأول · 3 متبقية',
    },
  },

  // ════════════════════════════════════════════════════════════
  // NATURAL — The First Piece
  // ════════════════════════════════════════════════════════════
  {
    id: 'p5',
    slug: 'natural-oud',
    nameAr: 'مسباح العود الطبيعي',
    nameEn: 'Natural Oud Misbaha',
    promiseAr: 'خشب عود طبيعي.',
    promiseEn: 'Natural oud wood.',
    price: 220,
    originalPrice: null,
    images: getProductImages('natural-oud', 'Natural Oud'),
    collection: 'natural',
    tier: 'entry',
    inStock: true,
    stockCount: 6,
    isSale: false,
    isSoldOut: false,
    badgeType: null,
    tags: ['gift', 'entry'],
    descriptionEn:
      'Carved from natural oud wood, lightly oiled. Where most collectors begin. The fragrance is honest and faint — the wood itself, nothing added. It deepens with handling and lasts the life of the piece.',
    descriptionAr:
      'منحوتة من خشب العود الطبيعي، مُزيّتة بخفّة. هنا يبدأ معظم المقتنين. العطر صادق وخفيف — الخشب نفسه، دون إضافات. يزداد عمقاً مع الاستخدام، ويدوم طوال عمر القطعة.',
    specs: {
      beadCount: 33,
      length: '36 cm',
      weight: '32 g',
      material: 'Aged oud wood · cotton cord',
      materialAr: 'خشب عود معتق · خيط قطني',
      fragranceLasts: 'Lifetime, deepens with handling',
      artisan: 'Hassan',
      series: 'Ongoing · always in stock',
      seriesAr: 'مستمر · متوفر دائماً',
    },
  },
  {
    id: 'p10',
    slug: 'natural-wood',
    nameAr: 'مسباح خشب طبيعي',
    nameEn: 'Natural Wood Misbaha',
    promiseAr: 'خشب زيتون طبيعي.',
    promiseEn: 'Natural olive wood.',
    price: 180,
    originalPrice: null,
    images: getProductImages('natural-wood', 'Natural Wood'),
    collection: 'natural',
    tier: 'entry',
    inStock: false,
    stockCount: 0,
    isSale: false,
    isSoldOut: true,
    badgeType: 'soldout',
    tags: ['entry'],
    descriptionEn:
      'A simple, beautifully grained wood misbaha. Built for daily use, not display. Sold out — restock arriving in two weeks.',
    descriptionAr:
      'مسبحة خشبية بسيطة بنقشة طبيعية جميلة. مصنوعة للاستخدام اليومي، لا للعرض. نفدت — الدفعة القادمة خلال أسبوعين.',
    specs: {
      beadCount: 33,
      length: '34 cm',
      weight: '28 g',
      material: 'Olive wood · cotton cord',
      materialAr: 'خشب زيتون · خيط قطني',
      fragranceLasts: null,
      artisan: 'Hassan',
      series: 'Ongoing · returning soon',
      seriesAr: 'مستمر · يعود قريباً',
    },
  },

  // ════════════════════════════════════════════════════════════
  // ACCESSORIES — Complete the Set
  // ════════════════════════════════════════════════════════════
  {
    id: 'p9',
    slug: 'amber-bracelet',
    nameAr: 'سوار الكهرمان',
    nameEn: 'Amber Bracelet',
    promiseAr: 'سوار كهرمان قابل للتعديل.',
    promiseEn: 'Adjustable amber bracelet.',
    price: 220,
    originalPrice: null,
    images: getProductImages('amber-bracelet', 'Amber Bracelet'),
    collection: 'accessories',
    tier: 'entry',
    inStock: true,
    stockCount: 8,
    isSale: false,
    isSoldOut: false,
    badgeType: null,
    tags: ['gift', 'cross-sell'],
    descriptionEn:
      'A matching amber bracelet, designed to pair with the Amber Branch and Honey Amber Series. Adjustable cord. Eight pieces in stock.',
    descriptionAr:
      'سوار كهرمان متطابق، مصمّم ليتناغم مع إصداري غصن الكهرمان والكهرمان العسلي. خيط قابل للتعديل. ثماني قطع متوفرة.',
    specs: {
      beadCount: 21,
      length: 'Adjustable, 16–20 cm',
      weight: '18 g',
      material: 'Baltic amber · cotton cord',
      materialAr: 'كهرمان بلطيقي · خيط قطني',
      fragranceLasts: null,
      artisan: 'Hassan',
      series: 'Ongoing',
      seriesAr: 'مستمر',
    },
  },

  // ════════════════════════════════════════════════════════════
  // BUNDLES — Cross-sell sets
  // ════════════════════════════════════════════════════════════
  {
    id: 'b1',
    slug: 'bundle-saffron-set',
    nameAr: 'مجموعة الزعفران الكاملة',
    nameEn: 'The Yas Saffron Set',
    promiseAr: 'مسبحة، سوار، وعلبة فاخرة.',
    promiseEn: 'Misbaha, bracelet, and premium box.',
    price: 480,
    originalPrice: 565,
    images: getProductImages('bundle-saffron-set', 'Saffron Set'),
    collection: 'saffron',
    tier: 'bundle',
    inStock: true,
    stockCount: 6,
    isSale: true,
    isSoldOut: false,
    badgeType: 'sale',
    tags: ['bundle', 'gift', 'signature'],
    descriptionEn:
      'The complete saffron experience. Includes: Red Saffron Misbaha (Third Series), a matching saffron-infused bracelet, and our premium Atelier box. Save AED 85 versus buying separately. The bracelet is exclusive to this set.',
    descriptionAr:
      'تجربة الزعفران كاملة. تشمل: مسباح زعفران أحمر (الإصدار الثالث)، سوار زعفران متطابق، وعلبة أتيليه فاخرة. توفّر 85 درهم مقارنة بالشراء منفصلاً. السوار حصري لهذه المجموعة.',
    specs: {
      beadCount: 'Misbaha 33 + Bracelet 21',
      length: '38 cm + adjustable',
      weight: '60 g (combined)',
      material: 'Saffron-infused resin · sterling silver · Atelier box',
      materialAr: 'راتنج زعفران · فضة استرلينية · علبة أتيليه',
      fragranceLasts: '~18 months',
      artisan: 'Mahmoud',
      series: 'Third Series Set',
      seriesAr: 'مجموعة الإصدار الثالث',
    },
  },
  {
    id: 'b2',
    slug: 'bundle-fathers-gift',
    nameAr: 'هدية الأب',
    nameEn: "The Father's Gift",
    promiseAr: 'هدية مضمونة مع علبة فاخرة.',
    promiseEn: 'Guaranteed gift with premium box.',
    price: 520,
    originalPrice: null,
    images: getProductImages('bundle-fathers-gift', 'Fathers Gift'),
    collection: 'saffron',
    tier: 'bundle',
    inStock: true,
    stockCount: 12,
    isSale: false,
    isSoldOut: false,
    badgeType: null,
    tags: ['bundle', 'gift'],
    descriptionEn:
      'For when the gift has to land. Choose any Core misbaha (Saffron, Rose, or Tiffany Series), arriving in our premium Atelier box with gold ribbon and a handwritten card in Arabic or English. Free 30-day exchange — even after he opens it. We will send him a different one if the first does not feel right.',
    descriptionAr:
      'للحظات التي يجب أن تنجح فيها الهدية. اختر أي مسبحة من المجموعة الأساسية (زعفران، ورد، أو تيفاني)، تصل في علبة أتيليه فاخرة بشريط ذهبي وبطاقة مكتوبة بخط اليد بالعربية أو الإنجليزية. استبدال مجاني خلال 30 يوماً — حتى بعد أن يفتحها. سنرسل له قطعة مختلفة إذا لم تناسبه الأولى.',
    specs: {
      beadCount: 33,
      length: '36–38 cm (depending on model)',
      weight: '~40 g',
      material: 'Premium box · gold ribbon · handwritten card',
      materialAr: 'علبة فاخرة · شريط ذهبي · بطاقة بخط اليد',
      fragranceLasts: 'Varies by model',
      artisan: 'Atelier team',
      series: 'Gift programme · always available',
      seriesAr: 'برنامج الهدايا · متوفر دائماً',
    },
  },
  {
    id: 'b3',
    slug: 'bundle-beginners',
    nameAr: 'رفيق البداية',
    nameEn: "The Beginner's Companion",
    promiseAr: 'مسبحة عود طبيعي مع أدوات العناية.',
    promiseEn: 'Natural oud misbaha with care kit.',
    price: 280,
    originalPrice: 310,
    images: getProductImages('bundle-beginners', 'Beginners Set'),
    collection: 'natural',
    tier: 'bundle',
    inStock: true,
    stockCount: 10,
    isSale: true,
    isSoldOut: false,
    badgeType: 'sale',
    tags: ['bundle', 'entry'],
    descriptionEn:
      'For your first serious misbaha. Includes the Natural Oud Misbaha, a soft cleaning cloth, and our printed care guide ("How to live with a misbaha"). Designed for the collector at the beginning of his journey.',
    descriptionAr:
      'لمسبحتك الجدية الأولى. تشمل مسباح العود الطبيعي، قطعة تنظيف ناعمة، ودليلنا المطبوع للعناية ("كيف تعيش مع مسبحة"). مُصمّم للمقتني في بداية رحلته.',
    specs: {
      beadCount: 33,
      length: '36 cm',
      weight: '32 g',
      material: 'Oud wood · cleaning cloth · printed guide',
      materialAr: 'خشب عود · قطعة تنظيف · دليل مطبوع',
      fragranceLasts: 'Lifetime',
      artisan: 'Hassan',
      series: 'Ongoing programme',
      seriesAr: 'برنامج مستمر',
    },
  },
  {
    id: 'b4',
    slug: 'bundle-collectors-three',
    nameAr: "ثلاثية المقتني",
    nameEn: "The Collector's Three",
    promiseAr: 'ثلاث مسبحات توقيعية معاً.',
    promiseEn: 'Three signature misbahas together.',
    price: 980,
    originalPrice: 1130,
    images: getProductImages('bundle-collectors-three', 'Collectors Three'),
    collection: 'amber',
    tier: 'bundle',
    inStock: true,
    stockCount: 4,
    isSale: true,
    isSoldOut: false,
    badgeType: 'sale',
    tags: ['bundle', 'collector', 'atelier'],
    descriptionEn:
      'For the collector adding to his rotation. Three signature pieces — Saffron Red Series, Honey Amber, and Onyx Professional — finished and numbered together as a single set. Save AED 150 versus separate purchase. Four sets remain.',
    descriptionAr:
      'للمقتني الذي يضيف إلى مجموعته. ثلاث قطع توقيعية — زعفران أحمر، كهرمان عسلي، وأونيكس إحترافي — تُصنع وتُرقّم معاً كمجموعة واحدة. توفّر 150 درهم مقارنة بالشراء منفصلاً. أربع مجموعات متبقية.',
    specs: {
      beadCount: '33 × 3',
      length: '36–42 cm',
      weight: '~150 g (combined)',
      material: 'Saffron · amber · onyx',
      materialAr: 'زعفران · كهرمان · أونيكس',
      fragranceLasts: '~18 months (Saffron)',
      artisan: 'Mahmoud · Hassan',
      series: 'Numbered set · 4 of 12 remain',
      seriesAr: 'مجموعة مرقّمة · 4 من 12 متبقية',
    },
  },
];

// ── Helpers ──────────────────────────────────────────────────
export const getProduct = (slug) => products.find((p) => p.slug === slug);

export const getProductsByCollection = (slug) =>
  products.filter((p) => p.collection === slug);

export const getBestsellers = () =>
  products.filter((p) => p.tags?.includes('bestseller')).slice(0, 8);

export const getRelatedProducts = (productId, limit = 4) => {
  const current = products.find((p) => p.id === productId);
  if (!current) return [];
  // Smart "complete the set" — prefer same collection, exclude bundles unless current is one
  return products
    .filter((p) => p.id !== productId && p.collection === current.collection)
    .slice(0, limit);
};

export const getBundles = () => products.filter((p) => p.tier === 'bundle');
export const getAtelierPieces = () => products.filter((p) => p.tier === 'atelier');
