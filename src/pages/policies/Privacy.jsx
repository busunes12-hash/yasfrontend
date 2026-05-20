import SEO from '../../components/seo/SEO';
import { useLanguage } from '../../context/LanguageContext';

export default function Privacy() {
  const { lang } = useLanguage();
  return (
    <>
      <SEO
        title="Privacy Policy"
        titleAr="سياسة الخصوصية"
        description="Yas Beads privacy policy — how the atelier handles, uses and safeguards your information."
        descriptionAr="سياسة خصوصية ياس بيدز — كيف يتعامل الأتيليه مع معلوماتك ويستخدمها ويحفظها."
        url="/policies/privacy"
        lang={lang}
      />
      <PolicyLayout
        titleEn="Privacy Policy"
        titleAr="سياسة الخصوصية"
        lastUpdated="May 2026"
      >
        {lang === 'ar' ? (
          <>
            <Section title="المعلومات التي نجمعها">
              <p>نجمع فقط المعلومات التي تشاركها معنا مباشرةً عند إنشاء حساب، أو إتمام طلبٍ، أو الكتابة للأتيليه — الاسم، البريد الإلكتروني، رقم الهاتف، وعنوان الشحن.</p>
            </Section>
            <Section title="كيف نستخدم معلوماتك">
              <ul>
                <li>لمعالجة طلبك وإرساله</li>
                <li>لإخبارك بحالة الطلب وإشعارات الشحن</li>
                <li>لمشاركتك الإصدارات الجديدة ودعوة دائرة ياس (بموافقتك)</li>
                <li>لتنسيق تجربتك مع الدار بما يليق بك</li>
              </ul>
            </Section>
            <Section title="مشاركة البيانات">
              <p>لا نبيع معلوماتك الشخصية. نشاركها فقط مع شركاء الشحن والدفع الضروريين لإتمام طلبك، وفق المعايير التي تتبعها كل دار فاخرة.</p>
            </Section>
            <Section title="تواصل معنا">
              <p>لأي استفسارٍ يخصّ الخصوصية، اكتب إلى: <a href="mailto:privacy@yasbeads.com" className="text-primary hover:underline">privacy@yasbeads.com</a></p>
            </Section>
          </>
        ) : (
          <>
            <Section title="Information We Collect">
              <p>We collect only the information you provide directly when creating an account, placing an order, or writing to the atelier — name, email, phone number, and shipping address.</p>
            </Section>
            <Section title="How We Use Your Information">
              <ul>
                <li>To process and dispatch your order</li>
                <li>To send order updates and shipping notifications</li>
                <li>To share new editions and Yas Circle access (with your consent)</li>
                <li>To refine your experience with the house</li>
              </ul>
            </Section>
            <Section title="Data Sharing">
              <p>We do not sell your personal information. We share data only with the shipping and payment partners required to fulfil your order, under the standards expected of a luxury house.</p>
            </Section>
            <Section title="Speak With Us">
              <p>For any privacy enquiry, write to: <a href="mailto:privacy@yasbeads.com" className="text-primary hover:underline">privacy@yasbeads.com</a></p>
            </Section>
          </>
        )}
      </PolicyLayout>
    </>
  );
}

function PolicyLayout({ titleEn, titleAr, lastUpdated, children }) {
  const { lang } = useLanguage();
  return (
    <div className="bg-background">
      <div className="container-page section-padding max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-2">
          {lang === 'ar' ? 'السياسات' : 'Policies'}
        </p>
        <h1 className="font-serif text-h1 text-textPrimary mb-3">
          {lang === 'ar' ? titleAr : titleEn}
        </h1>
        <p className="text-sm text-textSecondary mb-10">
          {lang === 'ar' ? `آخر تحديث: ${lastUpdated}` : `Last updated: ${lastUpdated}`}
        </p>
        <div className="prose prose-sm max-w-none space-y-8 text-textPrimary">
          {children}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="font-serif text-xl text-textPrimary mb-3">{title}</h2>
      <div className="text-textSecondary leading-relaxed space-y-2 [&_ul]:list-disc [&_ul]:ps-5 [&_ul]:space-y-1">
        {children}
      </div>
    </div>
  );
}
