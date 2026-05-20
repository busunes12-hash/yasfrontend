import { cn } from '../../utils/cn';

/**
 * Base Button — Sanctuary theme.
 * variants: primary | ghost | dark | light
 * sizes:    sm | md | lg
 *
 * Primary uses dark text on champagne gold (luxury convention, AAA contrast).
 * Hover lifts with a subtle gold glow rather than darkening — aligns with
 * the spiritual / contemplative feel.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...props
}) {
  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none overflow-hidden';

  const variants = {
    primary:
      'bg-primary text-deepBrown hover:bg-primary-light hover:-translate-y-px shadow-[inset_0_1px_0_rgba(255,255,255,0.18),_0_6px_18px_rgba(0,0,0,0.35)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),_0_0_0_1px_rgba(226,197,138,0.3),_0_10px_28px_rgba(201,169,97,0.25)]',

    ghost:
      'border border-primary/60 text-primary bg-primary/[0.03] hover:bg-primary hover:text-deepBrown hover:border-primary',

    dark:
      'bg-deepBrown text-textPrimary border border-border hover:border-primary hover:text-primary',

    light:
      'bg-surface text-textPrimary border border-border hover:border-primary hover:text-primary',
  };

  const sizes = {
    sm: 'px-5 py-2 text-xs tracking-[0.08em]',
    md: 'px-7 py-3 text-sm tracking-[0.06em]',
    lg: 'px-9 py-4 text-base tracking-[0.05em]',
  };

  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
