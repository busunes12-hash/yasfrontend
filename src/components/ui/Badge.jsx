import { cn } from '../../utils/cn';

/**
 * Pill badge — Sanctuary theme.
 * variants:
 *   sale     — gold on dark (subtle, refined)
 *   soldout  — muted terracotta on dark (informative, not alarming)
 *   new      — luminous gold border on transparent
 *   success  — sage on dark
 *   light    — neutral surface
 */
export default function Badge({ variant = 'sale', className, children, ...props }) {
  const variants = {
    sale:
      'bg-primary/15 text-primary border border-primary/40 backdrop-blur-sm',
    soldout:
      'bg-badgeRed/15 text-badgeRed border border-badgeRed/40 backdrop-blur-sm',
    new:
      'bg-deepBrown/70 text-accent border border-accent/40 backdrop-blur-sm',
    success:
      'bg-success/15 text-success border border-success/40',
    light:
      'bg-surface/80 text-textSecondary border border-border backdrop-blur-sm',
    solid:
      'bg-primary text-deepBrown',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
