import { CmsShell } from "../../../components/cms-shell";

const newsStats = [
  ["کل خبرها", "۱۸", "۱۴ منتشرشده"],
  ["پیش‌نویس", "۴", "نیازمند بازبینی"],
  ["خبر منتخب", "۱", "نمایش در بالای صفحه"],
] as const;

const newsItems = [
  ["selected-teams-gathering", "نخستین گردهمایی تیم‌های منتخب", "گزارش", "منتشرشده", "published", "امروز", "۳۲۸"],
  ["autumn-growth-call", "آغاز فراخوان برنامه رشد پاییز", "فراخوان", "زمان‌بندی", "scheduled", "فردا", "—"],
  ["mentoring-stage", "سه تیم وارد مرحله منتورینگ شدند", "خبر", "منتشرشده", "published", "دیروز", "۲۴۱"],
  ["problem-workshop-day", "یک روز از کارگاه مسئله‌محور", "گزارش", "پیش‌نویس", "draft", "—", "—"],
  ["new-partner", "همراه جدید خانه خلاق معرفی شد", "همکاری", "بازبینی", "review", "—", "—"],
] as const;

export default function AdminNewsPage() {
  return (
    <CmsShell active="news">
      <div className="cms-dashboard cms-news-page">
        <header className="cms-page-header">
          <div>
            <h1>مدیریت اخبار و رسانه</h1>
            <p>خبرها، گزارش‌ها و محتوای رسانه‌ای سایت را منتشر و زمان‌بندی کن</p>
          </div>
          <div className="cms-news-header-actions">
            <a className="cms-outline-button cms-view-site" href="/">مشاهده سایت</a>
            <a className="cms-news-dark-button cms-add-news" href="/admin/news/new">ثبت خبر جدید</a>
          </div>
        </header>

        <section className="cms-news-stat-grid" aria-label="آمار اخبار">
          {newsStats.map(([label, value, note]) => (
            <article className="cms-news-stat" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{note}</small>
            </article>
          ))}
        </section>

        <form className="cms-news-filter-bar" action="/admin/news" method="get">
          <label className="cms-news-search-field">
            <span className="cms-news-sr-only">جست‌وجو در عنوان خبر</span>
            <input type="search" name="q" placeholder="جست‌وجو در عنوان خبر" />
          </label>
          <label className="cms-news-filter-field">
            <span className="cms-news-sr-only">فیلتر دسته‌بندی</span>
            <select name="category" defaultValue="all">
              <option value="all">همه دسته‌بندی‌ها</option>
              <option value="news">خبر</option>
              <option value="report">گزارش</option>
              <option value="call">فراخوان</option>
              <option value="collaboration">همکاری</option>
            </select>
          </label>
          <button className="cms-outline-button cms-news-search-button" type="submit">جست‌وجو</button>
        </form>

        <section className="cms-news-table-card" aria-label="فهرست اخبار">
          <div className="cms-news-table" role="table">
            <div className="cms-news-row cms-news-row--head" role="row">
              <span>عنوان خبر</span>
              <span>دسته</span>
              <span>وضعیت</span>
              <span>تاریخ انتشار</span>
              <span>بازدید</span>
            </div>
            {newsItems.map(([slug, title, category, status, tone, publishedAt, views], index) => (
              <a className={`cms-news-row${index % 2 ? " is-alt" : ""}`} role="row" href={`/admin/news/${slug}`} key={slug}>
                <strong>{title}</strong>
                <span>{category}</span>
                <span><i className={`cms-news-status cms-news-status--${tone}`}>{status}</i></span>
                <span>{publishedAt}</span>
                <span>{views}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </CmsShell>
  );
}
