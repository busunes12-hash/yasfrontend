import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

/**
 * AnnouncementBar — rotates 3 brand messages every 3s.
 * Sanctuary theme: deepest ink with subtle gold hairline,
 * champagne-gold text. Quiet, never shouts.
 */
export default function AnnouncementBar() {
  const { t } = useTranslation();
  const messages = [
    t('announcement.shipping'),
    t('announcement.discount'),
    t('announcement.cod'),
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    let id;
    const start = () => {
      stop();
      id = setInterval(() => {
        setIndex((i) => (i + 1) % messages.length);
      }, 5000);
    };
    const stop = () => {
      if (id) {
        clearInterval(id);
        id = null;
      }
    };
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [messages.length]);

  return (
    <div
      className="bg-deepBrown text-accent text-xs relative overflow-hidden border-b border-border/60"
      role="status"
      aria-live="polite"
    >
      {/* Subtle gold hairline beneath */}
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent shadow-[0_1px_2px_rgba(0,0,0,0.3)]" />

      <div className="container-page flex items-center justify-center py-3 min-h-[44px] relative w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center font-medium tracking-[0.18em] uppercase"
          >
            {messages[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
