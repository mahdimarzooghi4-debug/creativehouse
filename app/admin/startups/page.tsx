import { CmsShell } from "../../../components/cms-shell";

const startupStats = [
  ["کل استارتاپ‌ها", "۱۲", "۹ منتشرشده"],
  ["پیش‌نویس", "۳", "نیازمند تکمیل"],
  ["منتخب صفحه اصلی", "۴", "قابل جابه‌جایی"],
] as const;

const startups = [
  ["aftab", "مرکز نوآوری آفتاب", "فناوری فرهنگی", "رشد", "منتشرشده", "published", "امروز"],
  ["mana", "زیست‌بوم مانا", "صنایع خلاق", "اعتبارسنجی", "پیش‌نویس", "draft", "امروز"],
  ["local-market", "راهکار بازار محلی", "تجارت اجتماعی", "نمونه اولیه", "منتشرشده", "published", "دیروز"],
  ["sepehr", "استودیو سپهر", "محتوای دیجیتال", "رشد", "منتخب", "featured", "۲ روز قبل"],
  ["boom", "نوآوران بوم", "طراحی و محصول", "ایده", "بازبینی", "review", "۳ روز قبل"],
] as const;

export default function AdminStartupsPage() {
  return (
    <CmsShell active="startups">
      <div className="cms-dashboard cms-startups-page">
        <header className="cms-page-header">
          <div>
            <h1>مدیریت استارتاپ‌ها</h1>
            <p>افزودن، ویرایش، انتشار و مرتب‌سازی پروفایل استارتاپ‌ها</p>
          </div>
          <div className="cms-page-header__actions">
            <a className="cms-outline-button cms-view-site" href="/">مشاهده سایت</a>
            <a className="cms-dark-button cms-add-startup" href="/admin/startups/new">افزودن استارتاپ</a>
          </div>
        </header>

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
            <input type="search" name="q" placeholder="جست‌وجو با نام استارتاپ" />
          </label>
          <label className="cms-filter-field">
            <span className="sr-only">فیلتر وضعیت</span>
            <select name="status" defaultValue="all">
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
            {startups.map(([slug, name, field, stage, status, tone, changed], index) => (
              <a className={`cms-startups-row${index % 2 ? " is-alt" : ""}`} role="row" href={`/admin/startups/${slug}`} key={slug}>
                <strong>{name}</strong>
                <span>{field}</span>
                <span>{stage}</span>
                <span><i className={`cms-startup-status cms-startup-status--${tone}`}>{status}</i></span>
                <span>{changed}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </CmsShell>
  );
}
