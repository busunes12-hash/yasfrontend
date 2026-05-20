import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../context/LanguageContext';
import { cn } from '../../../utils/cn';

/**
 * Shipping & COD reassurance.
 * Cold mobile traffic from Snap/TikTok needs to see "kaash 3and tasleem"
 * before they trust an unknown UAE brand.
 */
const Tile = ({ icon, title, body, accent }) => (
  <div className={cn(
    'flex items-start gap-4 p-5 rounded-xl border bg-surface/40 backdrop-blur-sm transition-colors duration-500',
    accent ? 'border-primary/40' : 'border-border/80'
  )}>
    <div className={cn(
      'shrink-0 w-11 h-11 rounded-full flex items-center justify-center',
      accent ? 'bg-primary/15 text-primary border border-primary/40' : 'bg-surface text-primary border border-border'
    )}>
      {icon}
    </div>
    <div>
      <p className="font-semibold text-textPrimary text-sm mb-1">{title}</p>
      <p className="text-2xs text-textSecondary leading-relaxed">{body}</p>
    </div>
  </div>
);

const IconTruck = (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" />
  </svg>
);
const IconCash = (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" />
  </svg>
);
const IconShield = (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><polyline points="9 12 11 14 15 10" />
  </svg>
);
const IconReturn = (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-15-6.7L3 13" />
  </svg>
);

export default function PDPShipping() {
  const { t } = useTranslation();
  const { lang } = useLanguage();

  return (
    <section className="relative bg-deepBrown overflow-hidden cv-auto" aria-label="Shipping and trust">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="container-page py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8 md:mb-10">
            <span className="eyebrow mb-3 block">
              ✦ {lang === 'ar' ? 'الشحن والثقة' : 'Shipping & trust'}
            </span>
            <h2 className={cn('text-h3 md:text-h2 text-textPrimary mb-3 text-balance', lang === 'ar' ? 'font-arabic font-semibold' : 'font-serif')}>
              {t('pdp.shippingTitle')}
            </h2>
            <p className="text-body text-textSecondary">{t('pdp.shippingSub')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-3 md:gap-4">
            <Tile
              icon={IconTruck}
              accent
              title={lang === 'ar' ? 'الإمارات في 24 ساعة' : 'UAE in 24 hours'}
              body={lang === 'ar' ? 'دبي، أبوظبي، الشارقة، عجمان — وصول اليوم التالي' : 'Dubai, Abu Dhabi, Sharjah, Ajman — next-day arrival'}
            />
            <Tile
              icon={IconTruck}
              title={lang === 'ar' ? 'الخليج في 2-4 أيام' : 'Gulf in 2-4 days'}
              body={lang === 'ar' ? 'السعودية، الكويت، قطر، البحرين، عمان — مجاناً' : 'KSA, Kuwait, Qatar, Bahrain, Oman — complimentary'}
            />
            <Tile
              icon={IconCash}
              accent
              title={lang === 'ar' ? 'كاش عند الاستلام' : 'Cash on delivery'}
              body={lang === 'ar' ? 'افحص القطعة بيدك قبل ما تدفع، بدون ضغط' : 'Inspect it in hand before you pay. No pressure.'}
            />
            <Tile
              icon={IconShield}
              title={lang === 'ar' ? 'شحن مغلّف ومؤمّن' : 'Insured & boxed'}
              body={lang === 'ar' ? 'علبة أتيليه فاخرة، مغلّفة بحماية مضاعفة' : 'Atelier box, double-protected packaging'}
            />
            <Tile
              icon={IconReturn}
              title={lang === 'ar' ? 'إرجاع 30 يوم' : '30-day returns'}
              body={lang === 'ar' ? 'بدون أسئلة، حتى لو فتحت العلبة' : 'No questions, even after you open the box'}
            />
            <Tile
              icon={IconShield}
              title={lang === 'ar' ? 'دفع آمن' : 'Secure checkout'}
              body={lang === 'ar' ? 'مدى، فيزا، ماستركارد، أو تحويل بنكي' : 'MADA, Visa, Mastercard, or bank transfer'}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
