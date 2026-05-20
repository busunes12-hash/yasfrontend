import SEO from '../../components/seo/SEO';
import { useLanguage } from '../../context/LanguageContext';

export default function Returns() {
  const { lang } = useLanguage();
  return (
    <>
      <SEO
        title="Returns & Refunds"
        titleAr="الإرجاع والاسترداد"
        description="Yas Beads returns policy — 30 days, complimentary, considered. Even on bespoke editions."
        descriptionAr="سياسة إرجاع ياس بيدز — 30 يوماً، مجاناً، باهتمام — حتى للإصدارات المخصّصة."
        url="/policies/returns"
        lang={lang}
      />
      <div className="bg-background">
        <div className="container-page section-padding max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-2">
            {lang === 'ar' ? 'السياسات' : 'Policies'}
          </p>
          <h1 className="font-serif text-h1 text-textPrimary mb-3">
            {lang === 'ar' ? 'الإرجاع والاسترداد' : 'Returns & Refunds'}
          </h1>
          <p className="text-sm text-textSecondary mb-10">
            {lang === 'ar' ? 'آخر تحديث: مايو 2026' : 'Last updated: May 2026'}
          </p>

          <div className="space-y-8 text-textSecondary leading-relaxed">
            {/* Highlight box */}
            <div className="bg-success/10 border border-success/40 rounded-lg p-5 flex gap-3">
              <span className="text-2xl text-success">✦</span>
              <div>
                <p className="font-semibold text-textPrimary mb-1">
                  {lang === 'ar' ? 'إرجاع مجاني خلال 30 يوماً' : 'Complimentary 30-Day Returns'}
                </p>
                <p className="text-sm">
                  {lang === 'ar'
                    ? 'إن لم تسعدك القطعة لأي سبب، يمكنك إرجاعها خلال 30 يوماً من الاستلام — حتى للإصدارات المخصّصة.'
                    : 'If a piece does not delight you for any reason, you may return it within 30 days of receipt — even on bespoke editions.'}
                </p>
              </div>
            </div>

            {lang === 'ar' ? (
              <>
                <div>
                  <h2 className="font-serif text-xl text-textPrimary mb-3">شروط الإرجاع</h2>
                  <ul className="list-disc ps-5 space-y-2">
                    <li>القطعة تصلنا بحالتها الأصلية، غير مستخدمة</li>
                    <li>تغليف الأتيليه الأصلي سليم</li>
                    <li>خلال 30 يوماً من الاستلام</li>
                  </ul>
                </div>
                <div>
                  <h2 className="font-serif text-xl text-textPrimary mb-3">كيف تُرجع القطعة</h2>
                  <ol className="list-decimal ps-5 space-y-2">
                    <li>اكتب للأتيليه عبر واتساب أو البريد الإلكتروني</li>
                    <li>أرسل صورة للقطعة وسبباً وجيزاً</li>
                    <li>نُرسل إليك ملصق إرجاعٍ مجاني</li>
                    <li>يُعاد المبلغ خلال 5–7 أيام عمل</li>
                  </ol>
                </div>
                <div>
                  <h2 className="font-serif text-xl text-textPrimary mb-3">القطع المخصّصة والمنقوشة</h2>
                  <p>القطع المخصّصة أو المنقوشة بالاسم غير قابلة للإرجاع، إلا في حال وجود عيب في الصياغة — وعندها نعالج الأمر فوراً.</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="font-serif text-xl text-textPrimary mb-3">Return Conditions</h2>
                  <ul className="list-disc ps-5 space-y-2">
                    <li>The piece arrives in original, unused condition</li>
                    <li>Original atelier packaging intact</li>
                    <li>Within 30 days of receipt</li>
                  </ul>
                </div>
                <div>
                  <h2 className="font-serif text-xl text-textPrimary mb-3">How to Return</h2>
                  <ol className="list-decimal ps-5 space-y-2">
                    <li>Write to the atelier on WhatsApp or by email</li>
                    <li>Send a photograph of the piece and a brief reason</li>
                    <li>We send you a complimentary return label</li>
                    <li>Refund processed within 5–7 business days</li>
                  </ol>
                </div>
                <div>
                  <h2 className="font-serif text-xl text-textPrimary mb-3">Bespoke & Engraved Pieces</h2>
                  <p>Engraved or bespoke pieces are non-returnable, except in the case of a craft defect — we will make it right.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
