import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { formatPrice } from '../../utils/formatPrice';
import Button from '../ui/Button';

const IconClose = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...props}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const IconTrash = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M19 6 18 20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
  </svg>
);

export default function CartDrawer() {
  const { t } = useTranslation();
  const { lang, isRTL } = useLanguage();
  const { items, isOpen, closeCart, updateQty, removeItem, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') closeCart(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, closeCart]);

  const goCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-deepBrown/60 backdrop-blur-sm z-[60]"
            onClick={closeCart}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: isRTL ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? '-100%' : '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className={`fixed top-0 bottom-0 w-full max-w-md bg-surface z-[70] shadow-warmLg flex flex-col overflow-hidden ${
              isRTL ? 'left-0' : 'right-0'
            }`}
            role="dialog"
            aria-modal="true"
            aria-label={t('cart.title')}
          >
            {/* Header */}
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h2 className="font-serif text-xl text-textPrimary">
                {t('cart.title')}
                {totalItems > 0 && (
                  <span className="text-textSecondary font-sans text-sm font-normal ms-2">
                    ({totalItems})
                  </span>
                )}
              </h2>
              <button
                type="button"
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-background"
                aria-label={t('nav.close')}
              >
                <IconClose className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="p-10 text-center">
                  <div className="text-6xl mb-4">🛍️</div>
                  <p className="text-textSecondary mb-6">{t('cart.empty')}</p>
                  <Link to="/shop" onClick={closeCart} className="btn-primary inline-flex">
                    {t('cart.continueShopping')}
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {items.map((it) => (
                    <li key={it.id} className="p-5 flex gap-4">
                      <Link
                        to={`/product/${it.slug}`}
                        onClick={closeCart}
                        className="shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-background"
                      >
                        <img src={it.image} alt={lang === 'ar' ? it.nameAr : it.nameEn} className="w-full h-full object-cover" loading="lazy" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={`/product/${it.slug}`}
                            onClick={closeCart}
                            className={`font-semibold text-textPrimary leading-snug truncate ${
                              lang === 'ar' ? 'font-arabic' : 'font-serif'
                            }`}
                          >
                            {lang === 'ar' ? it.nameAr : it.nameEn}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeItem(it.id)}
                            className="p-1 text-textSecondary hover:text-badgeRed"
                            aria-label={`${t('cart.remove')} ${lang === 'ar' ? it.nameAr : it.nameEn}`}
                          >
                            <IconTrash className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-primary font-bold mt-1">
                          {formatPrice(it.price, lang)}
                        </p>

                        {/* Qty stepper */}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center border border-border rounded-full">
                            <button
                              type="button"
                              onClick={() => updateQty(it.id, it.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-textPrimary hover:text-primary"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-sm font-semibold">{it.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQty(it.id, it.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-textPrimary hover:text-primary"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-textPrimary">
                            {formatPrice(it.price * it.quantity, lang)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-5 space-y-4 bg-background">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-textSecondary">{t('cart.subtotal')}</span>
                  <span className="text-xl font-bold text-textPrimary">
                    {formatPrice(totalPrice, lang)}
                  </span>
                </div>
                <p className="text-xs text-textSecondary">{t('cart.shippingNote')}</p>
                <Button variant="primary" onClick={goCheckout} className="w-full">
                  {t('cart.checkout')}
                </Button>
                <button
                  type="button"
                  onClick={closeCart}
                  className="w-full text-center text-sm text-textSecondary hover:text-primary transition"
                >
                  {t('cart.continueShopping')}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
