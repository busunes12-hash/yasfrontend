import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { formatPrice } from '../utils/formatPrice';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

/**
 * Full-page Cart view (companion to the slide-out drawer).
 */
export default function Cart() {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const { items, updateQty, removeItem, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-background">
      <div className="container-page section-padding">
        <h1 className="font-serif text-h1 text-textPrimary mb-12">{t('cart.title')}</h1>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-surface border border-border rounded-lg">
            <div className="text-5xl text-primary/70 mb-4">✦</div>
            <p className="text-textSecondary mb-6">{t('cart.empty')}</p>
            <Link to="/shop" className="btn-primary inline-flex">{t('cart.continueShopping')}</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <ul className="lg:col-span-2 bg-surface border border-border rounded-lg divide-y divide-border">
              {items.map((it) => (
                <li key={it.id} className="p-4 sm:p-5 flex gap-4">
                  <img
                    src={it.image}
                    alt={lang === 'ar' ? it.nameAr : it.nameEn}
                    className="w-24 h-24 rounded-lg object-cover bg-background"
                  />
                  <div className="flex-1">
                    <p className={`font-semibold text-textPrimary ${lang === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                      {lang === 'ar' ? it.nameAr : it.nameEn}
                    </p>
                    <p className="text-sm text-primary font-bold mt-1">{formatPrice(it.price, lang)}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="inline-flex items-center border border-border rounded-full">
                        <button onClick={() => updateQty(it.id, it.quantity - 1)} className="w-8 h-8" aria-label="Decrease">−</button>
                        <span className="w-8 text-center text-sm font-semibold">{it.quantity}</span>
                        <button onClick={() => updateQty(it.id, it.quantity + 1)} className="w-8 h-8" aria-label="Increase">+</button>
                      </div>
                      <button onClick={() => removeItem(it.id)} className="text-sm text-textSecondary hover:text-badgeRed">
                        {t('cart.remove')}
                      </button>
                    </div>
                  </div>
                  <p className="font-semibold text-textPrimary self-start">
                    {formatPrice(it.price * it.quantity, lang)}
                  </p>
                </li>
              ))}
            </ul>

            <aside className="bg-surface border border-border rounded-lg p-5 h-fit shadow-warm">
              <h2 className="font-serif text-lg mb-4">{t('checkout.summary')}</h2>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-textSecondary">{t('cart.subtotal')}</span>
                <span className="font-semibold">{formatPrice(totalPrice, lang)}</span>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <span className="text-textSecondary">{t('checkout.shippingFee')}</span>
                <span className="font-semibold text-success">{t('checkout.free')}</span>
              </div>
              <div className="border-t border-border pt-4 flex justify-between">
                <span className="font-semibold">{t('checkout.total')}</span>
                <span className="font-bold text-lg text-primary">{formatPrice(totalPrice, lang)}</span>
              </div>
              <Button variant="primary" onClick={() => navigate('/checkout')} className="w-full mt-5">
                {t('cart.checkout')}
              </Button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
