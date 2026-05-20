import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../context/LanguageContext';
import { cn } from '../../../utils/cn';

/**
 * Three-up benefit row — sits between the buy box and the comparison table.
 * Each card answers one of the three cold-traffic objections:
 *   1) "is the material real?"
 *   2) "what makes the craft different?"
 *   3) "is it worth this price?"
 */
const Item = ({ icon, title, body, lang, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    className="relative rounded-2xl border border-border/80 bg-surface/40 backdrop-blur-sm p-6 md:p-8 hover:border-primary/40 transition-colors duration-500 group"
  >
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/30 text-primary mb-5 group-hover:bg-primary group-hover:text-deepBrown transition-all duration-500">
      {icon}
    </div>
    <h3 className={cn('text-lg md:text-xl text-textPrimary mb-3 leading-snug', lang === 'ar' ? 'font-arabic font-semibold' : 'font-serif font-medium')}>
      {title}
    </h3>
    <p className="text-body-sm text-textSecondary leading-relaxed">{body}</p>
  </motion.div>
);

const IconGem = (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 3h12l4 6-10 12L2 9l4-6Z" /><path d="M6 3 12 9l6-6" /><path d="M2 9h20" />
  </svg>
);
const IconHand = (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 14V4a2 2 0 0 0-4 0v9" /><path d="M7 13a2 2 0 0 0-4 0v3a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8V8a2 2 0 1 0-4 0v5" /><path d="M19 13V4a2 2 0 1 0-4 0v10" /><path d="M15 4a2 2 0 0 0-4 0v9" />
  </svg>
);
const IconHeritage = (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" /><path d="M9 9v.01" /><path d="M9 12v.01" /><path d="M9 15v.01" /><path d="M9 18v.01" />
  </svg>
);

export default function PDPHighlights() {
  const { t } = useTranslation();
  const { lang } = useLanguage();

  const items = [
    {
      icon: IconGem,
      title: lang === 'ar' ? 'خامة موثّقة، مو شعارات' : 'Real material, with proof',
      body: lang === 'ar'
        ? 'زعفران نجين من حصاد إيراني واحد. كهرمان بلطيقي أصلي. فضة ٩٢٥. كل قطعة معاها بطاقة أصالة موقّعة.'
        : 'Negin saffron from a single Iranian harvest. Real Baltic amber. 925 silver. Every piece arrives with a signed certificate.',
    },
    {
      icon: IconHand,
      title: lang === 'ar' ? 'مصنوعة بيد إماراتية' : 'Made by Emirati hands',
      body: lang === 'ar'
        ? 'الصياغة، العقد، الفحص — كله في أتيليه واحد بأبوظبي. ٤٠ قطعة بس في كل إصدار. لما يخلص، يخلص.'
        : 'Strung, knotted, and inspected in one Abu Dhabi atelier. 40 pieces per edition. When it closes, it closes.',
    },
    {
      icon: IconHeritage,
      title: lang === 'ar' ? 'تُحمل، وتُورَّث' : 'Carried, then passed on',
      body: lang === 'ar'
        ? 'مسبحة تليق بمجلسك، وتزداد جمال مع الأيام. تورّثها لولدك، ويعرف إنها جاية من رجل اختار قطعة فاخرة.'
        : 'A piece for the majlis, that deepens with handling. Pass it to your son, and he will know it came from a man who chose well.',
    },
  ];

  return (
    <section className="relative bg-background cv-auto" aria-label="Why this piece">
      <div className="container-page py-12 md:py-16">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="eyebrow mb-3 block">
            ✦ {lang === 'ar' ? 'ليش هالقطعة' : 'Why this piece'}
          </span>
          <h2 className={cn('text-h2 text-textPrimary text-balance', lang === 'ar' ? 'font-arabic font-semibold' : 'font-serif')}>
            {t('pdp.promiseTitle')}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5 md:gap-7 max-w-5xl mx-auto">
          {items.map((it, i) => (
            <Item key={i} {...it} lang={lang} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
