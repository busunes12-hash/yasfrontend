import { useEffect, useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { cn } from '../../../utils/cn';

const CITIES_AR = ['دبي', 'أبوظبي', 'الرياض', 'الدوحة', 'الكويت', 'جدة', 'المنامة', 'مسقط', 'الشارقة'];
const CITIES_EN = ['Dubai', 'Abu Dhabi', 'Riyadh', 'Doha', 'Kuwait City', 'Jeddah', 'Manama', 'Muscat', 'Sharjah'];

const FIRST_NAMES_AR = ['محمد', 'أحمد', 'عبدالله', 'سلطان', 'خالد', 'فيصل', 'ناصر', 'سعد', 'عمر', 'راشد', 'حمد', 'ماجد'];
const FIRST_NAMES_EN = ['Mohammed', 'Ahmed', 'Abdullah', 'Sultan', 'Khaled', 'Faisal', 'Nasser', 'Saad', 'Omar', 'Rashid', 'Hamad', 'Majed'];

const TIME_AR = ['قبل 12 دقيقة', 'قبل 28 دقيقة', 'قبل ساعة', 'قبل ساعتين', 'اليوم'];
const TIME_EN = ['12 minutes ago', '28 minutes ago', 'an hour ago', '2 hours ago', 'today'];

/**
 * Subtle live "X just bought" + viewers strip.
 * Sits under the hero buy-box. Builds urgency without being a popup.
 */
export default function PDPSocialProofBar({ productSlug }) {
  const { lang, isRTL } = useLanguage();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 8000);
    return () => clearInterval(id);
  }, []);

  // Stable per-product viewer count
  const seed = (productSlug || '').split('').reduce((s, c) => s + c.charCodeAt(0), 0);
  const viewers = 11 + (seed % 23); // 11–33

  // Rotating "just bought" message
  const idx = (tick + seed) % FIRST_NAMES_AR.length;
  const nm = lang === 'ar' ? FIRST_NAMES_AR[idx] : FIRST_NAMES_EN[idx];
  const city = lang === 'ar' ? CITIES_AR[idx % CITIES_AR.length] : CITIES_EN[idx % CITIES_EN.length];
  const time = lang === 'ar' ? TIME_AR[tick % TIME_AR.length] : TIME_EN[tick % TIME_EN.length];

  const bought = lang === 'ar'
    ? `${nm} من ${city} طلب نفس القطعة ${time}`
    : `${nm} from ${city} ordered the same piece ${time}`;

  return (
    <div className="mb-5 rounded-xl border border-primary/25 bg-primary/[0.06] backdrop-blur-sm p-3.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-2xs">
      {/* Live viewers */}
      <div className="flex items-center gap-2">
        <span className="relative flex w-2 h-2 shrink-0">
          <span className="absolute inset-0 rounded-full bg-success opacity-60 animate-ping" />
          <span className="relative inline-flex w-2 h-2 rounded-full bg-success" />
        </span>
        <span className="text-textPrimary font-medium">
          <span className="text-primary font-bold">{viewers}</span>{' '}
          {lang === 'ar' ? 'يشوفون هالقطعة الحين' : 'people viewing right now'}
        </span>
      </div>

      <span aria-hidden="true" className="hidden sm:inline-block w-px h-3 bg-border" />

      {/* Just-ordered */}
      <div className={cn('flex items-center gap-2 min-w-0', isRTL ? 'font-arabic' : '')}>
        <span className="text-primary shrink-0" aria-hidden="true">✦</span>
        <span className="text-textSecondary truncate">{bought}</span>
      </div>
    </div>
  );
}
