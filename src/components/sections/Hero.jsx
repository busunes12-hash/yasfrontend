import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden">
      {/* Sanctuary backdrop — quiet ink with a soft halo behind the headline */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-deepBrown/60" />
        {/* Soft ambient glow accents — static, GPU-cheap */}
        <div className="absolute -top-24 left-1/3 w-[640px] h-[640px] rounded-full bg-primary/[0.10] blur-[140px]" />
        <div className="absolute -bottom-32 right-1/4 w-[520px] h-[520px] rounded-full bg-accent/[0.06] blur-[140px]" />
        {/* Vignette ground line */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="container-page section-padding-lg">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-16 lg:gap-24 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-start"
          >
            <span className="eyebrow mb-6">
              {t('hero.kicker')}
            </span>
            <h1 className="font-serif text-display text-textPrimary mb-8 mt-4 text-balance leading-[1.05]">
              {t('hero.headline')}
            </h1>
            {/* Hairline accent under headline for editorial weight */}
            <div className="hidden lg:block w-16 h-px bg-gradient-to-r from-primary/60 to-transparent mb-8" />
            <p className="text-body-lg text-textSecondary max-w-xl mx-auto lg:mx-0 mb-12 leading-relaxed">
              {t('hero.sub')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/shop?collection=saffron" className="btn-primary">
                {t('hero.ctaShop')}
              </Link>
              <Link to="/about" className="btn-ghost">
                {t('hero.ctaStory')}
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            {/* Subtle gold halo behind the frame */}
            <div className="absolute -inset-6 rounded-[28px] bg-primary/5 blur-2xl pointer-events-none" aria-hidden="true" />
            <div className="media-frame aspect-[4/5]">
              <img
                src="https://yasbeads.com/cdn/shop/files/6E1C3C0D-52E3-47DB-A112-EBA91F8BD393.jpg?v=1763302315&width=900"
                alt="Tiffany Misbaha · First Series"
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                fetchpriority="high"
                width="800"
                height="1000"
              />
              {/* Soft top vignette to keep image from "floating" off screen */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-deepBrown/40 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
