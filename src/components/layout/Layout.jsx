import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import WhatsAppButton from '../ui/WhatsAppButton';
import { useLanguage } from '../../context/LanguageContext';

export default function Layout() {
  const location = useLocation();
  const { lang } = useLanguage();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Accessibility: skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-deepBrown focus:rounded-full focus:shadow-glow focus:font-semibold"
      >
        {lang === 'ar' ? 'انتقل إلى المحتوى الرئيسي' : 'Skip to main content'}
      </a>

      <AnnouncementBar />
      <Navbar />

      {/*
        Page-transition AnimatePresence removed on purpose:
        animating opacity + translateY on the entire page tree on every
        route change forces full document repaints and noticeably hurts
        scroll responsiveness on mid-range devices. Sections still
        animate in via their own framer-motion `whileInView`.
      */}
      <main id="main-content" className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>

      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </div>
  );
}
