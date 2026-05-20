import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { collections } from '../../data/collections';
import { cn } from '../../utils/cn';

/* ------------ Inline icons (avoid extra deps) ------------ */
const IconCart = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
const IconSearch = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const IconMenu = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...props}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const IconClose = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...props}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const IconChevron = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default function Navbar() {
  const { t } = useTranslation();
  const { lang, toggleLang, isRTL } = useLanguage();
  const { totalItems, openCart } = useCart();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    let ticking = false;
    let lastY = window.scrollY;
    const update = () => {
      setScrolled(lastY > 8);
      ticking = false;
    };
    const onScroll = () => {
      lastY = window.scrollY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close mobile drawer when nav size changes
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleShopEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setShopOpen(true);
  };
  const handleShopLeave = () => {
    closeTimer.current = setTimeout(() => setShopOpen(false), 150);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-colors duration-300 overflow-hidden',
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          : 'bg-background/80 border-b border-transparent'
      )}
    >
      <div className="container-page">
        <div className="flex h-16 md:h-20 items-center justify-between gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0 group"
            aria-label="Yas Beads home"
          >
            <span className="font-serif text-xl md:text-2xl tracking-[0.04em] text-textPrimary group-hover:text-primary transition-colors duration-500">
              YAS BEADS
            </span>
            <span className="hidden sm:inline text-border">·</span>
            <span className="hidden sm:inline font-arabic text-xl md:text-2xl text-primary">
              ياس بيدز
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-9" aria-label="Primary">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  'text-[13px] font-medium tracking-[0.08em] uppercase transition-colors duration-300 relative',
                  isActive ? 'text-primary' : 'text-textSecondary hover:text-primary'
                )
              }
            >
              {t('nav.home')}
            </NavLink>

            {/* Shop dropdown */}
            <div
              className="relative"
              onMouseEnter={handleShopEnter}
              onMouseLeave={handleShopLeave}
              ref={dropdownRef}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-[13px] font-medium tracking-[0.08em] uppercase text-textSecondary hover:text-primary transition-colors duration-300"
                aria-haspopup="true"
                aria-expanded={shopOpen}
                onClick={() => setShopOpen((o) => !o)}
              >
                {t('nav.shop')}
                <IconChevron className={cn('w-3.5 h-3.5 transition-transform duration-300', shopOpen && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {shopOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      'absolute top-full mt-4 w-72 rounded-xl bg-surface border border-border shadow-[0_12px_40px_rgba(0,0,0,0.5)] p-3 z-50',
                      isRTL ? 'right-0' : 'left-0'
                    )}
                  >
                    <Link
                      to="/shop"
                      className="block px-5 py-3.5 rounded-xl hover:bg-surfaceAlt text-sm font-medium text-primary transition-all duration-300"
                      onClick={() => setShopOpen(false)}
                    >
                      {t('shop.all')}
                    </Link>
                    <div className="hairline-gold my-2 mx-4" />
                    {collections.map((c) => (
                      <Link
                        key={c.id}
                        to={`/shop?collection=${c.slug}`}
                        className="block px-5 py-3.5 rounded-xl hover:bg-surfaceAlt text-sm transition-all duration-300"
                        onClick={() => setShopOpen(false)}
                      >
                        <span className={isRTL ? 'font-arabic block text-textPrimary' : 'block text-textPrimary font-medium'}>
                          {isRTL ? c.nameAr : c.nameEn}
                        </span>
                        <span className="block text-[10px] uppercase tracking-[0.18em] text-primary mt-0.5">
                          {isRTL ? c.taglineAr : c.taglineEn}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink
              to="/sale"
              className={({ isActive }) =>
                cn('relative text-[13px] font-medium tracking-[0.08em] uppercase transition-colors duration-300', isActive ? 'text-primary' : 'text-accent hover:text-primary')
              }
            >
              {t('nav.sale')}
              <span aria-hidden="true" className="absolute -top-1 -end-3 w-1.5 h-1.5 rounded-full bg-accent animate-breathe shadow-[0_0_8px_rgba(226,197,138,0.6)]" />
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                cn('text-[13px] font-medium tracking-[0.08em] uppercase transition-colors duration-300', isActive ? 'text-primary' : 'text-textSecondary hover:text-primary')
              }
            >
              {t('nav.about')}
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                cn('text-[13px] font-medium tracking-[0.08em] uppercase transition-colors duration-300', isActive ? 'text-primary' : 'text-textSecondary hover:text-primary')
              }
            >
              {t('nav.contact')}
            </NavLink>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={toggleLang}
              className="hidden sm:inline-flex items-center justify-center px-3 py-1.5 rounded-full border border-border text-[11px] font-semibold tracking-[0.18em] text-textSecondary hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
              aria-label={t('nav.language')}
            >
              {lang === 'ar' ? 'EN' : 'ع'}
            </button>

            <button
              type="button"
              onClick={() => setSearchOpen((s) => !s)}
              className="p-2.5 rounded-full text-textSecondary hover:bg-surface hover:text-primary hover:scale-110 transition-all duration-300"
              aria-label={t('nav.search')}
              aria-expanded={searchOpen}
            >
              <IconSearch className="w-[18px] h-[18px]" />
            </button>

            <button
              type="button"
              onClick={openCart}
              className="relative p-2.5 rounded-full text-textSecondary hover:bg-surface hover:text-primary hover:scale-110 transition-all duration-300"
              aria-label={`${t('nav.cart')} (${totalItems})`}
            >
              <IconCart className="w-[18px] h-[18px]" />
              {totalItems > 0 && (
                <span className="absolute top-0 ltr:right-0 rtl:left-0 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-primary text-deepBrown text-[10px] font-bold px-1 shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2.5 rounded-full text-textSecondary hover:bg-surface hover:text-primary hover:scale-110 transition-all duration-300"
              aria-label={t('nav.menu')}
              aria-expanded={mobileOpen}
            >
              <IconMenu className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>

        {/* Search bar collapsible */}
        <AnimatePresence>
          {searchOpen && (
            <motion.form
              onSubmit={onSearchSubmit}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-border/80"
            >
              <div className="py-5 flex gap-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('nav.search')}
                  className="input-field"
                  aria-label={t('nav.search')}
                  autoFocus
                />
                <button type="submit" className="btn-primary px-6">
                  <IconSearch className="w-4 h-4" />
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-deepBrown/95 z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: isRTL ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '-100%' : '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'fixed top-0 bottom-0 w-[88%] max-w-sm bg-surface z-50 shadow-[0_0_40px_rgba(0,0,0,0.6)] lg:hidden flex flex-col border-s border-border overflow-hidden',
                isRTL ? 'left-0' : 'right-0'
              )}
              role="dialog"
              aria-modal="true"
              aria-label={t('nav.menu')}
            >
              <div className="flex items-center justify-between p-6 border-b border-border/80">
                <span className="font-serif text-xl tracking-[0.04em] text-textPrimary">YAS BEADS</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2.5 rounded-full text-textSecondary hover:bg-surfaceAlt hover:text-primary hover:scale-110 transition-all duration-300"
                  aria-label={t('nav.close')}
                >
                  <IconClose className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-5 space-y-1" aria-label="Mobile">
                <NavLink to="/" onClick={() => setMobileOpen(false)} className="block px-5 py-3.5 rounded-xl hover:bg-surfaceAlt text-sm font-medium tracking-[0.06em] uppercase text-textPrimary hover:text-primary transition-all duration-300">
                  {t('nav.home')}
                </NavLink>
                <NavLink to="/shop" onClick={() => setMobileOpen(false)} className="block px-5 py-3.5 rounded-xl hover:bg-surfaceAlt text-sm font-medium tracking-[0.06em] uppercase text-textPrimary hover:text-primary transition-all duration-300">
                  {t('nav.shop')}
                </NavLink>
                <div className="ps-5 space-y-1 mb-3">
                  {collections.map((c) => (
                    <Link
                      key={c.id}
                      to={`/shop?collection=${c.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="block px-5 py-3 rounded-xl hover:bg-surfaceAlt text-sm transition-all duration-300"
                    >
                      <span className={isRTL ? 'font-arabic block text-textPrimary' : 'block text-textPrimary font-medium'}>
                        {isRTL ? c.nameAr : c.nameEn}
                      </span>
                      <span className="block text-[10px] uppercase tracking-[0.18em] text-primary mt-0.5">
                        {isRTL ? c.taglineAr : c.taglineEn}
                      </span>
                    </Link>
                  ))}
                </div>
                <NavLink to="/sale" onClick={() => setMobileOpen(false)} className="block px-5 py-3.5 rounded-xl hover:bg-surfaceAlt text-sm font-medium tracking-[0.06em] uppercase text-accent hover:text-primary transition-all duration-300">
                  {t('nav.sale')}
                </NavLink>
                <NavLink to="/about" onClick={() => setMobileOpen(false)} className="block px-5 py-3.5 rounded-xl hover:bg-surfaceAlt text-sm font-medium tracking-[0.06em] uppercase text-textPrimary hover:text-primary transition-all duration-300">
                  {t('nav.about')}
                </NavLink>
                <NavLink to="/contact" onClick={() => setMobileOpen(false)} className="block px-5 py-3.5 rounded-xl hover:bg-surfaceAlt text-sm font-medium tracking-[0.06em] uppercase text-textPrimary hover:text-primary transition-all duration-300">
                  {t('nav.contact')}
                </NavLink>
              </nav>

              <div className="p-6 border-t border-border/80">
                <button
                  type="button"
                  onClick={() => { toggleLang(); }}
                  className="btn-ghost w-full"
                >
                  {lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
