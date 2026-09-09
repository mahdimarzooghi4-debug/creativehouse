import { SiteFooter, SiteHeader } from "../../components/site-chrome";
import { formatPersianDate } from "../../lib/content-utils";
import { db } from "../../lib/db";

export const dynamic = "force-dynamic";

const verification = [
  ["ثبت اطلاعات سند", "تصویر یا PDF، تاریخ و مرجع صادرکننده در پرونده سند ثبت می‌شود."],
  ["بررسی و تأیید", "اطلاعات سند پیش از انتشار با نسخه رسمی تطبیق داده می‌شود."],
  ["انتشار و به‌روزرسانی", "نسخه تأییدشده منتشر می‌شود و در صورت تمدید یا تغییر، به‌روزرسانی خواهد شد."],
];

function DocumentPreview() {
  return <div className="document-preview" aria-hidden="true"><span className="document-preview__paper" /><span className="document-preview__seal" /></div>;
}

export default async function LicensesPage() {
  const documents = await db.license.findMany({
    where: { deletedAt: null, status: "published", documentMediaId: { not: null } },
    orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
  });
  const mediaIds = documents.map((document) => document.documentMediaId).filter((id): id is string => Boolean(id));
  const media = mediaIds.length ? await db.media.findMany({ where: { id: { in: mediaIds } } }) : [];
  const mediaById = new Map(media.map((item) => [item.id, item]));

  return (
    <div className="public-page">
      <SiteHeader />
      <main className="public-page__main">
        <section className="licenses-hero"><div className="shell"><p className="eyebrow">اسناد و اعتبارها</p><h1>مجوزها و تأییدیه‌های خانه خلاق</h1><p>برای شفافیت و دسترسی بهتر، مجوزها، تأییدیه‌ها و اسناد رسمی خانه خلاق آینه در این بخش منتشر می‌شوند.</p><span className="licenses-badge">اسناد رسمی و قابل استعلام</span></div></section>

        <section className="documents-section">
          <div className="shell">
            <div className="section-intro"><p className="eyebrow">مجوزها و تأییدیه‌ها</p><h2>اسناد رسمی در یک نگاه</h2><p>فقط اسنادی که فایل واقعی آن‌ها در پنل مدیریت بارگذاری و منتشر شده باشد در این صفحه دیده می‌شوند.</p></div>
            <div className="documents-grid">
              {documents.map((document) => {
                const file = document.documentMediaId ? mediaById.get(document.documentMediaId) : undefined;
                return (
                  <article className="document-card" key={document.id}>
                    <DocumentPreview />
                    <h3>{document.title}</h3>
                    <p>{document.description || `${document.issuer || "مرجع صادرکننده"}${document.issuedAt ? ` • ${formatPersianDate(document.issuedAt)}` : ""}`}</p>
                    {file ? <a href={`/uploads/${file.storageKey}`} target="_blank" rel="noreferrer">مشاهده سند ←</a> : null}
                  </article>
                );
              })}
            </div>
            {documents.length === 0 ? <p>در حال حاضر سند عمومی تأییدشده‌ای برای نمایش ثبت نشده است.</p> : null}
          </div>
        </section>

        <section className="verification-section"><div className="shell"><div className="section-intro section-intro--compact"><p className="eyebrow">شفافیت و استعلام</p><h2>سازوکار انتشار و به‌روزرسانی اسناد</h2></div><div className="verification-grid">{verification.map(([title, text], index) => <article className="verification-card" key={title}><span>{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

        <section className="licenses-inquiry"><div className="shell"><div className="section-intro section-intro--compact"><p className="eyebrow">استعلام و دسترسی</p><h2>برای دریافت یا بررسی نسخه رسمی سند</h2></div><div className="inquiry-grid"><article className="inquiry-card"><h3>ارتباط با خانه خلاق</h3><p>info@ayenehouse.ir<br />۰۲۱-۶۶۴۸۵۳۷۴ &nbsp; | &nbsp; ۰۲۱-۶۶۴۰۶۴۷۵</p></article><article className="inquiry-card"><h3>یادداشت</h3><p>هیچ مجوز یا شماره سند فرضی در سایت عمومی منتشر نمی‌شود؛ فقط فایل‌های واقعی تأییدشده از پنل مدیریت قابل مشاهده‌اند.</p></article></div></div></section>
      </main>
      <SiteFooter />
    </div>
  );
}
