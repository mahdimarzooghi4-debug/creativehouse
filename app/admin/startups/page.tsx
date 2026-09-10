import { CmsShell } from "../../../components/cms-shell";
import { db } from "../../../lib/db";
import { contentStatusLabels, formatPersianDate, startupStageLabels, toPersianDigits } from "../../../lib/content-utils";

export const dynamic = "force-dynamic";

type AdminStartupsPageProps = {
  searchParams: Promise<{ notice?: string; q?: string; status?: string }>;
};

const noticeMessages: Record<string, string> = {
  "draft-saved": "پیش‌نویس استارتاپ ذخیره شد.",
  published: "پروفایل استارتاپ منتشر شد و در سایت عمومی قابل نمایش است.",
  deleted: "پروفایل استارتاپ حذف شد.",
  "validation-error": "نام، حوزه فعالیت و برای انتشار معرفی کوتاه الزامی است.",
  "unsupported-image": "فرمت تصویر پشتیبانی نمی‌شود. از PNG، JPG یا WebP استفاده کن.",
  "image-too-large": "حجم تصویر بیشتر از حد مجاز است.",
  "invalid-image": "فایل انتخاب‌شده تصویر معتبر نیست.",
  "save-error": "ذخیره اطلاعات انجام نشد. دوباره تلاش کن.",
  "not-found": "پروفایل موردنظر پیدا نشد.",
};

export default async function AdminStartupsPage({ searchParams }: AdminStartupsPageProps) {
  const { notice, q = "", status = "all" } = await searchParams;
  const cleanQuery = q.trim();
  const where = {
    deletedAt: null,
    ...(cleanQuery ? { name: { contains: cleanQuery } } : {}),
    ...(status === "featured" ? { featured: true } : status !== "all" ? { status } : {}),
  };

  const [startups, total, published, draft, featured] = await Promise.all([
    db.startup.findMany({ where, orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { updatedAt: "desc" }] }),
    db.startup.count({ where: { deletedAt: null } }),
    db.startup.count({ where: { deletedAt: null, status: "published" } }),
    db.startup.count({ where: { deletedAt: null, status: "draft" } }),
    db.startup.count({ where: { deletedAt: null, featured: true } }),
  ]);

  const startupStats = [
    ["کل استارتاپ‌ها", toPersianDigits(total), `${toPersianDigits(published)} منتشرشده`],
    ["پیش‌نویس", toPersianDigits(draft), "نیازمند تکمیل"],
    ["منتخب صفحه اصلی", toPersianDigits(featured), "قابل جابه‌جایی"],
  ] as const;

  return (
    <CmsShell active="startups">
      <div className="cms-dashboard cms-startups-page">
        <header className="cms-page-header">
          <div>
            <h1>مدیریت استارتاپ‌ها</h1>
            <p>افزودن، ویرایش، انتشار و مرتب‌سازی پروفایل استارتاپ‌ها</p>
          </div>
          <div className="cms-page-header__actions">
            <a className="cms-outline-button cms-view-site" href="/startups">مشاهده سایت</a>
            <a className="cms-dark-button cms-add-startup" href="/admin/startups/new">افزودن استارتاپ</a>
          </div>
        </header>

        {notice && noticeMessages[notice] ? <p className="cms-flow-notice" role="status">{noticeMessages[notice]}</p> : null}

        <section className="cms-startup-stat-grid" aria-label="آمار استارتاپ‌ها">
          {startupStats.map(([label, value, note]) => (
            <article className="cms-startup-stat" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{note}</small>
            </article>
          ))}
        </section>

        <form className="cms-filter-bar" action="/admin/startups" method="get">
          <label className="cms-search-field">
            <span className="sr-only">جست‌وجو با نام استارتاپ</span>
            <input type="search" name="q" defaultValue={cleanQuery} placeholder="جست‌وجو با نام استارتاپ" />
          </label>
          <label className="cms-filter-field">
            <span className="sr-only">فیلتر وضعیت</span>
            <select name="status" defaultValue={status}>
              <option value="all">همه وضعیت‌ها</option>
              <option value="published">منتشرشده</option>
              <option value="draft">پیش‌نویس</option>
              <option value="featured">منتخب</option>
              <option value="review">بازبینی</option>
            </select>
          </label>
          <button className="cms-outline-button cms-search-button" type="submit">جست‌وجو</button>
        </form>

        <section className="cms-startups-table-card" aria-label="فهرست استارتاپ‌ها">
          <div className="cms-startups-table" role="table">
            <div className="cms-startups-row cms-startups-row--head" role="row">
              <span>نام استارتاپ</span>
              <span>حوزه</span>
              <span>مرحله</span>
              <span>وضعیت</span>
              <span>آخرین تغییر</span>
            </div>
            {startups.map((startup, index) => {
              const isFeatured = startup.featured && startup.status === "published";
              const tone = isFeatured ? "featured" : startup.status;
              const statusLabel = isFeatured ? "منتخب" : (contentStatusLabels[startup.status] || startup.status);
              return (
                <a className={`cms-startups-row${index % 2 ? " is-alt" : ""}`} role="row" href={`/admin/startups/${startup.slug}`} key={startup.id}>
                  <strong>{startup.name}</strong>
                  <span>{startup.field}</span>
                  <span>{startupStageLabels[startup.stage] || startup.stage}</span>
                  <span><i className={`cms-startup-status cms-startup-status--${tone}`}>{statusLabel}</i></span>
                  <span>{formatPersianDate(startup.updatedAt)}</span>
                </a>
              );
            })}
            {startups.length === 0 ? <p className="cms-flow-notice">موردی با این فیلتر پیدا نشد.</p> : null}
          </div>
        </section>
      </div>
    </CmsShell>
  );
}
