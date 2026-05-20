import { cn } from '../../utils/cn';

export default function Spinner({ className, size = 24 }) {
  return (
    <span
      role="status"
      aria-label="loading"
      className={cn('inline-block animate-spin rounded-full border-2 border-border border-t-primary', className)}
      style={{ width: size, height: size }}
    />
  );
}
