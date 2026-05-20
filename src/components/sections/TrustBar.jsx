import { useTranslation } from 'react-i18next';

const items = [
  { icon: '✦', key: 'trust.authentic' },
  { icon: '◇', key: 'trust.shipping' },
  { icon: '◈', key: 'trust.cod' },
  { icon: '◉', key: 'trust.returns' },
];

export default function TrustBar() {
  const { t } = useTranslation();
  return (
    <section className="border-y border-border bg-surface/30 backdrop-blur-sm" aria-label="Trust signals">
      <div className="container-page py-8 md:py-10">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {items.map((it) => (
            <li key={it.key} className="flex items-center gap-3 justify-center md:justify-start">
              <span className="text-lg md:text-xl text-primary" aria-hidden="true">{it.icon}</span>
              <span className="text-body-sm font-medium text-textSecondary">
                {t(it.key)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
