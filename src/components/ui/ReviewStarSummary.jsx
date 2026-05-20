/**
 * Compact star + rating count badge — used near the price on PDP.
 * Clicking scrolls to the full reviews section.
 */
export default function ReviewStarSummary({ rating = 4.9, count = 42, lang = 'ar' }) {
  const scrollToReviews = () => {
    document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToReviews}
      className="inline-flex items-center gap-1.5 group"
      aria-label={`${rating} out of 5, ${count} reviews`}
    >
      <div className="flex items-center gap-0.5 text-primary">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} viewBox="0 0 24 24" className="w-4 h-4" fill={i < Math.round(rating) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2 15.09 8.26 22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2Z" />
          </svg>
        ))}
      </div>
      <span className="text-sm font-semibold text-textPrimary">{rating}</span>
      <span className="text-sm text-textSecondary group-hover:text-primary transition">
        ({count} {lang === 'ar' ? 'تقييم' : 'reviews'})
      </span>
    </button>
  );
}
