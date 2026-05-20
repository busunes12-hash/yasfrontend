import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../context/LanguageContext';
import { cn } from '../../../utils/cn';

const IconTruck = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" />
  </svg>
);
const IconCash = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M6 12h.01M18 12h.01" />
  </svg>
);
const IconShield = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

function formatDeliveryRange(lang) {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() + 2);
  const end = new Date(today);
  end.setDate(today.getDate() + 4);
  const fmt = new Intl.DateTimeFormat(lang === 'ar' ? 'ar-AE' : 'en-AE', { day: 'numeric', month: 'short' });
  return `${fmt.format(start)} – ${fmt.format(end)}`;
}

/**
 * Trust trio shown right under the buy box.
 * Each row is short, scannable, builds confidence for cold traffic.
 */
export default function PDPDeliveryStrip() {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const [range, setRange] = useState('');

  useEffect(() => {
    setRange(formatDeliveryRange(lang));
  }, [lang]);

  const items = [
    {
      Icon: IconTruck,
      title: t('product.freeDelivery'),
      sub: t('product.deliveryEstimate', { date: range }),
    },
    {
      Icon: IconCash,
      title: t('product.codAvailable'),
      sub: lang === 'ar' ? 'افتح، افحص، ادفع. بهالترتيب.' : 'Open, inspect, pay. In that order.',
    },
    {
      Icon: IconShield,
      title: t('product.returns30'),
      sub: lang === 'ar' ? 'حتى لو فتحت العلبة' : 'Even after you open the box',
    },
  ];

  return (
    <div className="rounded-xl border border-primary/25 bg-gradient-to-br from-primary/[0.05] to-transparent p-1">
      <div className="rounded-[10px] bg-surface/60 backdrop-blur-sm divide-y divide-border/60">
        {items.map(({ Icon, title, sub }, i) => (
          <div key={i} className="flex items-start gap-3 p-4">
            <span className="shrink-0 w-9 h-9 rounded-full bg-primary/10 border border-primary/30 text-primary flex items-center justify-center">
              <Icon className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <p className={cn('text-sm font-semibold text-textPrimary leading-snug', lang === 'ar' ? 'font-arabic' : '')}>
                {title}
              </p>
              <p className="text-2xs text-textSecondary mt-0.5">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
