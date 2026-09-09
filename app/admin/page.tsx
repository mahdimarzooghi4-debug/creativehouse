import { CmsShell } from "../../components/cms-shell";
import { collaborationTypeLabels } from "../../lib/collaboration-utils";
import { contentStatusLabels, formatPersianDate } from "../../lib/content-utils";
import { db } from "../../lib/db";

export const dynamic = "force-dynamic";

function statusTone(status: string) {
  if (status === "published" || status === "active") return "published";
  if (status === "scheduled") return "scheduled";
  return "draft";
}

export default async function AdminDashboardPage() {
  const [
    startupTotal,
    startupPublished,
    programTotal,
    programActive,
    newsTotal,
    newsDraft,
    collaborationTotal,
    collaborationNew,
    latestStartups,
    latestPrograms,
    latestNews,
    latestRequests,
  ] = await Promise.all([
    db.startup.count({ where: { deletedAt: null } }),
    db.startup.count({ where: { deletedAt: null, status: "published" } }),
    db.program.count({ where: { deletedAt: null } }),
    db.program.count({ where: { deletedAt: null, status: "active" } }),
    db.news.count({ where: { deletedAt: null } }),
    db.news.count({ where: { deletedAt: null, status: "draft" } }),
    db.collaborationRequest.count(),
    db.collaborationRequest.count({ where: { status: "new" } }),
    db.startup.findMany({ where: { deletedAt: null }, orderBy: { updatedAt: "desc" }, take: 5, select: { slug: true, name: true, status: true, updatedAt: true } }),
    db.program.findMany({ where: { deletedAt: null }, orderBy: { updatedAt: "desc" }, take: 5, select: { slug: true, title: true, status: true, updatedAt: true } }),
    db.news.findMany({ where: { deletedAt: null }, orderBy: { updatedAt: "desc" }, take: 5, select: { slug: true, title: true, status: true, updatedAt: true } }),
    db.collaborationRequest.findMany({ orderBy: { createdAt: "desc" }, take: 3, select: { id: true, name: true, organization: true, type: true, subject: true, createdAt: true } }),
  ]);

  const stats = [
    ["استارتاپ‌ها", startupTotal.toLocaleString("fa-IR"), `${(startupTotal - startupPublished).toLocaleString("fa-IR")} منتشرنشده`, ""],
    ["برنامه‌ها", programTotal.toLocaleString("fa-IR"), `${programActive.toLocaleString("fa-IR")} فعال`, ""],
    ["اخبار", newsTotal.toLocaleString("fa-IR"), `${newsDraft.toLocaleString("fa-IR")} پیش‌نویس`, ""],
    ["درخواست همکاری", collaborationTotal.toLocaleString("fa-IR"), `${collaborationNew.toLocaleString("fa-IR")} جدید`, "accent"],
  ] as const;

  const recentContent = [
    ...latestStartups.map((item) => ({ title: item.name, type: "استارتاپ", status: item.status, updatedAt: item.updatedAt, href: `/admin/startups/${item.slug}` })),
    ...latestPrograms.map((item) => ({ title: item.title, type: "برنامه", status: item.status, updatedAt: item.updatedAt, href: `/admin/programs/${item.slug}` })),
    ...latestNews.map((item) => ({ title: item.title, type: "خبر", status: item.status, updatedAt: item.updatedAt, href: `/admin/news/${item.slug}` })),
  ].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()).slice(0, 5);

  const lastContentUpdate = recentContent[0]?.updatedAt;
  const lastRequestUpdate = latestRequests[0]?.createdAt;
  const latestSync = [lastContentUpdate, lastRequestUpdate].filter((value): value is Date => Boolean(value)).sort((a, b) => b.getTime() - a.getTime())[0];

  return (
    <CmsShell active="dashboard">
      <div className="cms-dashboard">
        <header className="cms-page-header">
          <div>
            <h1>مدیریت محتوای خانه خلاق و نوآوری آینه</h1>
            <p>محتوا، استارتاپ‌ها، برنامه‌ها، اخبار و اطلاعات سایت را از اینجا مدیریت کن.</p>
          </div>
          <a className="cms-outline-button cms-view-site" href="/">مشاهده سایت</a>
        </header>

        <section className="cms-stat-grid" aria-label="آمار کلی">
          {stats.map(([label, value, note, tone]) => (
            <article className="cms-stat" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small className={tone === "accent" ? "is-accent" : undefined}>{note}</small>
            </article>
          ))}
        </section>

        <section className="cms-quick-actions">
          <h2>افزودن سریع محتوا</h2>
          <div>
            <a className="cms-primary-button" href="/admin/startups/new">افزودن استارتاپ</a>
            <a className="cms-outline-button" href="/admin/programs/new">افزودن برنامه</a>
            <a className="cms-outline-button" href="/admin/news/new">ثبت خبر جدید</a>
            <a className="cms-outline-button" href="/admin/partners">مدیریت همراهان</a>
          </div>
        </section>

        <div className="cms-dashboard-grid">
          <section className="cms-recent-card">
            <div className="cms-card-heading">
              <h2>آخرین محتواها</h2>
              <p>مرور آخرین تغییرات و وضعیت انتشار</p>
            </div>
            <div className="cms-table" role="table" aria-label="آخرین محتواها">
              <div className="cms-table__row cms-table__head" role="row">
                <span>عنوان</span><span>نوع</span><span>وضعیت</span><span>آخرین تغییر</span>
              </div>
              {recentContent.map((item, index) => (
                <a className={`cms-table__row${index % 2 ? " is-alt" : ""}`} role="row" key={`${item.type}-${item.href}`} href={item.href}>
                  <strong>{item.title}</strong>
                  <span>{item.type}</span>
                  <span><i className={`cms-status cms-status--${statusTone(item.status)}`}>{contentStatusLabels[item.status] || item.status}</i></span>
                  <span>{formatPersianDate(item.updatedAt)}</span>
                </a>
              ))}
            </div>
            <a className="cms-outline-button cms-all-content" href="/admin/content">مشاهده همه محتواها</a>
          </section>

          <div className="cms-dashboard-side">
            <section className="cms-side-card cms-home-card">
              <h2>مدیریت صفحه اصلی</h2>
              <p>تصویر هیرو، متن معرفی، آمارها و بخش همراهان</p>
              <div className="cms-home-links">
                <a href="/admin/homepage#hero"><span>تصویر هیرو</span><b>ویرایش</b></a>
                <a href="/admin/homepage#stats"><span>آمار صفحه</span><b>ویرایش</b></a>
                <a href="/admin/partners"><span>همراهان</span><b>مدیریت</b></a>
              </div>
            </section>

            <section className="cms-side-card cms-collab-card">
              <div className="cms-collab-heading">
                <h2>درخواست‌های همکاری</h2>
                <span>{collaborationNew.toLocaleString("fa-IR")} جدید</span>
              </div>
              <div className="cms-collab-list">
                {latestRequests.length ? latestRequests.map((request) => (
                  <a href={`/admin/collaboration/${request.id}`} key={request.id}>
                    <strong>{request.organization || request.name}</strong>
                    <small>{request.subject || collaborationTypeLabels[request.type] || request.type}</small>
                  </a>
                )) : <a href="/admin/collaboration"><strong>درخواستی ثبت نشده است</strong><small>فرم همکاری آماده دریافت درخواست است.</small></a>}
              </div>
            </section>
          </div>
        </div>

        <footer className="cms-dashboard-footer">
          <span>نسخه پنل مدیریت خانه خلاق</span>
          <span>{latestSync ? `آخرین تغییر داده: ${formatPersianDate(latestSync)}` : "داده‌ای برای نمایش وجود ندارد"}</span>
        </footer>
      </div>
    </CmsShell>
  );
}
