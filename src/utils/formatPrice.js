/**
 * Format a number as AED currency, language-aware.
 * @param {number} amount
 * @param {string} lang - "ar" | "en"
 */
export function formatPrice(amount, lang = 'en') {
  if (amount == null || isNaN(amount)) return '';
  const formatter = new Intl.NumberFormat(lang === 'ar' ? 'ar-AE' : 'en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(amount);
}
