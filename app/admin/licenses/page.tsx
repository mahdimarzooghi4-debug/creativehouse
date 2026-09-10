import { CmsShell } from "../../../components/cms-shell";
import { toPersianDigits } from "../../../lib/content-utils";
import { db } from "../../../lib/db";

export const dynamic = "force-dynamic";

const resultMessages: Record<string, string> = {
  saved: "اطلاعات مجوز به‌صورت پیش‌نویس ذخیره شد.",
  published: "مجوز برای نمایش عمومی منتشر شد.",
  deleted: "مجوز حذف شد.",
  "validation-error": "عنوان سند الزامی است و برای انتشار باید مرجع صادرکننده تکمیل شود.",
  "document-required": "برای انتشار مجوز باید فایل واقعی سند بارگذاری شود.",
  "unsupported-document": "فرمت فایل سند پشتیبانی نمی‌شود.",
  "document-too-large": "حجم فایل سند بیشتر از حد مجاز است.",
  "invalid-document": "فایل PDF معتبر نیست.",
  "invalid-image": "فایل تصویر معتبر نیست.",
  "save-error": "ذخیره مجوز انجام نشد.",
  "not-found": "مجوز موردنظر پیدا نشد.",
};

export default async function AdminLicensesPage({ searchParams }: { searchParams: Promise<{ result?: string }> }) {
  const { result } = await searchParams;
  const feedback = result ? resultMessages[result] : undefined;
  const [licenses, total, published, draft] = await Promise.all([
    db.license.findMany({ where: { deletedAt: null }, orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }] }),
    db.license.count({ where: { deletedAt: null } }),
    db.license.count({ where: { deletedAt: null, status: "published" } }),
    db.license.count({ where: { deletedAt: null, status: "draft" } }),
  ]);
  const licenseStats = [
    ["کل اسناد", toPersianDigits(total), `${toPersianDigits(published)} منتشرشده`],
    ["پیش‌نویس", toPersianDigits(draft), "در انتظار تکمیل"],
    ["جایگاه آماده", toPersianDigits(Math.max(0, 9 - total)), "قابل افزایش"],
  ] as const;

  return (
    <CmsShell active="licenses">
      <div className="cms-dashboard cms-licenses-page">
        <header className="cms-page-header">
          <div><h1>مدیریت مجوزها و تأییدیه‌ها</h1><p>اسناد واقعی را بارگذاری و وضعیت نمایش عمومی آن‌ها را مدیریت کن</p></div>
          <div className="cms-licenses-header-actions">
            <a className="cms-outline-button cms-view-site" href="/licenses">مشاهده سایت</a>
            <a className="cms-licenses-dark-button cms-add-license" href="/admin/licenses/new">افزودن مجوز</a>
          </div>
        </header>

        {feedback ? <div className="cms-secondary-feedback" role="status">{feedback}</div> : null}

        <section className="cms-licenses-stat-grid" aria-label="آمار مجوزها">
          {licenseStats.map(([label, value, note]) => <article className="cms-licenses-stat" key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}
        </section>

        <section className="cms-licenses-grid" aria-label="فهرست مجوزها و تأییدیه‌ها">
          {licenses.map((license) => (
            <article className="cms-license-card" id={`license-${license.slug}`} key={license.id}>
              <div className="cms-license-preview" aria-label={`پیش‌نمایش ${license.title}`}><span>{license.documentMediaId ? "سند بارگذاری شده" : "بدون فایل سند"}</span></div>
              <h2>{license.title}</h2>
              <p>{license.issuer || "اطلاعات تکمیل نشده"}</p>
              <div className="cms-license-card-footer">
                <span className={`cms-license-status cms-license-status--${license.status === "published" ? "published" : "draft"}`}>{license.status === "published" ? "منتشرشده" : "پیش‌نویس"}</span>
                <a className="cms-license-action" href={`/admin/licenses/${license.slug}`}>ویرایش</a>
              </div>
            </article>
          ))}
        </section>

        <aside className="cms-license-note" aria-label="یادآوری انتشار اسناد">فقط اسناد و مجوزهای واقعی منتشر می‌شوند؛ انتشار بدون فایل سند از سمت سرور مسدود شده است.</aside>
      </div>
    </CmsShell>
  );
}
