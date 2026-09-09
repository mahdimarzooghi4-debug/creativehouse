import { CmsShell } from "../../../components/cms-shell";

const stats = [
  ["کل محتوا", "۳۶", "استارتاپ، برنامه و خبر"],
  ["منتشرشده", "۲۸", "قابل مشاهده در سایت"],
  ["پیش‌نویس", "۷", "نیازمند تکمیل"],
  ["زمان‌بندی‌شده", "۱", "انتشار خودکار"],
] as const;

const contentItems = [
  ["رویداد ملی خلاقیت و نوآوری آینه", "برنامه", "منتشرشده", "امروز", "published", "/admin/programs"],
  ["راهکار نو برای بازار محلی", "استارتاپ", "پیش‌نویس", "امروز", "draft", "/admin/startups"],
  ["گزارش گردهمایی تیم‌های منتخب", "خبر", "منتشرشده", "دیروز", "published", "/admin/news"],
  ["مرکز نوآوری آفتاب", "استارتاپ", "منتشرشده", "۲ روز قبل", "published", "/admin/startups"],
  ["فراخوان برنامه رشد پاییز", "برنامه", "زمان‌بندی‌شده", "۳ روز قبل", "scheduled", "/admin/programs"],
  ["کارگاه طراحی تجربه کاربر", "خبر", "پیش‌نویس", "۴ روز قبل", "draft", "/admin/news"],
] as const;

export default function AdminContentPage() {
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
            {contentItems.map(([title, type, status, changed, tone, href], index) => (
              <div className={`cms-content-row${index % 2 ? " is-alt" : ""}`} role="row" key={title}>
                <strong>{title}</strong>
                <span>{type}</span>
                <span><i className={`cms-status cms-status--${tone}`}>{status}</i></span>
                <span>{changed}</span>
                <a href={href}>باز کردن</a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </CmsShell>
  );
}
