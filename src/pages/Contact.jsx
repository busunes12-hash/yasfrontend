import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/ui/Button';

export default function Contact() {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    /* TODO: connect to API — POST contact form to /api/contact */
    console.log('Contact submission:', form);
    setSent(true);
  };

  return (
    <div className="bg-background">
      <div className="container-page section-padding">
        <div className="max-w-xl mx-auto">
          <h1 className="font-serif text-h1 text-textPrimary mb-4">{t('nav.contact')}</h1>
          <p className="text-body text-textSecondary mb-10">
            {t('brand.shortDesc')} {lang === 'ar'
              ? 'اكتب للأتيليه — نردّ بأنفسنا.'
              : 'Write to the atelier. We reply, in person.'}
          </p>

          {sent ? (
            <div className="bg-surface border border-border rounded-lg p-8 text-center shadow-warm">
              <div className="text-3xl text-primary mb-3">✦</div>
              <p className="text-textPrimary">{t('checkout.successMsg')}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="bg-surface border border-border rounded-lg p-6 shadow-warm space-y-4">
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder={t('checkout.fullName')}
                className="input-field"
                required
              />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder={t('checkout.email')}
                className="input-field"
                required
              />
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                rows={5}
                placeholder={t('checkout.notes')}
                className="input-field resize-none"
                required
              />
              <Button type="submit" variant="primary" className="w-full">
                {t('common.submit')}
              </Button>
            </form>
          )}

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <a
              href="https://wa.me/971553779772"
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-success/15 text-success border border-success/40 hover:bg-success hover:text-deepBrown w-full"
            >
              WhatsApp
            </a>
            <a
              href="https://instagram.com/yasbead"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost w-full"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
