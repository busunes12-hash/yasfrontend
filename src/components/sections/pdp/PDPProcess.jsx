import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../context/LanguageContext';
import { cn } from '../../../utils/cn';

/**
 * Atelier process — turns "expensive misbaha" into "earned price".
 */
const Step = ({ n, title, body, lang, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    className="relative"
  >
    <div className="flex flex-col items-start gap-4">
      <div className="relative">
        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/40 text-primary font-serif text-xl ltr-numerals">
          {n}
        </span>
        <span className="absolute inset-0 rounded-full ring-1 ring-primary/30 animate-breathe pointer-events-none" aria-hidden="true" />
      </div>
      <div>
        <h3 className={cn('text-h3 text-textPrimary mb-2', lang === 'ar' ? 'font-arabic font-semibold' : 'font-serif')}>
          {title}
        </h3>
        <p className="text-body-sm text-textSecondary leading-relaxed">{body}</p>
      </div>
    </div>
  </motion.div>
);

export default function PDPProcess() {
  const { t } = useTranslation();
  const { lang } = useLanguage();

  const steps = [1, 2, 3, 4].map((n) => ({
    n,
    title: t(`pdp.process${n}Title`),
    body: t(`pdp.process${n}Body`),
  }));

  return (
    <section className="relative bg-background cv-auto" aria-label="How it's made">
      <div className="container-page py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="eyebrow mb-4 block">
            ✦ {lang === 'ar' ? 'الأتيليه' : 'The atelier'}
          </span>
          <h2 className={cn('text-h2 text-textPrimary mb-4 text-balance', lang === 'ar' ? 'font-arabic font-semibold' : 'font-serif')}>
            {t('pdp.processTitle')}
          </h2>
          <p className="text-body-lg text-textSecondary">{t('pdp.processSub')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <Step key={s.n} {...s} lang={lang} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
