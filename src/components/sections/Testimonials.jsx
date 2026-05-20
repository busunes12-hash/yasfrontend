import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { cn } from '../../utils/cn';
import KhaleejiAvatar from '../ui/KhaleejiAvatar';
import { useState, useRef } from 'react';

const testimonials = [
  {
    id: 1,
    nameAr: 'عبدالله المنصوري',
    nameEn: 'Abdullah Al Mansoori',
    locationAr: 'دبي',
    locationEn: 'Dubai',
    quoteAr: 'مسبحة الزعفران الأحمر تجربة لا تُوصف. العطر هادئ والصناعة متقنة. تستحق كل درهم.',
    quoteEn: 'The red saffron misbaha is an indescribable experience. Subtle fragrance, exquisite craft. Worth every dirham.',
    rating: 5,
  },
  {
    id: 2,
    nameAr: 'محمد القحطاني',
    nameEn: 'Mohammed Al Qahtani',
    locationAr: 'الرياض',
    locationEn: 'Riyadh',
    quoteAr: 'أهديت والدي مسبحة الكهرمان في عيد الفطر. كانت أجمل هدية. تغليف أنيق وخدمة عملاء راقية.',
    quoteEn: 'I gifted my father the amber misbaha for Eid. It was the most beautiful gift. Elegant packaging and excellent service.',
    rating: 5,
  },
  {
    id: 3,
    nameAr: 'خالد الكواري',
    nameEn: 'Khaled Al Kuwari',
    locationAr: 'الدوحة',
    locationEn: 'Doha',
    quoteAr: 'بصراحة، الجودة فاقت توقعاتي. سرعة في الشحن واهتمام بالتفاصيل. سأطلب مرة أخرى بكل تأكيد.',
    quoteEn: 'Honestly, the quality exceeded my expectations. Fast shipping and attention to detail. I will definitely order again.',
    rating: 5,
  },
];

const Stars = ({ count = 5 }) => (
  <div className="flex items-center gap-0.5 text-primary" aria-label={`${count} stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} viewBox="0 0 24 24" className="w-3.5 h-3.5" fill={i < count ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.4">
        <path d="M12 2 15.09 8.26 22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2Z" />
      </svg>
    ))}
  </div>
);

export default function Testimonials() {
  const { t } = useTranslation();
  const { lang } = useLanguage();

  return (
    <section className="bg-background relative" aria-label="Customer testimonials">
      <div className="container-page section-padding">
        <div className="text-center section-header max-w-2xl mx-auto">
          <span className="eyebrow mb-5">Voices</span>
          <h2 className="font-serif text-h1 text-textPrimary mb-5 mt-3">
            {t('sections.testimonialsTitle')}
          </h2>
          <p className="text-body text-textSecondary">
            {t('sections.testimonialsSub')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((tm, i) => (
            <motion.figure
              key={tm.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="card-surface p-7 flex flex-col h-full relative"
            >
              {/* Decorative quote mark */}
              <span aria-hidden="true" className="absolute top-5 ltr:right-5 rtl:left-5 font-serif text-5xl text-primary/15 leading-none select-none">"</span>

              <Stars count={tm.rating} />
              <blockquote className="mt-6 mb-8 flex-1 relative z-10">
                <p
                  className={cn(
                    lang === 'ar'
                      ? 'font-arabic text-body-lg text-textPrimary leading-[1.85]'
                      : 'text-body-lg text-textPrimary leading-relaxed font-serif tracking-[-0.005em]'
                  )}
                >
                  {lang === 'ar' ? tm.quoteAr : tm.quoteEn}
                </p>
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-5 border-t border-border">
                <KhaleejiAvatar
                  name={tm.nameEn}
                  size={40}
                  className="rounded-full border border-primary/30"
                />

                <div>
                  <p className={lang === 'ar' ? 'font-arabic text-sm font-semibold text-textPrimary' : 'text-sm font-semibold text-textPrimary'}>
                    {lang === 'ar' ? tm.nameAr : tm.nameEn}
                  </p>
                  <p className="text-eyebrow text-textTertiary mt-0.5">
                    {lang === 'ar' ? tm.locationAr : tm.locationEn}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
