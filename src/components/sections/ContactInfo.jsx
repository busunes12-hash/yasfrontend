import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';

const IconPhone = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconMail = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconMapPin = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconClock = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ContactInfoItem = ({ icon: Icon, titleKey, value, subValue, delay = 0 }) => {
  const { t } = useTranslation();
  const { lang } = useLanguage();

  return (
    <div 
      className="flex items-start gap-4 p-5 rounded-xl bg-surface/40 border border-border/50 hover:border-primary/30 transition-all duration-300 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="p-2.5 rounded-lg bg-primary/5 text-primary group-hover:bg-primary group-hover:text-deepBrown transition-colors duration-300 shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-textPrimary mb-1">
          {lang === 'ar' ? t(`contactInfo.${titleKey}Ar`) : t(`contactInfo.${titleKey}`)}
        </h4>
        <p className="text-base text-textSecondary leading-relaxed">
          {value}
        </p>
        {subValue && (
          <p className="text-xs text-textTertiary mt-1">
            {subValue}
          </p>
        )}
      </div>
    </div>
  );
};

export default function ContactInfo() {
  const { t } = useTranslation();
  const { lang } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-b from-deepBrown/20 to-background">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-h2 text-textPrimary mb-4">
            {lang === 'ar' ? t('contactInfo.titleAr') : t('contactInfo.title')}
          </h2>
          <p className="text-body text-textSecondary">
            {lang === 'ar' ? t('contactInfo.subtitleAr') : t('contactInfo.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ContactInfoItem 
            icon={IconPhone}
            titleKey="phone"
            value="+971 50 000 0000"
            subValue={lang === 'ar' ? 'متاح من 9 صباحاً إلى 10 مساءً' : 'Available 9 AM - 10 PM'}
            delay={0}
          />
          <ContactInfoItem 
            icon={IconMail}
            titleKey="email"
            value="hello@yasbeads.com"
            subValue={lang === 'ar' ? 'نردّ خلال 24 ساعة' : 'We reply within 24 hours'}
            delay={100}
          />
          <ContactInfoItem 
            icon={IconMapPin}
            titleKey="address"
            value="Abu Dhabi, UAE"
            subValue={lang === 'ar' ? 'الأميرات، منطقة التراث' : 'Al Emirat, Heritage Area'}
            delay={200}
          />
          <ContactInfoItem 
            icon={IconClock}
            titleKey="hours"
            value={lang === 'ar' ? 'سبت - الخميس' : 'Saturday - Thursday'}
            subValue={lang === 'ar' ? '9 صباحاً - 10 مساءً' : '9 AM - 10 PM'}
            delay={300}
          />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
            <h3 className="font-semibold text-textPrimary mb-3">
              {lang === 'ar' ? t('contactInfo.whatsAppTitleAr') : t('contactInfo.whatsAppTitle')}
            </h3>
            <p className="text-sm text-textSecondary mb-4">
              {lang === 'ar' ? t('contactInfo.whatsAppDescAr') : t('contactInfo.whatsAppDesc')}
            </p>
            <a
              href="https://wa.me/971500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-success text-deepBrown rounded-lg font-medium hover:bg-success/90 transition-colors duration-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.52 3.48A11.94 11.94 0 0 0 12.04 0C5.46 0 .12 5.34.12 11.92c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.74 1.46h.01c6.58 0 11.92-5.34 11.92-11.92 0-3.18-1.24-6.18-3.45-8.4Zm-8.48 18.34h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98.99-3.65-.23-.37a9.9 9.9 0 0 1-1.52-5.27c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 0 1 2.91 7.01c-.01 5.47-4.45 9.9-9.93 9.9Zm5.46-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.79-1.67-2.08-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.18-.24-.58-.49-.5-.66-.51l-.56-.01c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.49 1.06 2.89 1.21 3.09c.15.2 2.09 3.2 5.07 4.49.71.31 1.27.49 1.7.63.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
              </svg>
              {lang === 'ar' ? 'اكتب لنا على واتساب' : 'Chat on WhatsApp'}
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20">
            <h3 className="font-semibold text-textPrimary mb-3">
              {lang === 'ar' ? t('contactInfo.socialTitleAr') : t('contactInfo.socialTitle')}
            </h3>
            <p className="text-sm text-textSecondary mb-4">
              {lang === 'ar' ? t('contactInfo.socialDescAr') : t('contactInfo.socialDesc')}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://instagram.com/yasbead"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity duration-300"
              >
                Instagram
              </a>
              <a
                href="https://tiktok.com/@yasbead"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300"
              >
                TikTok
              </a>
              <a
                href="https://youtube.com/@yasbead"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-300"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
