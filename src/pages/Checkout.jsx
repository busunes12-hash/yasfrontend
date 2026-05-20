import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { formatPrice } from '../utils/formatPrice';
import { trackBeginCheckout, trackPurchase } from '../utils/analytics';
import Button from '../components/ui/Button';
import SEO from '../components/seo/SEO';
import { cn } from '../utils/cn';

const COUNTRIES = [
  { code: 'AE', ar: 'الإمارات', en: 'United Arab Emirates' },
  { code: 'SA', ar: 'السعودية', en: 'Saudi Arabia' },
  { code: 'KW', ar: 'الكويت', en: 'Kuwait' },
  { code: 'QA', ar: 'قطر', en: 'Qatar' },
  { code: 'BH', ar: 'البحرين', en: 'Bahrain' },
  { code: 'OM', ar: 'عُمان', en: 'Oman' },
];

/* Simple mock coupon codes — TODO: connect to API — validate via /api/coupons */
const VALID_COUPONS = {
  WELCOME10: 0.10,
  YAS10: 0.10,
  SAFFRON15: 0.15,
};

const GIFT_WRAP_PRICE = 15;

function generateOrderNumber() {
  return `YB-${Date.now().toString(36).toUpperCase()}`;
}

function getEstimatedDelivery(lang) {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return d.toLocaleDateString(lang === 'ar' ? 'ar-AE' : 'en-AE', { weekday: 'long', month: 'long', day: 'numeric' });
}

