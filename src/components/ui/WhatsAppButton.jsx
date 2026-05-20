import { useLanguage } from '../../context/LanguageContext';

const WA_NUMBER = '971553779772';

/**
 * Floating WhatsApp FAB — visible site-wide.
 * RTL-aware: sits on the start edge (right in LTR, left in RTL).
 *
 * Note: the previous version used framer-motion + an `animate-ping` halo.
 * Both forced compositor work on every frame (mounted on every page),
 * which contributed to scroll jank. This version is pure CSS, with a
 * single subtle pulse confined to the FAB itself.
 */
export default function WhatsAppButton() {
  const { lang, isRTL } = useLanguage();

  const message = encodeURIComponent(
    lang === 'ar'
      ? 'السلام عليكم، أرغب في الاستفسار عن منتجاتكم'
      : 'Hello, I would like to enquire about your products'
  );

  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={lang === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
      className={`fixed bottom-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#1E8E5A] text-textPrimary shadow-warmLg ring-1 ring-[#2DB36E]/40 transition-transform duration-200 hover:scale-110 active:scale-95 motion-safe:animate-breathe ${
        isRTL ? 'left-6' : 'right-6'
      }`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
        <path d="M20.52 3.48A11.94 11.94 0 0 0 12.04 0C5.46 0 .12 5.34.12 11.92c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.74 1.46h.01c6.58 0 11.92-5.34 11.92-11.92 0-3.18-1.24-6.18-3.45-8.4Zm-8.48 18.34h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98.99-3.65-.23-.37a9.9 9.9 0 0 1-1.52-5.27c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 0 1 2.91 7.01c-.01 5.47-4.45 9.9-9.93 9.9Zm5.46-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.79-1.67-2.08-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.18-.24-.58-.49-.5-.66-.51l-.56-.01c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.49 1.06 2.89 1.21 3.09c.15.2 2.09 3.2 5.07 4.49.71.31 1.27.49 1.7.63.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    </a>
  );
}
