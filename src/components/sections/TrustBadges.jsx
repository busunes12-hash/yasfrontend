import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';

const IconTruck = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </svg>
);

const IconShield = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
  </svg>
);

const IconCheckCircle = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconHeadphones = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

const IconLeaf = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const IconCreditCard = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

const TrustBadge = ({ icon: Icon, titleKey, descKey, delay = 0 }) => {
  const { t } = useTranslation();
  const { lang } = useLanguage();

  return (
    <div 
      className="flex flex-col items-center text-center p-6 rounded-2xl bg-surface/50 backdrop-blur-sm border border-border/60 hover:border-primary/30 transition-all duration-500 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-4 p-3 rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-deepBrown transition-all duration-300">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-semibold text-textPrimary mb-2">
        {lang === 'ar' ? t(`trust.${titleKey}Ar`) : t(`trust.${titleKey}`)}
      </h3>
      <p className="text-xs text-textSecondary leading-relaxed">
        {lang === 'ar' ? t(`trust.${descKey}Ar`) : t(`trust.${descKey}`)}
      </p>
    </div>
  );
};

export default function TrustBadges() {
  const { t } = useTranslation();

  const badges = [
    {
      icon: IconTruck,
      titleKey: 'freeShipping',
      descKey: 'freeShippingDesc',
      delay: 0,
    },
    {
      icon: IconShield,
      titleKey: 'authenticity',
      descKey: 'authenticityDesc',
      delay: 100,
    },
    {
      icon: IconCheckCircle,
      titleKey: 'qualityGuarantee',
      descKey: 'qualityGuaranteeDesc',
      delay: 200,
    },
    {
      icon: IconHeadphones,
      titleKey: '247Support',
      descKey: '247SupportDesc',
      delay: 300,
    },
    {
      icon: IconLeaf,
      titleKey: 'sustainable',
      descKey: 'sustainableDesc',
      delay: 400,
    },
    {
      icon: IconCreditCard,
      titleKey: 'securePayment',
      descKey: 'securePaymentDesc',
      delay: 500,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-deepBrown/30">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge, index) => (
            <TrustBadge 
              key={index}
              {...badge}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
