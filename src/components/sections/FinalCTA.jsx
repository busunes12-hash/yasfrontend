import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Final CTA — the closing emotional reinforcement before the footer.
 * One sentence. One button. Generous breath.
 */
export default function FinalCTA() {
  const { t } = useTranslation();
  const { lang } = useLanguage();

  return (
    <section className="relative bg-deepBrown text-textPrimary overflow-hidden border-y border-border">
      {/* Soft glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/[0.07] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent/[0.05] blur-3xl pointer-events-none" />

      {/* Hairlines top + bottom */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container-page section-padding-lg relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="eyebrow text-accent mb-6 block">✦</span>
          <h2 className="font-serif text-display text-textPrimary mb-10 mt-3 text-balance">
            {lang === 'ar'
              ? 'طقسك اليومي يبدأ هنا.'
              : 'Your daily ritual starts here.'}
          </h2>
          <Link to="/shop?collection=saffron" className="btn-primary">
            {t('hero.ctaShop')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
