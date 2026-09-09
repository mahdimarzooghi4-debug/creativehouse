import { SiteFooter, SiteHeader } from "../../components/site-chrome";

const documents = Array.from({ length: 6 }, (_, index) => ({
  title: `مجوز / تأییدیه ۰${index + 1}`,
  description: "اطلاعات مرجع صادرکننده، شماره و تاریخ سند پس از تأیید نهایی در این کارت درج می‌شود.",
}));

const verification = [
  ["ثبت اطلاعات سند", "تصویر، شماره، تاریخ و مرجع صادرکننده در پرونده سند ثبت می‌شود."],
  ["بررسی و تأیید", "اطلاعات سند پیش از انتشار با نسخه رسمی تطبیق داده می‌شود."],
  ["انتشار و به‌روزرسانی", "نسخه تأییدشده منتشر می‌شود و در صورت تمدید یا تغییر، به‌روزرسانی خواهد شد."],
];

function DocumentPreview() {
  return (
    <div className="document-preview" aria-hidden="true">
      <span className="document-preview__paper" />
      <span className="document-preview__seal" />
    </div>
  );
}

export default function LicensesPage() {
  return (
    <div className="public-page">
      <SiteHeader />
      <main className="public-page__main">
        <section className="licenses-hero">
          <div className="shell">
            <p className="eyebrow">اسناد و اعتبارها</p>
            <h1>مجوزها و تأییدیه‌های خانه خلاق</h1>
            <p>برای شفافیت و دسترسی بهتر، مجوزها، تأییدیه‌ها و اسناد رسمی خانه خلاق آینه در این بخش منتشر می‌شوند.</p>
            <span className="licenses-badge">اسناد رسمی و قابل استعلام</span>
          </div>
        </section>

        <section className="documents-section">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">مجوزها و تأییدیه‌ها</p>
              <h2>اسناد رسمی در یک نگاه</h2>
              <p>هر کارت برای نمایش تصویر سند، مرجع صادرکننده، شماره و تاریخ آن آماده است و پس از دریافت نسخه نهایی جایگزین می‌شود.</p>
            </div>
            <div className="documents-grid">
              {documents.map((document, index) => (
                <article className="document-card" key={document.title}>
                  <DocumentPreview />
                  <h3>{document.title}</h3>
                  <p>{document.description}</p>
                  <a href={`#document-${index + 1}`}>مشاهده سند ←</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="verification-section">
          <div className="shell">
            <div className="section-intro section-intro--compact">
              <p className="eyebrow">شفافیت و استعلام</p>
              <h2>سازوکار انتشار و به‌روزرسانی اسناد</h2>
            </div>
            <div className="verification-grid">
              {verification.map(([title, text], index) => (
                <article className="verification-card" key={title}>
                  <span>{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="licenses-inquiry">
          <div className="shell">
            <div className="section-intro section-intro--compact">
              <p className="eyebrow">استعلام و دسترسی</p>
              <h2>برای دریافت یا بررسی نسخه رسمی سند</h2>
            </div>
            <div className="inquiry-grid">
              <article className="inquiry-card">
                <h3>ارتباط با خانه خلاق</h3>
                <p>info@ayenehouse.ir<br />۰۲۱-۶۶۴۸۵۳۷۴ &nbsp; | &nbsp; ۰۲۱-۶۶۴۰۶۴۷۵</p>
              </article>
              <article className="inquiry-card">
                <h3>یادداشت</h3>
                <p>تا زمان دریافت اسناد نهایی، کارت‌های بالا صرفاً جایگاه طراحی هستند و هیچ مرجع یا شماره‌ای به‌صورت فرضی درج نشده است.</p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
