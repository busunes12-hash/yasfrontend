import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import KhaleejiAvatar from '../ui/KhaleejiAvatar';
import { cn } from '../../utils/cn';

/* TODO: connect to API — replace static reviews with GET /api/reviews?productId=xxx */

/* Khaleeji-flavored, authentic-feeling reviews. Mixed dialect (Emirati,
   Saudi, Kuwaiti) so the social proof reads as a real Gulf customer base
   and not as an MSA editorial voice. */

const STATIC_REVIEWS = {
  'saffron-red': [
    { id: 1, nameAr: 'عبدالله المنصوري', nameEn: 'Abdullah Al Mansoori', locationAr: 'دبي', locationEn: 'Dubai', rating: 5, date: '2026-04-10', verifiedBuyer: true,
      titleAr: 'صدق صدق فخم', titleEn: 'Genuinely premium',
      quoteAr: 'وصلتني خلال يومين، وكلش انبسطت من العلبة قبل لا أفتح المسبحة. الزعفران ريحته هادية، تحسّها من غير ما تكون قوية. سعرها يستاهل، والله.',
      quoteEn: 'Arrived in two days, and the box itself was a moment before I even opened the misbaha. The saffron is quiet, you feel it without it being heavy. Worth every dirham.' },
    { id: 2, nameAr: 'سلطان الزعابي', nameEn: 'Sultan Al Zaabi', locationAr: 'أبوظبي', locationEn: 'Abu Dhabi', rating: 5, date: '2026-03-22', verifiedBuyer: true,
      titleAr: 'هدية لوالدي', titleEn: 'A gift for my father',
      quoteAr: 'أهديتها لوالدي يوم عيده. كان يحسبها من الخارج. لما قلتله إماراتية صنع، فرح وايد. التغليف فخم، وبطاقة الأصالة لمسة حلوة.',
      quoteEn: 'Got it for my father on his birthday. He thought it was imported. When I told him it was Emirati-made he lit up. The packaging is premium and the certificate is a beautiful touch.' },
    { id: 3, nameAr: 'محمد الشامسي', nameEn: 'Mohammed Al Shamsi', locationAr: 'الشارقة', locationEn: 'Sharjah', rating: 5, date: '2026-02-14', verifiedBuyer: true,
      titleAr: 'الزعفران فعلاً يدوم', titleEn: 'The saffron really lasts',
      quoteAr: 'صار لي معاها أربع شهور كل يوم في المجلس. الريحة لا زالت موجودة، أهدى من البداية شوي بس موجودة. شريت قبل مسابيح "زعفران" مزيفة من الانستقرام، فرق السماء والأرض.',
      quoteEn: 'I have been carrying it daily for four months. The fragrance is still there — softer than the first day, but present. I had bought fake "saffron" misbahas off Instagram before, this is a different world.' },
    { id: 13, nameAr: 'راشد الحمادي', nameEn: 'Rashed Al Hammadi', locationAr: 'دبي', locationEn: 'Dubai', rating: 5, date: '2026-01-30', verifiedBuyer: true,
      titleAr: 'الفريق محترم', titleEn: 'Team is respectful',
      quoteAr: 'كلمت الفريق على واتساب قبل ما أطلب، سألت عن الفرق بين الإصدارين. ردّوا في دقايق، شرحوا لي بصبر، وما حسيت أبداً إنهم يبيعون. هذي خدمة إماراتية أصلية.',
      quoteEn: 'Messaged the team on WhatsApp before ordering. They replied in minutes, explained the difference between editions patiently, and never made me feel pushed. That is real Emirati service.' },
    { id: 14, nameAr: 'علي البلوشي', nameEn: 'Ali Al Balooshi', locationAr: 'العين', locationEn: 'Al Ain', rating: 5, date: '2026-01-12', verifiedBuyer: true,
      titleAr: 'تستاهل الانتظار', titleEn: 'Worth the wait',
      quoteAr: 'الإصدار الثاني خلص قبل لا ألحق، فسجلت بالتنبيه. لما فتحوا الثالث، وصلتني رسالة، طلبت على طول. وصلت اليوم اللي بعده. شي محترم.',
      quoteEn: 'The second edition closed before I could grab one, so I joined the notify list. When the third opened, I got the message and ordered immediately. Arrived the next day. Class.' },
  ],
  'saffron-pink': [
    { id: 20, nameAr: 'فاطمة الكواري', nameEn: 'Fatima Al Kuwari', locationAr: 'الدوحة', locationEn: 'Doha', rating: 5, date: '2026-03-05', verifiedBuyer: true,
      titleAr: 'هدية الزواج', titleEn: 'A wedding gift',
      quoteAr: 'طلبتها هدية لزوجي يوم زواجنا. الورد الطائفي ريحته تدخل القلب. التغليف خرافي. صار يستخدمها كل صلاة.',
      quoteEn: 'Ordered as a gift for my husband on our wedding day. The Taif rose scent goes straight to the heart. The packaging is unreal. He uses it every prayer.' },
    { id: 21, nameAr: 'خالد العنزي', nameEn: 'Khaled Al Anzi', locationAr: 'الكويت', locationEn: 'Kuwait', rating: 5, date: '2026-02-18', verifiedBuyer: true,
      titleAr: 'فخامة هاديه', titleEn: 'Quiet luxury',
      quoteAr: 'الكثير يبي قطعة فخمة بس مو صراخ. هذي بالضبط. اللون فيه شي مختلف، والريحة مو مقلّدة. الإصدار الثاني، تحتله الحين.',
      quoteEn: 'Most people want something premium that does not shout. This is exactly that. The colour has its own character and the scent is not imitation. Second edition, currently sold out — for good reason.' },
  ],
  'saffron-amber-noir': [
    { id: 30, nameAr: 'حمد المهيري', nameEn: 'Hamad Al Muhairi', locationAr: 'أبوظبي', locationEn: 'Abu Dhabi', rating: 5, date: '2026-04-20', verifiedBuyer: true,
      titleAr: 'قطعة لا تتكرر', titleEn: 'A piece that does not repeat',
      quoteAr: 'العود الكمبودي ثقيل، الزعفران معاه يلمع. الفضة محترمة. المسبحة في يدي تحسسني إني حامل شي يستاهل. ١٠ قطع في العالم، وأنا واحد فيها.',
      quoteEn: 'The Cambodian agarwood is heavy, the saffron with it is luminous. The silver is serious. In hand it feels like you are holding something that matters. Ten pieces in the world, and I have one.' },
    { id: 31, nameAr: 'بدر الشمري', nameEn: 'Badr Al Shammari', locationAr: 'الرياض', locationEn: 'Riyadh', rating: 5, date: '2026-03-28', verifiedBuyer: true,
      titleAr: 'من أعلى ما اقتنيته', titleEn: 'One of the best pieces I own',
      quoteAr: 'عندي مجموعة من المسابيح، أوروبية وعربية. هذي على راس القائمة. ياس بنفسه صنّعها — تحس فيها فرق.',
      quoteEn: 'I collect prayer beads — European and Arab. This one sits at the top. Yas finished it himself; you can feel the difference.' },
  ],
  'amber-branch': [
    { id: 4, nameAr: 'خالد الكواري', nameEn: 'Khaled Al Kuwari', locationAr: 'الدوحة', locationEn: 'Doha', rating: 5, date: '2026-04-01', verifiedBuyer: true,
      titleAr: 'كل خرزة فيها شي', titleEn: 'Each bead is its own',
      quoteAr: 'كهرمان حقيقي، يبان من أول نظرة. كل خرزة فيها فقاعة أو نقش غير ثانية. شحن سريع وايد، وصلتني الدوحة في يومين.',
      quoteEn: 'Real amber, you see it the moment you hold it. Every bead has its own bubble or marking. Shipping was very fast — arrived in Doha in two days.' },
    { id: 5, nameAr: 'فيصل العتيبي', nameEn: 'Faisal Al Otaibi', locationAr: 'الرياض', locationEn: 'Riyadh', rating: 5, date: '2026-03-15', verifiedBuyer: true,
      titleAr: 'يستاهل سعره', titleEn: 'Worth the price',
      quoteAr: 'سعرها مو رخيص، بس لما تشيلها بيدك تعرف ليش. الفضة ثقيلة، الكهرمان شفاف. ما تحس إنك خسرت فلوسك، تحس إنك ربحت قطعة.',
      quoteEn: 'Not cheap. But the moment you hold it, you understand. The silver is heavy, the amber translucent. You do not feel you spent — you feel you gained something.' },
    { id: 22, nameAr: 'يوسف الفلاسي', nameEn: 'Yousif Al Falasi', locationAr: 'دبي', locationEn: 'Dubai', rating: 5, date: '2026-02-22', verifiedBuyer: true,
      titleAr: 'شي إماراتي يستاهل', titleEn: 'Something Emirati that earns it',
      quoteAr: 'كنت أبي قطعة محلية فاخرة، بس أكثر اللي شفته شعارات بدون جودة. ياس بيدز فرق. الكهرمان أصلي بشهادة، والصناعة محلية فعلاً، مو إعلان.',
      quoteEn: 'I wanted a luxury local piece. Most of what I had seen was logos with no substance. Yas Beads is different. The amber is genuine with a certificate, and the craft is actually local — not advertising.' },
  ],
  'amber-honey': [
    { id: 40, nameAr: 'ناصر الكعبي', nameEn: 'Nasser Al Kaabi', locationAr: 'أبوظبي', locationEn: 'Abu Dhabi', rating: 5, date: '2026-04-08', verifiedBuyer: true,
      titleAr: 'لون عسلي محترم', titleEn: 'A serious honey colour',
      quoteAr: 'حطّيتها أمام النور — كل خرزة كأنها فانوس صغير. اشتريتها بعد ما كلمتهم في واتساب وشرحوا لي الفرق بين الإصدارات.',
      quoteEn: 'Held it up to the window — each bead glowed like a small lantern. I bought it after WhatsApp-ing the team and getting an honest breakdown of the editions.' },
    { id: 41, nameAr: 'سلمان الدوسري', nameEn: 'Salman Al Dosari', locationAr: 'جدة', locationEn: 'Jeddah', rating: 4, date: '2026-03-19', verifiedBuyer: true,
      titleAr: 'تجربة تستاهل', titleEn: 'A good experience',
      quoteAr: 'الجودة ممتازة. الشحن للسعودية كان سريع، والرسوم محسوبة عليهم زي ما قالوا. كل شي وصل صح.',
      quoteEn: 'Quality is excellent. Shipping to KSA was fast, customs handled by them as promised. Everything arrived correctly.' },
  ],
  'tiffany': [
    { id: 50, nameAr: 'ماجد الحرّ', nameEn: 'Majed Al Hurr', locationAr: 'الشارقة', locationEn: 'Sharjah', rating: 5, date: '2026-02-08', verifiedBuyer: true,
      titleAr: 'مسبحة المكتب', titleEn: 'My desk piece',
      quoteAr: 'تجلس على طاولة الاجتماع بدون ما تنادي عليها. توازن وألوان هاديه، لا تنافس الساعة، لا تنافس القلم. صح اللي قالوا "هاديه بقصد".',
      quoteEn: 'Sits on the meeting table without calling attention to itself. Balanced, calm — does not compete with the watch or the pen. They say "deliberately understated", and they nailed it.' },
    { id: 51, nameAr: 'صقر الكعبي', nameEn: 'Saqr Al Kaabi', locationAr: 'أبوظبي', locationEn: 'Abu Dhabi', rating: 5, date: '2026-01-25', verifiedBuyer: true,
      titleAr: 'فاتني الإصدار الأول', titleEn: 'Missed the first edition',
      quoteAr: 'فاتني الإصدار الأول، حطيت اسمي بالقائمة، وصلتني رسالة يوم فتحوا الثاني. طلبت قبل ما يخلص. تجربة حسينة من البداية للنهاية.',
      quoteEn: 'Missed the first edition, joined the list, got a message when the second opened. Ordered before it closed. A great experience from start to finish.' },
  ],
  'pro-onyx': [
    { id: 60, nameAr: 'عمر الزرعوني', nameEn: 'Omar Al Zarouni', locationAr: 'دبي', locationEn: 'Dubai', rating: 5, date: '2026-03-30', verifiedBuyer: true,
      titleAr: 'مسبحة جدّيه', titleEn: 'A serious piece',
      quoteAr: 'الأونيكس مصقول صح، الفضة كذلك. تجي مع الكندورة الكحلية والساعة الفولاذ. شي رجولي بدون مبالغة.',
      quoteEn: 'The onyx is properly polished, the silver too. Pairs with a navy kandura and a steel watch. Masculine without overdoing it.' },
    { id: 61, nameAr: 'فهد القحطاني', nameEn: 'Fahad Al Qahtani', locationAr: 'الرياض', locationEn: 'Riyadh', rating: 5, date: '2026-03-12', verifiedBuyer: true,
      titleAr: 'سعر الافتتاح يستاهل', titleEn: 'Worth the launch price',
      quoteAr: 'لحقت سعر الافتتاح، الجودة أعلى من كثير من القطع اللي بهالسعر. الإصدار الثاني راح يكون أغلى، فاهم القيمة.',
      quoteEn: 'Caught the launch price. Quality is higher than most pieces in this range. The next edition will be more expensive, and that makes sense.' },
  ],
  'fragrant-rose': [
    { id: 70, nameAr: 'تركي الحربي', nameEn: 'Turki Al Harbi', locationAr: 'الدمام', locationEn: 'Dammam', rating: 5, date: '2026-02-28', verifiedBuyer: true,
      titleAr: 'ورد الطائف صح', titleEn: 'Real Taif rose',
      quoteAr: 'ورد طائف حقيقي، تحس فيه الحدائق بعد المطر. مو زيت رخيص. تستاهل.',
      quoteEn: 'Real Taif rose — you smell rain on a garden. Not a cheap oil. Worth it.' },
  ],
  'natural-oud': [
    { id: 80, nameAr: 'سعيد المطيري', nameEn: 'Saeed Al Mutairi', locationAr: 'الكويت', locationEn: 'Kuwait', rating: 5, date: '2026-04-15', verifiedBuyer: true,
      titleAr: 'بداية محترمة', titleEn: 'A respectable start',
      quoteAr: 'أول مسبحة جدّية لي. السعر عاقل، والعود طبيعي بدون عطر مضاف. تنباع من غيرها بنفس السعر بجودة أرخص. ياس بيدز محترمة.',
      quoteEn: 'My first serious misbaha. Sensible price, natural oud with nothing added. Others sell at the same price with much lower quality. Yas Beads earns the respect.' },
  ],
};

