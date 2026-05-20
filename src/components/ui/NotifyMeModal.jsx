import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';
import Button from './Button';
import { useLanguage } from '../../context/LanguageContext';

/**
 * NotifyMeModal — collects an email when a product is sold out.
 * On submit, logs to console (will POST to backend later).
 */
export default function NotifyMeModal({ open, onClose, product }) {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) {
      setEmail('');
      setSubmitted(false);
      setError('');
    }
  }, [open]);

  const productName = product ? (lang === 'ar' ? product.nameAr : product.nameEn) : '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(lang === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email');
      return;
    }
    /* TODO: connect to API — POST { email, productId } to /api/notify-me */
    console.log('Notify Me submission:', { email, productId: product?.id });
    setSubmitted(true);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('notify.title')}
      labelledBy="notify-modal-title"
    >
      {!submitted ? (
        <form onSubmit={handleSubmit} noValidate>
          <p className="text-textSecondary mb-4">
            {t('notify.subtitle', { name: productName || '...' })}
          </p>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            placeholder={t('notify.placeholder')}
            className="input-field mb-2"
            aria-label={t('notify.placeholder')}
            aria-invalid={!!error}
          />
          {error && <p className="text-badgeRed text-sm mb-2">{error}</p>}
          <div className="flex gap-3 mt-4">
            <Button type="submit" variant="primary" className="flex-1">
              {t('notify.submit')}
            </Button>
            <Button type="button" variant="ghost" onClick={onClose}>
              {t('notify.close')}
            </Button>
          </div>
        </form>
      ) : (
        <div className="text-center py-4">
          <div className="text-5xl mb-3">✨</div>
          <p className="text-lg text-textPrimary mb-4">{t('notify.success')}</p>
          <Button variant="primary" onClick={onClose} className="w-full">
            {t('notify.close')}
          </Button>
        </div>
      )}
    </Modal>
  );
}
