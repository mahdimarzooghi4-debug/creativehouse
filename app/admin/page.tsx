import { CmsShell } from "../../components/cms-shell";

const stats = [
  ["استارتاپ‌ها", "۱۲", "۳ منتشرنشده", ""],
  ["برنامه‌ها", "۶", "۱ فعال", ""],
  ["اخبار", "۱۸", "۴ پیش‌نویس", ""],
  ["درخواست همکاری", "۹", "۳ جدید", "accent"],
] as const;

const recentContent = [
  ["رویداد ملی خلاقیت و نوآوری آینه", "برنامه", "منتشرشده", "امروز", "published"],
  ["راهکار نو برای بازار محلی", "استارتاپ", "پیش‌نویس", "امروز", "draft"],
  ["گزارش گردهمایی تیم‌های منتخب", "خبر", "منتشرشده", "دیروز", "published"],
  ["مرکز نوآوری آفتاب", "استارتاپ", "منتشرشده", "۲ روز قبل", "published"],
  ["فراخوان برنامه رشد پاییز", "برنامه", "زمان‌بندی‌شده", "۳ روز قبل", "scheduled"],
] as const;

const collaborationRequests = [
  ["سارا احمدی", "همکاری به‌عنوان منتور"],
  ["تیم آریانا", "درخواست استقرار"],
  ["شرکت نوآفرین", "پیشنهاد همکاری سازمانی"],
] as const;

export default function AdminDashboardPage() {
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
              {recentContent.map(([title, type, status, changed, statusClass], index) => (
                <div className={`cms-table__row${index % 2 ? " is-alt" : ""}`} role="row" key={title}>
                  <strong>{title}</strong>
                  <span>{type}</span>
                  <span><i className={`cms-status cms-status--${statusClass}`}>{status}</i></span>
                  <span>{changed}</span>
                </div>
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
                <span>۳ جدید</span>
              </div>
              <div className="cms-collab-list">
                {collaborationRequests.map(([name, subject]) => (
                  <a href="/admin/collaboration" key={name}>
                    <strong>{name}</strong>
                    <small>{subject}</small>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>

        <footer className="cms-dashboard-footer">
          <span>نسخه پنل مدیریت خانه خلاق</span>
          <span>آخرین همگام‌سازی: امروز، ۱۹:۲۵</span>
        </footer>
      </div>
    </CmsShell>
  );
}
