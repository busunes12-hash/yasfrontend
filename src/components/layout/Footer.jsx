import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { collections } from '../../data/collections';
import { useLanguage } from '../../context/LanguageContext';
import { useState } from 'react';

const IconInstagram = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);
const IconWhatsapp = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.52 3.48A11.94 11.94 0 0 0 12.04 0C5.46 0 .12 5.34.12 11.92c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.74 1.46h.01c6.58 0 11.92-5.34 11.92-11.92 0-3.18-1.24-6.18-3.45-8.4Zm-8.48 18.34h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98.99-3.65-.23-.37a9.9 9.9 0 0 1-1.52-5.27c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 0 1 2.91 7.01c-.01 5.47-4.45 9.9-9.93 9.9Zm5.46-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.79-1.67-2.08-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.18-.24-.58-.49-.5-.66-.51l-.56-.01c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.49 1.06 2.89 1.21 3.09c.15.2 2.09 3.2 5.07 4.49.71.31 1.27.49 1.7.63.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
  </svg>
);
const IconChevronDown = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const PaymentBadge = ({ children }) => (
  <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-border bg-surface/60 text-[10px] font-semibold tracking-[0.12em] text-textSecondary shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
    {children}
  </span>
);

export default function Footer() {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  // Mobile accordion state for each footer section
  const [openSections, setOpenSections] = useState({
    shop: false,
    company: false,
    policies: false,
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFooterLinkClick = (to) => {
    navigate(to);
    window.scrollTo(0, 0);
  };

  // Shop links
  const shopLinks = collections.map((c) => ({
    id: c.id,
    nameAr: c.nameAr,
    nameEn: c.nameEn,
    slug: c.slug,
  }));

  // Company links
  const companyLinks = [
    { id: 'about', nameAr: t('nav.about'), nameEn: t('nav.about'), to: '/about' },
    { id: 'contact', nameAr: t('footer.contactUs'), nameEn: t('footer.contactUs'), to: '/contact' },
    { id: 'shop', nameAr: t('nav.shop'), nameEn: t('nav.shop'), to: '/shop' },
  ];

  // Policies links
  const policiesLinks = [
    { id: 'privacy', nameAr: t('footer.privacy'), nameEn: t('footer.privacy'), to: '/policies/privacy' },
    { id: 'shipping', nameAr: t('footer.shippingPolicy'), nameEn: t('footer.shippingPolicy'), to: '/policies/shipping' },
    { id: 'returns', nameAr: t('footer.returns'), nameEn: t('footer.returns'), to: '/policies/returns' },
  ];

  return (
    <footer className="relative bg-deepBrown text-textPrimary overflow-hidden">
      {/* Decorative top gold hairline */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent shadow-[0_1px_2px_rgba(0,0,0,0.3)]" />

      {/* Soft glow accent - constrained to prevent overflow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/[0.09] blur-3xl pointer-events-none overflow-hidden" />

      <div className="container-page py-20 relative">
        {/* Mobile: horizontal titles, vertical links */}
        <div className="lg:hidden">
          {/* Horizontal scrollable titles */}
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide justify-center">
            <button
              onClick={() => toggleSection('shop')}
              className="flex-shrink-0 text-[11px] uppercase tracking-[0.32em] text-primary font-semibold py-2 border-b-2 transition-colors duration-300 whitespace-nowrap"
              aria-expanded={openSections.shop}
            >
              {t('footer.shop')}
              <IconChevronDown className={`w-3.5 h-3.5 inline-block ml-1 transition-transform duration-300 ${openSections.shop ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => toggleSection('company')}
              className="flex-shrink-0 text-[11px] uppercase tracking-[0.32em] text-primary font-semibold py-2 border-b-2 transition-colors duration-300 whitespace-nowrap"
              aria-expanded={openSections.company}
            >
              {t('footer.company')}
              <IconChevronDown className={`w-3.5 h-3.5 inline-block ml-1 transition-transform duration-300 ${openSections.company ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => toggleSection('policies')}
              className="flex-shrink-0 text-[11px] uppercase tracking-[0.32em] text-primary font-semibold py-2 border-b-2 transition-colors duration-300 whitespace-nowrap"
              aria-expanded={openSections.policies}
            >
              {t('footer.policies')}
              <IconChevronDown className={`w-3.5 h-3.5 inline-block ml-1 transition-transform duration-300 ${openSections.policies ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Shop links */}
          <div className={`overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide flex justify-center ${openSections.shop ? 'block' : 'hidden'}`}>
            <ul className="flex flex-col gap-3 min-w-max items-center">
              {shopLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleFooterLinkClick(`/shop?collection=${link.slug}`)}
                    className="text-sm text-textSecondary hover:text-primary transition-colors duration-300 text-center bg-none border-none p-0 cursor-pointer"
                  >
                    {lang === 'ar' ? link.nameAr : link.nameEn}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div className={`overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide flex justify-center ${openSections.company ? 'block' : 'hidden'}`}>
            <ul className="flex flex-col gap-3 min-w-max items-center">
              {companyLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleFooterLinkClick(link.to)}
                    className="text-sm text-textSecondary hover:text-primary transition-colors duration-300 text-center bg-none border-none p-0 cursor-pointer"
                  >
                    {lang === 'ar' ? link.nameAr : link.nameEn}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies links */}
          <div className={`overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide flex justify-center ${openSections.policies ? 'block' : 'hidden'}`}>
            <ul className="flex flex-col gap-3 min-w-max items-center">
              {policiesLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleFooterLinkClick(link.to)}
                    className="text-sm text-textSecondary hover:text-primary transition-colors duration-300 text-center bg-none border-none p-0 cursor-pointer"
                  >
                    {lang === 'ar' ? link.nameAr : link.nameEn}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Desktop: vertical layout */}
        <div className="hidden lg:grid lg:gap-14 lg:grid-cols-2 lg:grid-cols-5 items-start">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-serif text-2xl tracking-[0.04em] text-textPrimary">YAS BEADS</span>
              <span className="text-border">·</span>
              <span className="font-arabic text-2xl text-primary">ياس بيدز</span>
            </div>
            <p className="text-sm text-textSecondary max-w-sm leading-relaxed mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/yasbead"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-border text-textSecondary hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
                aria-label="Instagram"
              >
                <IconInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/971553779772"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-border text-textSecondary hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <IconWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.32em] text-primary font-semibold mb-5">
              {t('footer.shop')}
            </h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleFooterLinkClick(`/shop?collection=${link.slug}`)}
                    className="text-sm text-textSecondary hover:text-primary transition-colors duration-300 text-left bg-none border-none p-0 cursor-pointer"
                  >
                    {lang === 'ar' ? link.nameAr : link.nameEn}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.32em] text-primary font-semibold mb-5">
              {t('footer.company')}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleFooterLinkClick(link.to)}
                    className="text-sm text-textSecondary hover:text-primary transition-colors duration-300 text-left bg-none border-none p-0 cursor-pointer"
                  >
                    {lang === 'ar' ? link.nameAr : link.nameEn}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.32em] text-primary font-semibold mb-5">
              {t('footer.policies')}
            </h4>
            <ul className="space-y-3">
              {policiesLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleFooterLinkClick(link.to)}
                    className="text-sm text-textSecondary hover:text-primary transition-colors duration-300 text-left bg-none border-none p-0 cursor-pointer"
                  >
                    {lang === 'ar' ? link.nameAr : link.nameEn}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Ornament divider */}
      <div className="ornament-divider my-10">
        <span className="dot" />
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 py-6 border-t border-border/30">
        <p className="text-xs text-textTertiary tracking-wide text-center md:text-start">
          © {year} Yas Beads · {t('footer.rights')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-[10px] text-textTertiary tracking-[0.18em] uppercase me-1">{t('footer.payments')}</span>
          <PaymentBadge>VISA</PaymentBadge>
          <PaymentBadge>MASTER</PaymentBadge>
          <PaymentBadge>MADA</PaymentBadge>
          <PaymentBadge>APPLE PAY</PaymentBadge>
          <PaymentBadge>COD</PaymentBadge>
        </div>
      </div>
    </footer>
  );
}
