import { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { formatPrice } from '../utils/formatPrice';
import { trackViewItem, trackAddToCart } from '../utils/analytics';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import NotifyMeModal from '../components/ui/NotifyMeModal';
import StickyATC from '../components/ui/StickyATC';
import ReviewStarSummary from '../components/ui/ReviewStarSummary';
import ReviewsSection from '../components/sections/ReviewsSection';
import ProductCard from '../components/sections/ProductCard';
import SEO from '../components/seo/SEO';
import { useProductJsonLd } from '../components/seo/useProductJsonLd';
import { cn } from '../utils/cn';

// New PDP sections
import PDPHighlights from '../components/sections/pdp/PDPHighlights';
import PDPShipping from '../components/sections/pdp/PDPShipping';
import PDPCompareTable from '../components/sections/pdp/PDPCompareTable';
import PDPProcess from '../components/sections/pdp/PDPProcess';
import PDPGuarantee from '../components/sections/pdp/PDPGuarantee';
import PDPFAQ from '../components/sections/pdp/PDPFAQ';
import PDPFinalCTA from '../components/sections/pdp/PDPFinalCTA';

const WA_NUMBER = '971553779772';

const IconWhatsapp = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.52 3.48A11.94 11.94 0 0 0 12.04 0C5.46 0 .12 5.34.12 11.92c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.74 1.46h.01c6.58 0 11.92-5.34 11.92-11.92 0-3.18-1.24-6.18-3.45-8.4Zm-8.48 18.34h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98.99-3.65-.23-.37a9.9 9.9 0 0 1-1.52-5.27c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 0 1 2.91 7.01c-.01 5.47-4.45 9.9-9.93 9.9Zm5.46-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.79-1.67-2.08-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.18-.24-.58-.49-.5-.66-.51l-.56-.01c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.49 1.06 2.89 1.21 3.09c.15.2 2.09 3.2 5.07 4.49.71.31 1.27.49 1.7.63.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
  </svg>
);
const IconChevron = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const IconShield = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
  </svg>
);
const IconTruck = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
    <rect x="9" y="11" width="14" height="10" rx="2" />
    <circle cx="12" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
  </svg>
);

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border">
      <button
        type="button"
        className="w-full flex items-center justify-between py-4 text-start"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="font-semibold text-textPrimary">{title}</span>
        <IconChevron className={cn('w-4 h-4 transition-transform shrink-0', open && 'rotate-180')} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-sm text-textSecondary leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ProductDetail() {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const { slug } = useParams();
  const { getProduct, getRelatedProducts } = useProducts();
  const { addItem } = useCart();
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [giftWrap, setGiftWrap] = useState(false);
  const mainCtaRef = useRef(null);

  const product = useMemo(() => getProduct(slug), [getProduct, slug]);
  const related = useMemo(() => (product ? getRelatedProducts(product.id, 4) : []), [getRelatedProducts, product]);
  const jsonLd = useProductJsonLd(product, lang);

  // Track view_item on mount
  useEffect(() => {
    if (product) trackViewItem(product);
  }, [product]);

  if (!product) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-serif text-3xl mb-4">404</h1>
        <p className="text-textSecondary mb-6">{t('notFound.msg')}</p>
        <Link to="/shop" className="btn-primary inline-flex">{t('shop.title')}</Link>
      </div>
    );
  }

  const name = lang === 'ar' ? product.nameAr : product.nameEn;
  const subName = lang === 'ar' ? product.nameEn : product.nameAr;
  const description = lang === 'ar' ? product.descriptionAr : product.descriptionEn;
  const promise = lang === 'ar' ? product.promiseAr : product.promiseEn;
  const specs = product.specs || {};

  const waMessage = encodeURIComponent(
    lang === 'ar'
      ? `السلام عليكم، أرغب بالاستفسار عن: ${product.nameAr}`
      : `Hello, I'd like to enquire about: ${product.nameEn}`
  );

  const handleAddToCart = () => {
    addItem(product, 1);
    trackAddToCart(product, 1);
  };

  return (
    <>
      <SEO
        title={product.nameEn}
        titleAr={product.nameAr}
        description={product.descriptionEn}
        descriptionAr={product.descriptionAr}
        image={product.images?.[0]}
        url={`/product/${product.slug}`}
        type="product"
        jsonLd={jsonLd}
        lang={lang}
      />

      <div className="bg-background">
        <div className="container-page section-padding">
          {/* Breadcrumbs */}
          <nav className="text-sm text-textSecondary mb-6 flex gap-2 flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary">{t('nav.home')}</Link>
            <span aria-hidden="true">/</span>
            <Link to="/shop" className="hover:text-primary">{t('nav.shop')}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-textPrimary truncate max-w-[200px]">{name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
            {/* ── Gallery ── */}
            <div>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-surface border border-border shadow-warm">
                <motion.img
                  key={activeImage}
                  src={product.images[activeImage]}
                  alt={name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                />
                {/* Badges */}
                <div className="absolute top-4 ltr:left-4 rtl:right-4 flex flex-col gap-2">
                  {product.isSoldOut && <Badge variant="soldout">{t('product.soldOut')}</Badge>}
                  {product.isSale && !product.isSoldOut && <Badge variant="sale">{t('product.sale')}</Badge>}
                  {product.badgeType === 'new' && !product.isSoldOut && !product.isSale && (
                    <Badge variant="new">{t('product.new')}</Badge>
                  )}
                  {product.collection === 'saffron' && (
                    <Badge variant="new" className="bg-deepBrown">{t('product.limitedDrop')}</Badge>
                  )}
                </div>
              </div>
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3 mt-4">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      'aspect-square rounded-lg overflow-hidden border-2 transition',
                      i === activeImage ? 'border-primary' : 'border-border hover:border-primary/50'
                    )}
                    aria-label={`${lang === 'ar' ? 'صورة' : 'Image'} ${i + 1}`}
                    aria-pressed={i === activeImage}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* ── Details ── */}
            <div>
              {/* Eyebrow above the name — subtitle in caps */}
              <p className="eyebrow mb-4">{subName}</p>

              {/* Name */}
              <h1 className={cn('text-h1 text-textPrimary mb-5', lang === 'ar' ? 'font-arabic' : 'font-serif')}>
                {name}
              </h1>

              {/* Promise — italic gold one-liner */}
              {promise && (
                <p className={cn('mb-6 text-body-lg italic text-primary leading-relaxed', lang === 'ar' ? 'font-arabic' : 'font-serif')}>
                  {promise}
                </p>
              )}

              {/* Star summary — scrolls to reviews */}
              <div className="mb-5">
                <ReviewStarSummary rating={4.9} count={42} lang={lang} />
              </div>

              {/* Price — restrained, not shouty */}
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-3xl font-medium text-primary ltr-numerals">{formatPrice(product.price, lang)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-body-lg text-textTertiary line-through ltr-numerals">
                      {formatPrice(product.originalPrice, lang)}
                    </span>
                    <Badge variant="sale">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </Badge>
                  </>
                )}
              </div>

              {/* Authenticity badge */}
              <div className="flex items-center gap-1.5 text-xs text-textSecondary mb-5">
                <IconShield className="w-3.5 h-3.5 text-primary" />
                <span>{t('product.authenticBadge')}</span>
              </div>

              {/* Stock status */}
              <div className="mb-5">
                {product.isSoldOut ? (
                  <span className="inline-flex items-center gap-2 text-badgeRed font-semibold text-sm">
                    <span className="w-2 h-2 rounded-full bg-badgeRed" />
                    {t('product.soldOutNotify')}
                  </span>
                ) : product.stockCount <= 3 ? (
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      {t('product.leftInStock', { count: product.stockCount })}
                    </span>
                    <p className="text-xs text-textSecondary flex items-center gap-1">
                      <IconTruck className="w-3.5 h-3.5" />
                      {t('product.shipsIn')}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-2 text-success font-semibold text-sm">
                      <span className="w-2 h-2 rounded-full bg-success" />
                      {t('product.inStock')}
                    </span>
                    <p className="text-xs text-textSecondary flex items-center gap-1">
                      <IconTruck className="w-3.5 h-3.5" />
                      {t('product.shipsIn')}
                    </p>
                  </div>
                )}
              </div>

              {/* Gift wrap toggle */}
              <label className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary transition mb-5 group">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="mt-0.5 accent-primary w-4 h-4"
                />
                <div>
                  <p className="text-sm font-semibold text-textPrimary group-hover:text-primary transition">
                    🎁 {t('product.giftWrap')}
                  </p>
                  <p className="text-xs text-textSecondary mt-0.5">{t('product.giftWrapNote')}</p>
                </div>
              </label>

              {/* CTAs — ref for StickyATC observer */}
              <div ref={mainCtaRef} className="flex flex-col sm:flex-row gap-3 mb-6">
                {product.isSoldOut ? (
                  <Button variant="primary" onClick={() => setNotifyOpen(true)} className="flex-1">
                    {t('product.notifyMe')}
                  </Button>
                ) : (
                  <Button variant="primary" onClick={handleAddToCart} className="flex-1">
                    {t('product.addToCart')}
                  </Button>
                )}
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-success/15 text-success border border-success/40 hover:bg-success hover:text-deepBrown inline-flex"
                >
                  <IconWhatsapp className="w-5 h-5" />
                  {t('product.whatsapp')}
                </a>
              </div>

              {/* Trust strip — shipping info early, with descriptive copy */}
              <div className="grid grid-cols-3 gap-3 mb-7">
                {[
                  {
                    icon: '✦',
                    title: lang === 'ar' ? 'صناعة يدوية' : 'Hand-Finished',
                    sub: lang === 'ar' ? 'في أتيليه أبوظبي' : 'In our Abu Dhabi atelier',
                  },
                  {
                    icon: '◇',
                    title: lang === 'ar' ? 'توصيل مجاني' : 'Complimentary Delivery',
                    sub: lang === 'ar' ? '2–4 أيام داخل الخليج' : '2–4 days across the GCC',
                  },
                  {
                    icon: '↺',
                    title: lang === 'ar' ? 'إرجاع 30 يوماً' : '30-Day Returns',
                    sub: lang === 'ar' ? 'حتى للقطع المخصّصة' : 'Even on bespoke pieces',
                  },
                ].map((it) => (
                  <div key={it.title} className="bg-surface/40 border border-border rounded-lg p-3 text-center">
                    <div className="text-base text-primary mb-1.5" aria-hidden="true">{it.icon}</div>
                    <p className="text-2xs font-semibold text-textPrimary mb-0.5">{it.title}</p>
                    <p className="text-2xs text-textTertiary leading-tight">{it.sub}</p>
                  </div>
                ))}
              </div>

              {/* Secure payment line */}
              <p className="flex items-center justify-center gap-2 mb-7 text-2xs text-textTertiary">
                <span aria-hidden="true">🔒</span>
                {lang === 'ar' ? 'دفعٌ آمن · بطاقة، مدى، أو الدفع عند الاستلام' : 'Secure checkout · Card, MADA, or Cash on Delivery'}
              </p>

              {/* Accordions */}
              <div>
                <Accordion title={t('product.description')} defaultOpen>
                  <p className="text-textSecondary leading-relaxed">{description}</p>
                </Accordion>

                <Accordion title={t('product.details')}>
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-border">
                      {[
                        specs.series && [t('product.series'), lang === 'ar' ? specs.seriesAr : specs.series],
                        specs.artisan && [t('product.artisan'), specs.artisan],
                        specs.beadCount != null && [t('product.beadCount'), String(specs.beadCount)],
                        specs.length && [t('product.length'), specs.length],
                        specs.weight && [t('product.weight'), specs.weight],
                        specs.material && [t('product.material'), lang === 'ar' ? (specs.materialAr || specs.material) : specs.material],
                        specs.fragranceLasts && [t('product.fragranceLasts'), specs.fragranceLasts],
                        [t('product.origin'), t('product.originValue')],
                        [lang === 'ar' ? 'رقم المنتج' : 'SKU', product.id.toUpperCase()],
                      ]
                        .filter(Boolean)
                        .map(([k, v]) => (
                          <tr key={k}>
                            <td className="py-2.5 pe-4 font-medium text-textPrimary w-1/2">{k}</td>
                            <td className="py-2.5 text-textSecondary">{v}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </Accordion>

                <Accordion title={t('product.shipping')}>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      <span className="text-success">✓</span>
                      {lang === 'ar' ? 'توصيل مجاني داخل دول الخليج خلال 2–4 أيام عمل' : 'Complimentary delivery across the GCC in 2–4 business days'}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-success">✓</span>
                      {lang === 'ar' ? 'إرجاع مجاني خلال 30 يوماً، حتى للقطع المخصّصة' : 'Free returns within 30 days, even on bespoke pieces'}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-success">✓</span>
                      {lang === 'ar' ? 'الدفع عند الاستلام متاح' : 'Cash on delivery available'}
                    </p>
                  </div>
                </Accordion>
              </div>
            </div>
          </div>

          {/* ── Reviews ── */}
          <div id="reviews-section" className="cv-auto">
            <ReviewsSection productSlug={product.slug} />
          </div>
        </div>

        {/* ── NEW PDP SECTIONS ── */}
        {/* Highlights (why this piece) */}
        <PDPHighlights />

        {/* Shipping & trust */}
        <PDPShipping />

        {/* Why us vs them comparison */}
        <PDPCompareTable />

        {/* How it's made */}
        <PDPProcess />

        {/* Guarantee */}
        <PDPGuarantee />

        {/* FAQ */}
        <PDPFAQ productName={name} />

        {/* Final CTA */}
        <PDPFinalCTA product={product} onAdd={handleAddToCart} onNotify={() => setNotifyOpen(true)} />
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="bg-surface border-t border-border cv-auto">
          <div className="container-page py-14">
            <h2 className="font-serif text-2xl md:text-3xl text-textPrimary mb-8">
              {t('product.related')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky mobile ATC */}
      <StickyATC product={product} mainCtaRef={mainCtaRef} onNotify={() => setNotifyOpen(true)} />

      <NotifyMeModal open={notifyOpen} onClose={() => setNotifyOpen(false)} product={product} />
    </>
  );
}
