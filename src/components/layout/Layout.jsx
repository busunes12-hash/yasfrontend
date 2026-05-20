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
    <div className="flex flex-col min-h-screen overflow-x-clip">
      {/* Accessibility: skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-deepBrown focus:rounded-full focus:shadow-glow focus:font-semibold"
      >
        {lang === 'ar' ? 'انتقل إلى المحتوى الرئيسي' : 'Skip to main content'}
      </a>

      {/* Fixed header wrapper - announcement bar + navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar />
        <Navbar />
      </div>

      {/*
        Spacer to prevent content overlap with fixed header.
        Height matches: announcement bar (~44px) + navbar (h-16 mobile / h-20 desktop)
      */}
      <div aria-hidden="true" className="h-[108px] md:h-[124px]" />

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
