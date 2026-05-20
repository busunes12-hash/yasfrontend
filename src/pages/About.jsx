import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/seo/SEO';

export default function About() {
  const { t } = useTranslation();
  const { lang } = useLanguage();

  const values = [
    { titleKey: 'about.heritage', bodyKey: 'about.heritageBody', icon: '✦' },
    { titleKey: 'about.craft', bodyKey: 'about.craftBody', icon: '◈' },
    { titleKey: 'about.promise', bodyKey: 'about.promiseBody', icon: '◉' },
  ];

  return (
    <>
      <SEO
        title="The House of Yas — An Emirati Atelier"
        titleAr="دار ياس — أتيليه إماراتي"
        description="The story of Yas Beads — the first Emirati house to publish a digital catalogue of prayer beads. Hand-finished in Abu Dhabi, in numbered editions of fewer than fifty. Quiet luxury, devotion, heritage."
        descriptionAr="قصة ياس بيدز — أوّل دار إماراتية تنشر كتالوجاً رقمياً للمسابيح. صياغة يدوية في أبوظبي، في إصدارات مرقّمة لا تتجاوز الخمسين. فخامةٌ هادئة، ورُوحانيّة، وإرثٌ."
        url="/about"
        lang={lang}
      />
      {/* Hero */}
      <section className="relative bg-deepBrown text-textPrimary overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img
            src="https://yasbeads.com/cdn/shop/files/FA0E0C04-B2B8-4246-A48C-83FB456D732E.jpg?v=1751061527"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deepBrown/40 via-deepBrown/70 to-deepBrown" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/[0.08] blur-3xl" />
        </div>
        <div className="container-page relative section-padding-lg text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="eyebrow mb-5 block"
          >
            ✦ {lang === 'ar' ? 'الأتيليه الإماراتي · أبوظبي' : 'The Emirati Atelier · Abu Dhabi'}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-display mb-7 mt-3 text-balance"
          >
            {t('about.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="text-body-lg text-textSecondary max-w-2xl mx-auto"
          >
            {t('about.intro')}
          </motion.p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-background">
        <div className="container-page section-padding">
          <div className="grid md:grid-cols-3 gap-7">
            {values.map((v, i) => (
              <motion.div
                key={v.titleKey}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="card-surface p-10 text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-full border border-primary/30 bg-primary/10 text-primary text-2xl flex items-center justify-center mb-6">
                  {v.icon}
                </div>
                <h3 className={`text-h3 mb-4 text-textPrimary ${lang === 'ar' ? 'font-arabic font-semibold' : 'font-serif font-medium'}`}>
                  {t(v.titleKey)}
                </h3>
                <p className="text-textSecondary text-body-sm">{t(v.bodyKey)}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-20">
            <Link to="/shop" className="btn-primary inline-flex">
              {t('hero.ctaShop')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