export default function Checkout() {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({ fullName: '', phone: '', email: '', address: '', city: '', country: 'AE', notes: '' });
  const [payment, setPayment] = useState('cod');
  const [giftWrap, setGiftWrap] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const giftWrapTotal = giftWrap ? GIFT_WRAP_PRICE : 0;
  const discountAmount = Math.round(totalPrice * couponDiscount);
  const finalTotal = totalPrice + giftWrapTotal - discountAmount;

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (VALID_COUPONS[code]) {
      setCouponCode(code);
      setCouponDiscount(VALID_COUPONS[code]);
      setCouponError('');
    } else {
      setCouponError(t('product.couponError'));
      setCouponCode('');
      setCouponDiscount(0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = generateOrderNumber();
    /* TODO: connect to API — POST order to /api/orders */
    const order = { orderNumber: num, customer: form, payment, giftWrap, couponCode, items, total: finalTotal, placedAt: new Date().toISOString() };
    console.log('🛒 Order placed:', order);
    trackPurchase(num, items, finalTotal);
    setOrderNumber(num);
    setSubmitted(true);
    clearCart();
  };

  // Track begin_checkout on mount
  useState(() => {
    if (items.length > 0) trackBeginCheckout(items, totalPrice);
  });

  if (submitted) {
    return (
      <>
        <SEO title="Order Confirmed" titleAr="تم تأكيد الطلب" url="/checkout" lang={lang} noIndex />
        <div className="container-page py-20 text-center max-w-xl mx-auto">
          <motion.div className="text-5xl text-primary mb-4">✦</motion.div>
          <h1 className="font-serif text-3xl text-textPrimary mb-2">{t('checkout.successTitle')}</h1>
          <p className="text-textSecondary mb-2">{t('checkout.successMsg')}</p>
          <p className="text-sm font-semibold text-primary mb-1">
            {t('checkout.orderNumber', { number: orderNumber })}
          </p>
          <p className="text-sm text-textSecondary mb-8">
            {t('checkout.estimatedDelivery', { date: getEstimatedDelivery(lang) })}
          </p>
          <Link to="/" className="btn-primary inline-flex">{t('notFound.cta')}</Link>
        </div>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-20 text-center max-w-xl mx-auto">
        <h1 className="font-serif text-3xl mb-3">{t('cart.empty')}</h1>
        <Link to="/shop" className="btn-primary inline-flex mt-4">{t('cart.continueShopping')}</Link>
      </div>
    );
  }

  return (
    <>
      <SEO title="Checkout" titleAr="إتمام الشراء" url="/checkout" lang={lang} noIndex />
      <div className="bg-background">
        <div className="container-page section-padding">
          <h1 className="font-serif text-h1 text-textPrimary mb-12">{t('checkout.title')}</h1>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
            {/* ── Form ── */}
            <div className="lg:col-span-2 space-y-6">
              <fieldset className="bg-surface border border-border rounded-lg p-6 shadow-warm">
                <legend className="font-serif text-lg px-2">{t('checkout.contact')}</legend>
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <Field label={t('checkout.fullName')} name="fullName" value={form.fullName} onChange={onChange} required />
                  <Field label={t('checkout.phone')} name="phone" type="tel" value={form.phone} onChange={onChange} required />
                  <Field label={t('checkout.email')} name="email" type="email" value={form.email} onChange={onChange} required className="sm:col-span-2" />
                </div>
              </fieldset>

              <fieldset className="bg-surface border border-border rounded-lg p-6 shadow-warm">
                <legend className="font-serif text-lg px-2">{t('checkout.shipping')}</legend>
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <Field label={t('checkout.address')} name="address" value={form.address} onChange={onChange} required className="sm:col-span-2" />
                  <Field label={t('checkout.city')} name="city" value={form.city} onChange={onChange} required />
                  <div>
                    <label className="block text-sm font-medium text-textPrimary mb-1">{t('checkout.country')}</label>
                    <select name="country" value={form.country} onChange={onChange} className="input-field" required>
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code}>{lang === 'ar' ? c.ar : c.en}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-textPrimary mb-1">{t('checkout.notes')}</label>
                    <textarea name="notes" value={form.notes} onChange={onChange} rows={3} className="input-field resize-none" />
                  </div>
                </div>
              </fieldset>

              {/* Gift wrap */}
              <label className="flex items-start gap-3 p-4 bg-surface border border-border rounded-lg cursor-pointer hover:border-primary transition group shadow-warm">
                <input type="checkbox" checked={giftWrap} onChange={(e) => setGiftWrap(e.target.checked)} className="mt-0.5 accent-primary w-4 h-4" />
                <div>
                  <p className="text-sm font-semibold text-textPrimary group-hover:text-primary transition">
                    🎁 {t('product.giftWrap')}
                  </p>
                  <p className="text-xs text-textSecondary mt-0.5">{t('product.giftWrapNote')}</p>
                </div>
              </label>

              <fieldset className="bg-surface border border-border rounded-lg p-6 shadow-warm">
                <legend className="font-serif text-lg px-2">{t('checkout.payment')}</legend>
                <div className="grid sm:grid-cols-2 gap-3 mt-4">
                  <PaymentOption selected={payment === 'cod'} onSelect={() => setPayment('cod')} title={t('checkout.cod')} emoji="💳" />
                  <PaymentOption selected={payment === 'card'} onSelect={() => setPayment('card')} title={t('checkout.card')} emoji="💳" />
                </div>
              </fieldset>
            </div>

            {/* ── Summary ── */}
            <aside className="bg-surface border border-border rounded-lg p-6 shadow-warm h-fit lg:sticky lg:top-28">
              <h2 className="font-serif text-lg mb-4">{t('checkout.summary')}</h2>
              <ul className="divide-y divide-border mb-4">
                {items.map((it) => (
                  <li key={it.id} className="py-3 flex gap-3">
                    <img src={it.image} alt="" className="w-14 h-14 rounded object-cover bg-background shrink-0" />
                    <div className="flex-1 text-sm min-w-0">
                      <p className="font-semibold line-clamp-1">{lang === 'ar' ? it.nameAr : it.nameEn}</p>
                      <p className="text-textSecondary">×{it.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold shrink-0">{formatPrice(it.price * it.quantity, lang)}</p>
                  </li>
                ))}
              </ul>

              {/* Coupon */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-textPrimary mb-1">{t('checkout.coupon')}</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => { setCouponInput(e.target.value); setCouponError(''); }}
                    placeholder={t('checkout.couponPlaceholder')}
                    className="input-field flex-1 text-sm py-2"
                  />
                  <button type="button" onClick={applyCoupon} className="btn-ghost text-sm px-3 py-2">
                    {t('checkout.couponApply')}
                  </button>
                </div>
                {couponError && <p className="text-badgeRed text-xs mt-1">{couponError}</p>}
                {couponCode && (
                  <p className="text-success text-xs mt-1">
                    {t('product.couponSuccess', { discount: `${Math.round(couponDiscount * 100)}%` })}
                  </p>
                )}
              </div>

              <div className="space-y-2 text-sm border-t border-border pt-4">
                <div className="flex justify-between">
                  <span className="text-textSecondary">{t('cart.subtotal')}</span>
                  <span className="font-semibold">{formatPrice(totalPrice, lang)}</span>
                </div>
                {giftWrap && (
                  <div className="flex justify-between">
                    <span className="text-textSecondary">🎁 {t('checkout.giftWrap')}</span>
                    <span className="font-semibold">{formatPrice(GIFT_WRAP_PRICE, lang)}</span>
                  </div>
                )}
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>{t('checkout.discount')} ({Math.round(couponDiscount * 100)}%)</span>
                    <span>-{formatPrice(discountAmount, lang)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-textSecondary">{t('checkout.shippingFee')}</span>
                  <span className="font-semibold text-success">{t('checkout.free')}</span>
                </div>
                <div className="flex justify-between text-base pt-2 border-t border-border">
                  <span className="font-semibold">{t('checkout.total')}</span>
                  <span className="font-bold text-primary">{formatPrice(finalTotal, lang)}</span>
                </div>
              </div>

              {/* Payment trust marks */}
              <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
                {['VISA', 'MASTER', 'MADA', 'APPLE PAY', 'COD'].map((p) => (
                  <span key={p} className="text-[10px] font-semibold text-textSecondary border border-border rounded px-2 py-1">{p}</span>
                ))}
              </div>

              <Button type="submit" variant="primary" className="w-full mt-5">
                {t('checkout.place')}
              </Button>

              <p className="text-xs text-textSecondary text-center mt-3">
                🔒 {lang === 'ar' ? 'دفعك آمن ومشفّر بالكامل' : 'Your checkout is secure & fully encrypted'}
              </p>
            </aside>
          </form>
        </div>
      </div>
    </>
  );
}

function Field({ label, name, value, onChange, type = 'text', required = false, className }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-textPrimary mb-1">
        {label}{required && <span className="text-badgeRed ms-1" aria-hidden="true">*</span>}
      </label>
      <input id={name} name={name} type={type} value={value} onChange={onChange} required={required} className="input-field" />
    </div>
  );
}

function PaymentOption({ selected, onSelect, title, emoji }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'flex items-center gap-3 p-4 border rounded-lg transition text-start',
        selected ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-border hover:border-primary'
      )}
      aria-pressed={selected}
    >
      <span className="text-2xl">{emoji}</span>
      <span className="font-medium text-textPrimary text-sm">{title}</span>
      <span className={cn('ms-auto w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0', selected ? 'border-primary' : 'border-border')}>
        {selected && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
      </span>
    </button>
  );
}

// Tiny inline motion div to avoid import for just the success emoji
function motion_div({ className, children }) {
  return <div className={className}>{children}</div>;
}
