import SEO from '../../components/seo/SEO';
import { useLanguage } from '../../context/LanguageContext';

export default function Shipping() {
  const { lang } = useLanguage();
  return (
    <>
      <SEO
        title="Shipping Policy"
        titleAr="سياسة الشحن"
        description="Yas Beads shipping policy — complimentary GCC delivery, timelines and tracking."
        descriptionAr="سياسة شحن ياس بيدز — توصيل مجاني داخل الخليج، المواعيد والتتبّع."
        url="/policies/shipping"
        lang={lang}
      />
      <div className="bg-background">
        <div className="container-page section-padding max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-2">
            {lang === 'ar' ? 'السياسات' : 'Policies'}
          </p>
          <h1 className="font-serif text-h1 text-textPrimary mb-3">
            {lang === 'ar' ? 'سياسة الشحن' : 'Shipping Policy'}
          </h1>
          <p className="text-sm text-textSecondary mb-10">
            {lang === 'ar' ? 'آخر تحديث: مايو 2026' : 'Last updated: May 2026'}
          </p>

          <div className="space-y-8 text-textSecondary leading-relaxed">
            {lang === 'ar' ? (
              <>
                <ShippingTable lang="ar" />
                <div>
                  <h2 className="font-serif text-xl text-textPrimary mb-3">الشحن المجاني</h2>
                  <p>نوفّر توصيلاً مجانياً على كل طلبٍ داخل دول مجلس التعاون الخليجي (الإمارات، السعودية، الكويت، قطر، البحرين، عُمان) — دون حدٍّ أدنى للطلب.</p>
                </div>
                <div>
                  <h2 className="font-serif text-xl text-textPrimary mb-3">التتبع</h2>
                  <p>ستتلقى رسالة بريد إلكتروني تحتوي على رقم التتبع فور شحن طلبك.</p>
                </div>
                <div>
                  <h2 className="font-serif text-xl text-textPrimary mb-3">الشحن الدولي</h2>
                  <p>نشحن إلى جميع أنحاء العالم. تتراوح رسوم الشحن الدولي بين 30–60 درهماً حسب الوجهة، وتستغرق 5–10 أيام عمل.</p>
                </div>
              </>
            ) : (
              <>
                <ShippingTable lang="en" />
                <div>
                  <h2 className="font-serif text-xl text-textPrimary mb-3">Complimentary Delivery</h2>
                  <p>We offer complimentary delivery on every order across the GCC (UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, Oman), with no minimum order value.</p>
                </div>
                <div>
                  <h2 className="font-serif text-xl text-textPrimary mb-3">Tracking</h2>
                  <p>You will receive an email with a tracking number as soon as your order is dispatched.</p>
                </div>
                <div>
                  <h2 className="font-serif text-xl text-textPrimary mb-3">International Shipping</h2>
                  <p>We ship worldwide. International shipping fees range from AED 30–60 depending on destination, and take 5–10 business days.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ShippingTable({ lang }) {
  const rows = lang === 'ar'
    ? [
        ['الإمارات', 'مجاني', '1–2 يوم عمل'],
        ['السعودية', 'مجاني', '2–3 أيام عمل'],
        ['الكويت / قطر / البحرين / عُمان', 'مجاني', '3–4 أيام عمل'],
        ['دولي', '30–60 درهم', '5–10 أيام عمل'],
      ]
    : [
        ['UAE', 'Free', '1–2 business days'],
        ['Saudi Arabia', 'Free', '2–3 business days'],
        ['Kuwait / Qatar / Bahrain / Oman', 'Free', '3–4 business days'],
        ['International', 'AED 30–60', '5–10 business days'],
      ];

  const headers = lang === 'ar'
    ? ['الوجهة', 'رسوم الشحن', 'وقت التوصيل']
    : ['Destination', 'Shipping Fee', 'Delivery Time'];

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-background">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-start font-semibold text-textPrimary border-b border-border">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-surface">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-3 ${j === 1 ? 'text-success font-semibold' : ''}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
