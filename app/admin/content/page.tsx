import { CmsShell } from "../../../components/cms-shell";
import { contentStatusLabels, formatPersianDate } from "../../../lib/content-utils";
import { db } from "../../../lib/db";

export const dynamic = "force-dynamic";

function statusTone(status: string) {
  if (status === "published" || status === "active") return "published";
  if (status === "scheduled") return "scheduled";
  return "draft";
}

export default async function AdminContentPage() {
  const [startups, programs, news] = await Promise.all([
    db.startup.findMany({ where: { deletedAt: null }, select: { slug: true, name: true, status: true, updatedAt: true } }),
    db.program.findMany({ where: { deletedAt: null }, select: { slug: true, title: true, status: true, updatedAt: true } }),
    db.news.findMany({ where: { deletedAt: null }, select: { slug: true, title: true, status: true, updatedAt: true } }),
  ]);

  const contentItems = [
    ...startups.map((item) => ({ title: item.name, type: "استارتاپ", status: item.status, updatedAt: item.updatedAt, href: `/admin/startups/${item.slug}` })),
    ...programs.map((item) => ({ title: item.title, type: "برنامه", status: item.status, updatedAt: item.updatedAt, href: `/admin/programs/${item.slug}` })),
    ...news.map((item) => ({ title: item.title, type: "خبر", status: item.status, updatedAt: item.updatedAt, href: `/admin/news/${item.slug}` })),
  ].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

  const total = contentItems.length;
  const published = contentItems.filter((item) => item.status === "published" || item.status === "active").length;
  const drafts = contentItems.filter((item) => item.status === "draft" || item.status === "review").length;
  const scheduled = contentItems.filter((item) => item.status === "scheduled").length;

  const stats = [
    ["کل محتوا", total.toLocaleString("fa-IR"), "استارتاپ، برنامه و خبر"],
    ["منتشرشده", published.toLocaleString("fa-IR"), "قابل مشاهده در سایت"],
    ["پیش‌نویس", drafts.toLocaleString("fa-IR"), "نیازمند تکمیل یا بازبینی"],
    ["زمان‌بندی‌شده", scheduled.toLocaleString("fa-IR"), "انتشار خودکار"],
  ] as const;

  return (
    <CmsShell active="dashboard">
      <div className="cms-dashboard cms-content-page">
        <header className="cms-page-header">
          <div>
            <h1>همه محتواها</h1>
            <p>استارتاپ‌ها، برنامه‌ها و اخبار را در یک نمای واحد مرور و برای ویرایش باز کن.</p>
          </div>
          <a className="cms-outline-button cms-view-site" href="/">مشاهده سایت</a>
        </header>

        <section className="cms-stat-grid" aria-label="آمار محتوا">
          {stats.map(([label, value, note]) => (
            <article className="cms-stat" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{note}</small>
            </article>
          ))}
        </section>

        <nav className="cms-content-shortcuts" aria-label="مدیریت انواع محتوا">
          <a className="cms-primary-button" href="/admin/startups">مدیریت استارتاپ‌ها</a>
          <a className="cms-outline-button" href="/admin/programs">مدیریت برنامه‌ها</a>
          <a className="cms-outline-button" href="/admin/news">مدیریت اخبار</a>
        </nav>

        <section className="cms-content-card">
          <div className="cms-card-heading">
            <h2>آخرین محتواها</h2>
            <p>برای ادامه ویرایش، ردیف موردنظر را باز کن.</p>
          </div>

          <div className="cms-content-table" role="table" aria-label="همه محتواها">
            <div className="cms-content-row cms-content-head" role="row">
              <span>عنوان</span><span>نوع</span><span>وضعیت</span><span>آخرین تغییر</span><span>عملیات</span>
            </div>
            {contentItems.map((item, index) => (
              <div className={`cms-content-row${index % 2 ? " is-alt" : ""}`} role="row" key={`${item.type}-${item.href}`}>
                <strong>{item.title}</strong>
                <span>{item.type}</span>
                <span><i className={`cms-status cms-status--${statusTone(item.status)}`}>{contentStatusLabels[item.status] || item.status}</i></span>
                <span>{formatPersianDate(item.updatedAt)}</span>
                <a href={item.href}>باز کردن</a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </CmsShell>
  );
}
