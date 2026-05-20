import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../context/LanguageContext';
import { cn } from '../../../utils/cn';

/**
 * Above-the-fold style social-proof bar — shown right after the buy box.
 * GCC-flag-themed mini stats.
 */
const STATS_AR = [
  { v: '٤٫٩', s: 'تقييم العملاء (من ٥)' },
  { v: '+٣٢٠', s: 'عميل في الخليج' },
  { v: '٩٢٪', s: 'يطلبون مرة ثانية' },
  { v: '٢٤س', s: 'متوسط التوصيل في الإمارات' },
];

const STATS_EN = [
  { v: '4.9', s: 'Average customer rating (out of 5)' },
  { v: '320+', s: 'Customers across the Gulf' },
  { v: '92%', s: 'Reorder within a year' },
  { v: '24h', s: 'Average UAE delivery time' },
];

export default function PDPSocialProof() {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const stats = lang === 'ar' ? STATS_AR : STATS_EN;

  return (
    <section className="bg-surface/40 border-y border-border/60 cv-auto" aria-label="Social proof">
      <div className="container-page py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {stats.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-serif text-primary mb-1 ltr-numerals">
                {it.v}
              </p>
              <p className={cn('text-2xs md:text-xs text-textSecondary leading-snug', lang === 'ar' ? 'font-arabic' : 'uppercase tracking-wider')}>
                {it.s}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-center gap-2 text-2xs text-textTertiary">
          <span aria-hidden="true">🇦🇪</span>
          <span aria-hidden="true">🇸🇦</span>
          <span aria-hidden="true">🇰🇼</span>
          <span aria-hidden="true">🇶🇦</span>
          <span aria-hidden="true">🇧🇭</span>
          <span aria-hidden="true">🇴🇲</span>
          <span className={cn('uppercase tracking-widest font-semibold ms-2', lang === 'ar' ? 'tracking-normal font-arabic' : '')}>
            {t('product.trustBuiltUae')}
          </span>
        </div>
      </div>
    </section>
  );
}
