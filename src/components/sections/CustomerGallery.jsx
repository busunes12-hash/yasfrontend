import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Customer Gallery — UGC strip below testimonials.
 * 6 lifestyle / collector tiles with @handle overlay on hover.
 *
 * TODO: connect to API — replace with /api/instagram-feed or curated UGC list.
 */
const tiles = [
  { id: 1, handle: '@khaled.collector', img: 'https://yasbeads.com/cdn/shop/files/FA0E0C04-B2B8-4246-A48C-83FB456D732E.jpg?v=1751061527' },
  { id: 2, handle: '@majlis.notes',     img: 'https://yasbeads.com/cdn/shop/files/5B787386-B35D-4893-BAFA-E48C99523438.jpg?v=1741814557' },
  { id: 3, handle: '@yas.regular',      img: 'https://yasbeads.com/cdn/shop/files/6E1C3C0D-52E3-47DB-A112-EBA91F8BD393.jpg?v=1763302315' },
  { id: 4, handle: '@oud.and.amber',    img: 'https://yasbeads.com/cdn/shop/files/69344518-A1AC-4139-B4FB-A49B40006B3C.jpg?v=1734351398' },
  { id: 5, handle: '@friday.morning',   img: 'https://yasbeads.com/cdn/shop/files/7F228C35-5A94-4FB7-BCC5-B83F0753B107.jpg?v=1734350579' },
  { id: 6, handle: '@beads.daily',      img: 'https://yasbeads.com/cdn/shop/files/8E012334-B76E-4FAD-9645-5678314330BD.jpg?v=1733741918' },
];

export default function CustomerGallery() {
  const { t } = useTranslation();
  const { lang } = useLanguage();

  return (
    <section className="bg-background relative" aria-label="Customer photos">
      <div className="container-page section-padding">
        <div className="text-center section-header max-w-2xl mx-auto">
          <span className="eyebrow mb-5">#yasbeads</span>
          <h2 className="font-serif text-h1 text-textPrimary mb-5 mt-3">
            {lang === 'ar' ? 'في أيدي عملائنا' : 'In the hands of our collectors'}
          </h2>
          <p className="text-body text-textSecondary">
            {lang === 'ar'
              ? 'صور حقيقية من مقتنين في الخليج. شارك صورتك بوسم #yasbeads.'
              : 'Real photos from collectors across the Gulf. Tag #yasbeads to be featured.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {tiles.map((tile, i) => (
            <motion.a
              key={tile.id}
              href="https://instagram.com/yasbead"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-square overflow-hidden rounded-lg bg-deepBrown border border-border hover:border-primary/40 transition-all duration-500"
              aria-label={`${tile.handle} on Instagram`}
            >
              <img
                src={tile.img}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Hover overlay with handle */}
              <div className="absolute inset-0 bg-gradient-to-t from-deepBrown via-deepBrown/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-3 md:p-4">
                <p className="text-eyebrow text-accent font-semibold">{tile.handle}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <p className="text-center mt-10">
          <a href="https://instagram.com/yasbead" target="_blank" rel="noopener noreferrer" className="link-cta">
            {lang === 'ar' ? 'تابعنا على إنستغرام' : 'Follow us on Instagram'}
          </a>
        </p>
      </div>
    </section>
  );
}
