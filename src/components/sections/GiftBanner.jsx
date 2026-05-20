import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function GiftBanner() {
  const { t } = useTranslation();
  return (
    <section className="bg-background">
      <div className="container-page py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl bg-deepBrown text-textPrimary p-12 md:p-20 border border-primary/20"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at top right, rgba(201,169,97,0.12), transparent 60%), radial-gradient(ellipse at bottom left, rgba(226,197,138,0.08), transparent 60%)',
          }}
        >
          {/* Decorative gold hairline frame */}
          <span aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <span aria-hidden="true" className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <div className="relative grid md:grid-cols-3 gap-10 items-center">
            <div className="md:col-span-2">
              <span className="eyebrow mb-4">✦  {t('nav.gifts')}</span>
              <h2 className="font-serif text-h1 text-textPrimary mb-5 mt-3 text-balance">
                {t('sections.giftTitle')}
              </h2>
              <p className="text-body text-textSecondary max-w-xl">{t('sections.giftSub')}</p>
            </div>
            <div className="flex md:justify-end">
              <Link to="/shop?tag=gift" className="btn-primary">
                {t('sections.giftCta')}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
