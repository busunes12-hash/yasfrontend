import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../context/LanguageContext';
import { cn } from '../../../utils/cn';

/**
 * Risk-reversal block. Drops the cold-traffic visitor's last objection.
 * Sits before the FAQ.
 */
export default function PDPGuarantee() {
  const { t } = useTranslation();
  const { lang } = useLanguage();

  return (
    <section className="relative bg-background overflow-hidden cv-auto" aria-label="Guarantee">
      <div className="container-page py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="relative rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-surface/80 to-deepBrown/80 backdrop-blur-sm p-8 md:p-12 text-center shadow-warmLg overflow-hidden">
            {/* Soft glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full bg-primary/20 blur-3xl pointer-events-none" />

            {/* Seal */}
            <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/50 text-primary mb-6">
              <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>

            <h2 className={cn('text-h2 text-textPrimary mb-4 text-balance', lang === 'ar' ? 'font-arabic font-semibold' : 'font-serif')}>
              {t('pdp.guaranteeTitle')}
            </h2>
            <p className={cn('text-body-lg text-textSecondary max-w-xl mx-auto mb-8', lang === 'ar' ? 'font-arabic' : '')}>
              {t('pdp.guaranteeSub')}
            </p>

            {/* Three pillars */}
            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-start">
              {[
                {
                  title: lang === 'ar' ? '٣٠ يوم كاملة' : 'Full 30 days',
                  body: lang === 'ar' ? 'حتى لو فتحت العلبة. حتى لو الإصدار خلص.' : 'Even after you open it. Even on closed editions.',
                },
                {
                  title: lang === 'ar' ? 'بدون أسئلة' : 'No questions',
                  body: lang === 'ar' ? 'ما عجبتك؟ نسترجعها. ما نسأل ليش.' : "Don't love it? We take it back. We don't ask why.",
                },
                {
                  title: lang === 'ar' ? 'استرجاع كامل' : 'Full refund',
                  body: lang === 'ar' ? 'الفلوس ترجع لك بنفس طريقة الدفع.' : 'Funds returned the way you paid.',
                },
              ].map((p, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-surface/60 border border-border/60">
                  <span className="text-primary text-xl shrink-0" aria-hidden="true">✦</span>
                  <div>
                    <p className={cn('font-semibold text-textPrimary text-sm mb-1', lang === 'ar' ? 'font-arabic' : '')}>{p.title}</p>
                    <p className="text-2xs text-textSecondary leading-relaxed">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
