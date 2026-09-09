import { CmsShell } from "../../../components/cms-shell";

const programStats = [
  ["کل برنامه‌ها", "۶", "۴ منتشرشده"],
  ["فعال", "۲", "در حال اجرا"],
  ["زمان‌بندی‌شده", "۱", "انتشار آینده"],
] as const;

const programs = [
  ["ayene-event", "رویداد ملی خلاقیت و نوآوری آینه", "رویداد", "پاییز ۱۴۰۵", "فعال", "active", "امروز"],
  ["growth-acceleration", "برنامه رشد و شتابدهی", "شتابدهی", "۳ ماه", "منتشرشده", "published", "دیروز"],
  ["problem-workshop", "کارگاه مسئله‌محور", "کارگاه", "۲ روز", "پیش‌نویس", "draft", "۲ روز قبل"],
  ["investment-session", "نشست سرمایه‌گذاری", "نشست", "آبان ۱۴۰۵", "زمان‌بندی", "scheduled", "۳ روز قبل"],
  ["expert-mentoring", "مسیر منتورینگ تخصصی", "منتورینگ", "۶ هفته", "منتشرشده", "published", "۴ روز قبل"],
] as const;

type AdminProgramsPageProps = {
  searchParams: Promise<{ notice?: string }>;
};

function getNoticeText(notice?: string) {
  if (notice === "draft-saved") return "پیش‌نویس برنامه ذخیره شد.";
  if (notice === "published") return "برنامه برای انتشار ثبت شد.";
  return null;
}

export default async function AdminProgramsPage({ searchParams }: AdminProgramsPageProps) {
  const { notice } = await searchParams;
  const noticeText = getNoticeText(notice);

  return (
    <CmsShell active="programs">
      <div className="cms-dashboard cms-programs-page">
        <header className="cms-page-header">
          <div>
            <h1>مدیریت برنامه‌ها</h1>
            <p>برنامه‌های خانه خلاق، رویداد آینه و مسیرهای رشد را مدیریت کن</p>
          </div>
          <div className="cms-program-header-actions">
            <a className="cms-outline-button cms-view-site" href="/">مشاهده سایت</a>
            <a className="cms-program-dark-button cms-add-program" href="/admin/programs/new">افزودن برنامه</a>
          </div>
        </header>

        {noticeText ? <p className="cms-flow-notice" role="status">{noticeText}</p> : null}

        <section className="cms-program-stat-grid" aria-label="آمار برنامه‌ها">
          {programStats.map(([label, value, note]) => (
            <article className="cms-program-stat" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{note}</small>
            </article>
          ))}
        </section>

        <form className="cms-program-filter-bar" action="/admin/programs" method="get">
          <label className="cms-program-search-field">
            <span className="cms-program-sr-only">جست‌وجو در برنامه‌ها</span>
            <input type="search" name="q" placeholder="جست‌وجو در برنامه‌ها" />
          </label>
          <label className="cms-program-filter-field">
            <span className="cms-program-sr-only">فیلتر وضعیت</span>
            <select name="status" defaultValue="all">
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
              <span>عنوان برنامه</span>
              <span>نوع</span>
              <span>بازه</span>
              <span>وضعیت</span>
              <span>آخرین تغییر</span>
            </div>
            {programs.map(([slug, title, type, period, status, tone, changed], index) => (
              <a className={`cms-programs-row${index % 2 ? " is-alt" : ""}`} role="row" href={`/admin/programs/${slug}`} key={slug}>
                <strong>{title}</strong>
                <span>{type}</span>
                <span>{period}</span>
                <span><i className={`cms-program-status cms-program-status--${tone}`}>{status}</i></span>
                <span>{changed}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </CmsShell>
  );
}
