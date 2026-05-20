import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../context/LanguageContext';
import { cn } from '../../../utils/cn';

const IconChevron = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const FAQItem = ({ q, a, idx, lang, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: idx * 0.04 }}
      className="border-b border-border last:border-b-0"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 text-start py-5 group"
      >
        <span className={cn('text-base md:text-lg font-medium text-textPrimary group-hover:text-primary transition-colors', lang === 'ar' ? 'font-arabic' : '')}>
          {q}
        </span>
        <IconChevron
          className={cn(
            'w-5 h-5 text-textSecondary group-hover:text-primary shrink-0 mt-0.5 transition-transform duration-300',
            open && 'rotate-180 text-primary'
          )}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className={cn('pb-5 text-body-sm text-textSecondary leading-relaxed', lang === 'ar' ? 'font-arabic' : '')}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const WA_NUMBER = '971553779772';

export default function PDPFAQ({ productName }) {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const items = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
    q: t(`pdp.faq${n}Q`),
    a: t(`pdp.faq${n}A`),
  }));

  const waMessage = encodeURIComponent(
    lang === 'ar'
      ? `السلام عليكم، عندي سؤال عن ${productName || 'منتجاتكم'}`
      : `Hello, I have a question about ${productName || 'your products'}`
  );

  return (
    <section className="relative bg-background cv-auto" aria-label="FAQ">
      <div className="container-page py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <span className="eyebrow mb-4 block">
              ✦ {lang === 'ar' ? 'أسئلة' : 'Questions'}
            </span>
            <h2 className={cn('text-h2 text-textPrimary mb-4 text-balance', lang === 'ar' ? 'font-arabic font-semibold' : 'font-serif')}>
              {t('pdp.faqTitle')}
            </h2>
            <p className="text-body text-textSecondary mb-6">{t('pdp.faqSub')}</p>

            <a
              href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition font-semibold"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                <path d="M20.52 3.48A11.94 11.94 0 0 0 12.04 0C5.46 0 .12 5.34.12 11.92c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.74 1.46h.01c6.58 0 11.92-5.34 11.92-11.92 0-3.18-1.24-6.18-3.45-8.4Zm-8.48 18.34h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98.99-3.65-.23-.37a9.9 9.9 0 0 1-1.52-5.27c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 0 1 2.91 7.01c-.01 5.47-4.45 9.9-9.93 9.9Z" />
              </svg>
              {lang === 'ar' ? 'كلّمنا في واتساب' : 'Chat on WhatsApp'}
            </a>
          </div>

          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-border/80 bg-surface/40 backdrop-blur-sm overflow-hidden divide-y divide-border/60 px-5 md:px-7">
              {items.map((it, i) => (
                <FAQItem key={i} q={it.q} a={it.a} idx={i} lang={lang} defaultOpen={i === 0} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