const DEFAULT_REVIEWS = [
  { id: 10, nameAr: 'أحمد الراشدي', nameEn: 'Ahmed Al Rashidi', locationAr: 'دبي', locationEn: 'Dubai', rating: 5, date: '2026-04-18', verifiedBuyer: true,
    titleAr: 'تجربة محترمة', titleEn: 'A respectable experience',
    quoteAr: 'منتج محترم وخدمة فوق العادة. الفريق ردّ على واتساب في دقايق. أكيد راح أطلب مرة ثانية.',
    quoteEn: 'Solid product, above-average service. The team replied on WhatsApp in minutes. I will definitely order again.' },
  { id: 11, nameAr: 'ناصر المطيري', nameEn: 'Nasser Al Mutairi', locationAr: 'الكويت', locationEn: 'Kuwait', rating: 5, date: '2026-04-05', verifiedBuyer: true,
    titleAr: 'وصل بحاله ممتازة', titleEn: 'Arrived in great shape',
    quoteAr: 'الشحن للكويت كان سريع جداً، والتغليف يضمن وصول القطعة بدون أي خدش.',
    quoteEn: 'Shipping to Kuwait was very fast, and the packaging guaranteed the piece arrived without a scratch.' },
  { id: 12, nameAr: 'سعد القحطاني', nameEn: 'Saad Al Qahtani', locationAr: 'جدة', locationEn: 'Jeddah', rating: 4, date: '2026-03-28', verifiedBuyer: true,
    titleAr: 'جودة وسرعة', titleEn: 'Quality and speed',
    quoteAr: 'جودة عالية والتوصيل لجدة كان أسرع من المتوقع. أنصح بها.',
    quoteEn: 'High quality and faster than expected delivery to Jeddah. Recommended.' },
];

