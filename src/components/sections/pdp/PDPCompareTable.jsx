import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../context/LanguageContext';
import { cn } from '../../../utils/cn';

/**
 * Why-us-vs-them comparison.
 * Cold-traffic killer: forces the visitor to face the real choice.
 */
const IconClose = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconCheck = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function PDPCompareTable() {
  const { t } = useTranslation();
  const { lang } = useLanguage();

  const rows = [1, 2, 3, 4, 5].map((n) => ({
    title: t(`pdp.compareRow${n}Title`),
    them: t(`pdp.compareRow${n}A`),
    us: t(`pdp.compareRow${n}B`),
  }));

  return (
    <section className="relative bg-deepBrown overflow-hidden cv-auto" aria-label="Compare">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/[0.06] blur-3xl pointer-events-none" />

      <div className="container-page py-16 md:py-24 relative">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="eyebrow mb-4 block">
            ✦ {lang === 'ar' ? 'الفرق' : 'The difference'}
          </span>
          <h2 className={cn('text-h2 text-textPrimary mb-4 text-balance', lang === 'ar' ? 'font-arabic font-semibold' : 'font-serif')}>
            {t('pdp.compareTitle')}
          </h2>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block max-w-4xl mx-auto rounded-2xl border border-border/80 bg-surface/40 backdrop-blur-sm overflow-hidden shadow-warmLg">
          <div className="grid grid-cols-3 border-b border-border/80 bg-surface/60">
            <div className="p-5 text-eyebrow text-textTertiary uppercase font-semibold">
              {/* spacer */}
            </div>
            <div className="p-5 text-center border-x border-border/80">
              <p className="text-eyebrow text-textTertiary uppercase">{t('pdp.compareCol1')}</p>
            </div>
            <div className="p-5 text-center bg-primary/5">
              <p className="text-eyebrow text-primary uppercase font-bold">{t('pdp.compareCol2')}</p>
            </div>
          </div>

          {rows.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'grid grid-cols-3 items-stretch',
                i < rows.length - 1 && 'border-b border-border/60'
              )}
            >
              <div className={cn('p-5 font-semibold text-textPrimary text-sm flex items-center', lang === 'ar' ? 'font-arabic' : '')}>
                {r.title}
              </div>
              <div className="p-5 border-x border-border/60 flex items-start gap-2 text-textTertiary text-sm">
                <IconClose className="w-4 h-4 text-badgeRed shrink-0 mt-0.5" aria-hidden="true" />
                <span className="line-through opacity-80">{r.them}</span>
              </div>
              <div className="p-5 bg-primary/[0.04] flex items-start gap-2 text-textPrimary text-sm font-medium">
                <IconCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <span>{r.us}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile stacked card pairs */}
        <div className="md:hidden space-y-4 max-w-md mx-auto">
          {rows.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl border border-border/80 bg-surface/40 overflow-hidden"
            >
              <div className={cn('px-4 py-2.5 bg-surface/60 border-b border-border/60 text-xs uppercase tracking-wider font-bold text-textPrimary', lang === 'ar' ? 'font-arabic tracking-normal text-sm' : '')}>
                {r.title}
              </div>
              <div className="p-4 flex items-start gap-2 border-b border-border/60">
                <IconClose className="w-4 h-4 text-badgeRed shrink-0 mt-0.5" />
                <div>
                  <p className="text-2xs uppercase tracking-wider text-textTertiary mb-1 font-bold">
                    {t('pdp.compareCol1')}
                  </p>
                  <p className="text-sm text-textTertiary line-through opacity-80">{r.them}</p>
                </div>
              </div>
              <div className="p-4 flex items-start gap-2 bg-primary/[0.05]">
                <IconCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-2xs uppercase tracking-wider text-primary mb-1 font-bold">
                    {t('pdp.compareCol2')}
                  </p>
                  <p className="text-sm text-textPrimary font-medium">{r.us}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className={cn('text-center text-textSecondary mt-10 italic max-w-xl mx-auto text-body', lang === 'ar' ? 'font-arabic' : 'font-serif')}>
          — {t('pdp.compareFooter')}
        </p>
      </div>
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
}
