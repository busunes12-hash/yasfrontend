import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

export default function Newsletter() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t('notify.placeholder'));
      return;
    }
    /* TODO: connect to API — POST { email } to /api/newsletter and return discount code */
    console.log('Newsletter signup:', { email });
    setSubmitted(true);
    setEmail('');
    setError('');
  };

  return (
    <section
      className="relative overflow-hidden feature-panel section-edge-top"
      aria-label="Newsletter signup"
    >
      {/* Soft glow accent */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[760px] h-[440px] rounded-full bg-primary/[0.10] blur-[140px] pointer-events-none" aria-hidden="true" />

      <div className="container-page section-padding relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Incentive chip */}
          <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/40 rounded-full px-5 py-2 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-breathe shadow-[0_0_8px_rgba(212,180,131,0.6)]" />
            <span className="text-eyebrow text-primary font-semibold">
              Yas Circle · دائرة ياس
            </span>
          </div>

          <h2 className="font-serif text-h1 text-textPrimary mb-6 mt-2 text-balance">
            {t('sections.newsletterTitle')}
          </h2>

          <div className="hairline-gold w-20 mx-auto mb-8" />

          <p className="text-body text-textSecondary mb-12 max-w-lg mx-auto text-pretty">
            {t('sections.newsletterSub')}
          </p>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="card-surface p-10 max-w-md mx-auto"
            >
              <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center text-primary text-2xl mx-auto mb-5">
                ✦
              </div>
              <p className="text-base text-textPrimary">{t('sections.newsletterSuccess')}</p>
            </motion.div>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder={t('sections.newsletterPlaceholder')}
                  className="flex-1 rounded-full border border-border bg-surface/70 backdrop-blur-md px-6 py-3.5 text-textPrimary placeholder:text-textTertiary focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all shadow-[0_4px_14px_rgba(0,0,0,0.25)]"
                  aria-label={t('sections.newsletterPlaceholder')}
                />
                <Button type="submit" variant="primary" className="shrink-0">
                  {t('sections.newsletterCta')}
                </Button>
              </form>
              {error && <p className="text-badgeRed text-sm mt-3">{error}</p>}
              <p className="text-textTertiary text-[11px] mt-6 max-w-md mx-auto leading-relaxed">
                {t('sections.newsletterDisclaimer')}
              </p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