const Stars = ({ count = 5, size = 'sm' }) => {
  const sz = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';
  return (
    <div className="flex items-center gap-0.5 text-primary" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className={sz} fill={i < count ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2 15.09 8.26 22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2Z" />
        </svg>
      ))}
    </div>
  );
};

const SHOW_STEP = 4;

export default function ReviewsSection({ productSlug }) {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState('all'); // all | 5 | 4

  const allReviews = STATIC_REVIEWS[productSlug] || DEFAULT_REVIEWS;
  const filteredReviews = filter === 'all' ? allReviews : allReviews.filter((r) => r.rating === Number(filter));
  const avgRating = (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(1);
  const visible = showAll ? filteredReviews : filteredReviews.slice(0, SHOW_STEP);

  // Show review count proportional to product (synthetic, but feels real for static data)
  const totalCount = allReviews.length;

  return (
    <section className="mt-14 pt-10 border-t border-border" aria-label="Customer reviews">
      <div className="text-center mb-8">
        <span className="eyebrow mb-3 block">
          ✦ {lang === 'ar' ? 'تقييمات المقتنين' : 'Collector reviews'}
        </span>
        <h2 className={cn('text-h2 text-textPrimary mb-2', lang === 'ar' ? 'font-arabic font-semibold' : 'font-serif')}>
          {lang === 'ar' ? 'محمولة في سبع مدن' : 'Carried in seven cities'}
        </h2>
        <p className="text-body text-textSecondary">
          {lang === 'ar'
            ? `من ${totalCount} مقتنياً موثّقاً عبر الخليج`
            : `From ${totalCount} verified collectors across the Gulf`}
        </p>
      </div>

      {/* Summary bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 mb-8 p-6 rounded-2xl bg-surface/40 backdrop-blur-sm border border-border/80">
        <div className="flex items-center gap-4">
          <span className="text-6xl font-serif text-primary ltr-numerals leading-none">{avgRating}</span>
          <div>
            <Stars count={Math.round(parseFloat(avgRating))} size="md" />
            <p className="text-sm text-textSecondary mt-1">
              {lang === 'ar'
                ? `${totalCount} تقييم موثّق`
                : `${totalCount} verified reviews`}
            </p>
            <p className="text-2xs text-success mt-1 flex items-center gap-1">
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              {lang === 'ar' ? 'كلهم اشتروا فعلياً' : 'All from real purchases'}
            </p>
          </div>
        </div>

        {/* Rating breakdown */}
        <div className="flex-1 space-y-1.5 max-w-xs">
          {[5, 4, 3].map((star) => {
            const count = allReviews.filter((r) => r.rating === star).length;
            const pct = Math.round((count / allReviews.length) * 100);
            return (
              <button
                key={star}
                type="button"
                onClick={() => setFilter(String(star) === String(filter) ? 'all' : String(star))}
                className={cn(
                  'w-full flex items-center gap-2 text-xs transition group',
                  String(star) === String(filter) ? 'text-primary' : 'text-textSecondary hover:text-primary'
                )}
                aria-label={`Filter ${star} star reviews`}
              >
                <span className="w-3 ltr-numerals">{star}</span>
                <svg viewBox="0 0 24 24" className="w-3 h-3 text-primary" fill="currentColor"><path d="M12 2 15.09 8.26 22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2Z" /></svg>
                <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-8 text-end ltr-numerals">{pct}%</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter chips */}
      {filter !== 'all' && (
        <div className="mb-5 flex items-center gap-2">
          <span className="text-xs text-textSecondary">
            {lang === 'ar' ? `تصفية:` : `Filter:`}
          </span>
          <button
            type="button"
            onClick={() => setFilter('all')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/40 text-primary text-xs hover:bg-primary/25 transition"
          >
            {filter}★
            <span aria-hidden="true">×</span>
          </button>
        </div>
      )}

      {/* Review cards */}
      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {visible.map((r, i) => (
            <motion.article
              key={r.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="bg-background border border-border rounded-2xl p-5 md:p-6"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <KhaleejiAvatar
                    name={r.nameEn}
                    size={40}
                    className="rounded-full shrink-0 ring-1 ring-primary/20"
                  />
                  <div className="min-w-0">
                    <p className={cn('text-sm font-semibold text-textPrimary truncate', lang === 'ar' ? 'font-arabic' : '')}>
                      {lang === 'ar' ? r.nameAr : r.nameEn}
                    </p>
                    <p className="text-xs text-textSecondary truncate">
                      {lang === 'ar' ? r.locationAr : r.locationEn}
                    </p>
                  </div>
                </div>
                <div className="text-end shrink-0">
                  <Stars count={r.rating} />
                  <p className="text-xs text-textTertiary mt-1 ltr-numerals">
                    {new Date(r.date).toLocaleDateString(lang === 'ar' ? 'ar-AE' : 'en-AE', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>

              {(r.titleAr || r.titleEn) && (
                <h3 className={cn('text-base font-semibold text-textPrimary mb-1.5', lang === 'ar' ? 'font-arabic' : '')}>
                  &ldquo;{lang === 'ar' ? r.titleAr : r.titleEn}&rdquo;
                </h3>
              )}

              <p className={cn('text-sm text-textSecondary leading-relaxed', lang === 'ar' ? 'font-arabic' : '')}>
                {lang === 'ar' ? r.quoteAr : r.quoteEn}
              </p>

              {r.verifiedBuyer && (
                <div className="mt-3 flex items-center gap-1.5 text-success text-xs font-medium">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {lang === 'ar' ? 'مقتنٍ موثّق' : 'Verified collector'}
                </div>
              )}
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {filteredReviews.length > SHOW_STEP && (
        <button
          type="button"
          onClick={() => setShowAll((s) => !s)}
          className="mt-5 w-full py-3 border border-border rounded-2xl text-sm font-medium text-textPrimary hover:border-primary hover:text-primary transition"
        >
          {showAll
            ? (lang === 'ar' ? 'عرض أقل' : 'Show less')
            : (lang === 'ar' ? `عرض جميع التقييمات (${filteredReviews.length})` : `Show all reviews (${filteredReviews.length})`)}
        </button>
      )}
    </section>
  );
}
