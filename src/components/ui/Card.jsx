import { cn } from '../../utils/cn';

export default function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'bg-surface border border-border rounded-lg shadow-warm overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
