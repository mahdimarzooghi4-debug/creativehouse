import { CmsShell } from "../../../components/cms-shell";
import { contentStatusLabels, formatPersianDate, programTypeLabels, toPersianDigits } from "../../../lib/content-utils";
import { db } from "../../../lib/db";

export const dynamic = "force-dynamic";

type AdminProgramsPageProps = {
  searchParams: Promise<{ notice?: string; q?: string; status?: string }>;
};

const noticeMessages: Record<string, string> = {
  "draft-saved": "پیش‌نویس برنامه ذخیره شد.",
  published: "برنامه با موفقیت ذخیره و منتشر شد.",
  deleted: "برنامه حذف شد.",
  "validation-error": "عنوان برنامه الزامی است و برای انتشار باید معرفی برنامه هم تکمیل شود.",
  "unsupported-image": "فرمت تصویر پشتیبانی نمی‌شود.",
  "image-too-large": "حجم تصویر بیشتر از حد مجاز است.",
  "invalid-image": "فایل تصویر معتبر نیست.",
  "save-error": "ذخیره برنامه انجام نشد.",
  "not-found": "برنامه موردنظر پیدا نشد.",
};

export default async function AdminProgramsPage({ searchParams }: AdminProgramsPageProps) {
  const { notice, q = "", status = "all" } = await searchParams;
  const cleanQuery = q.trim();
  const where = {
    deletedAt: null,
    ...(cleanQuery ? { title: { contains: cleanQuery } } : {}),
    ...(status !== "all" ? { status } : {}),
  };

  const [programs, total, published, active, scheduled] = await Promise.all([
    db.program.findMany({ where, orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { updatedAt: "desc" }] }),
    db.program.count({ where: { deletedAt: null } }),
    db.program.count({ where: { deletedAt: null, status: "published" } }),
    db.program.count({ where: { deletedAt: null, status: "active" } }),
    db.program.count({ where: { deletedAt: null, status: "scheduled" } }),
  ]);

  const programStats = [
    ["کل برنامه‌ها", toPersianDigits(total), `${toPersianDigits(published + active)} منتشرشده`],
    ["فعال", toPersianDigits(active), "در حال اجرا"],
    ["زمان‌بندی‌شده", toPersianDigits(scheduled), "انتشار آینده"],
  ] as const;

  return (
    <CmsShell active="programs">
      <div className="cms-dashboard cms-programs-page">
        <header className="cms-page-header">
          <div>
            <h1>مدیریت برنامه‌ها</h1>
            <p>برنامه‌های خانه خلاق، رویداد آینه و مسیرهای رشد را مدیریت کن</p>
          </div>
          <div className="cms-program-header-actions">
            <a className="cms-outline-button cms-view-site" href="/programs">مشاهده سایت</a>
            <a className="cms-program-dark-button cms-add-program" href="/admin/programs/new">افزودن برنامه</a>
          </div>
        </header>

        {notice && noticeMessages[notice] ? <p className="cms-flow-notice" role="status">{noticeMessages[notice]}</p> : null}

        <section className="cms-program-stat-grid" aria-label="آمار برنامه‌ها">
          {programStats.map(([label, value, note]) => (
            <article className="cms-program-stat" key={label}>
              <span>{label}</span><strong>{value}</strong><small>{note}</small>
            </article>
          ))}
        </section>

        <form className="cms-program-filter-bar" action="/admin/programs" method="get">
          <label className="cms-program-search-field">
            <span className="cms-program-sr-only">جست‌وجو در برنامه‌ها</span>
            <input type="search" name="q" defaultValue={cleanQuery} placeholder="جست‌وجو در برنامه‌ها" />
          </label>
          <label className="cms-program-filter-field">
            <span className="cms-program-sr-only">فیلتر وضعیت</span>
            <select name="status" defaultValue={status}>
              <option value="all">همه وضعیت‌ها</option>
              <option value="active">فعال</option>
              <option value="published">منتشرشده</option>
              <option value="draft">پیش‌نویس</option>
              <option value="scheduled">زمان‌بندی</option>
            </select>
          </label>
          <button className="cms-outline-button cms-program-search-button" type="submit">جست‌وجو</button>
        </form>

        <section className="cms-programs-table-card" aria-label="فهرست برنامه‌ها">
          <div className="cms-programs-table" role="table">
            <div className="cms-programs-row cms-programs-row--head" role="row">
              <span>عنوان برنامه</span><span>نوع</span><span>بازه</span><span>وضعیت</span><span>آخرین تغییر</span>
            </div>
            {programs.map((program, index) => (
              <a className={`cms-programs-row${index % 2 ? " is-alt" : ""}`} role="row" href={`/admin/programs/${program.slug}`} key={program.id}>
                <strong>{program.title}</strong>
                <span>{programTypeLabels[program.type] || program.type}</span>
                <span>{toPersianDigits(program.duration || "—")}</span>
                <span><i className={`cms-program-status cms-program-status--${program.status}`}>{contentStatusLabels[program.status] || program.status}</i></span>
                <span>{formatPersianDate(program.updatedAt)}</span>
              </a>
            ))}
            {programs.length === 0 ? <p className="cms-flow-notice">برنامه‌ای با این فیلتر پیدا نشد.</p> : null}
          </div>
        </section>
      </div>
    </CmsShell>
  );
}
