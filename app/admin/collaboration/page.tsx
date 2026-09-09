import { CmsShell } from "../../../components/cms-shell";

const collaborationStats = [
  ["کل درخواست‌ها", "۲۷", "از ابتدای دوره"],
  ["جدید", "۶", "نیازمند بررسی"],
  ["در حال پیگیری", "۹", "در جریان"],
] as const;

const collaborationRequests = [
  ["sara-ahmadi", "سارا احمدی", "منتور", "۰۹۱۲ *** ۴۵۶۷", "جدید", "new", "امروز"],
  ["team-ariana", "تیم آریانا", "استقرار", "۰۹۳۵ *** ۷۸۹۰", "در حال پیگیری", "following", "امروز"],
  ["novafarin", "شرکت نوآفرین", "همکاری سازمانی", "۰۹۱۰ *** ۲۳۴۵", "تماس گرفته شد", "contacted", "دیروز"],
  ["mohammad-karimi", "محمد کریمی", "استارتاپ", "۰۹۱۹ *** ۳۴۱۲", "بسته شد", "closed", "۲ روز قبل"],
  ["narges-mousavi", "نرگس موسوی", "منتور", "۰۹۹۰ *** ۱۱۲۲", "جدید", "new", "۳ روز قبل"],
] as const;

export default function AdminCollaborationPage() {
  return (
    <CmsShell active="collaboration">
      <div className="cms-dashboard cms-collaboration-page">
        <header className="cms-page-header">
          <div>
            <h1>درخواست‌های همکاری</h1>
            <p>درخواست‌های استارتاپ‌ها، منتورها، سازمان‌ها و حامیان را پیگیری کن</p>
          </div>
          <a className="cms-outline-button cms-view-site" href="/">مشاهده سایت</a>
        </header>

        <section className="cms-collaboration-stat-grid" aria-label="آمار درخواست‌های همکاری">
          {collaborationStats.map(([label, value, note]) => (
            <article className="cms-collaboration-stat" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{note}</small>
            </article>
          ))}
        </section>

        <form className="cms-collaboration-filter-bar" action="/admin/collaboration" method="get">
          <label className="cms-collaboration-search-field">
            <span className="cms-collaboration-sr-only">جست‌وجو با نام یا شماره تماس</span>
            <input type="search" name="q" placeholder="جست‌وجو با نام یا شماره تماس" />
          </label>
          <label className="cms-collaboration-filter-field">
            <span className="cms-collaboration-sr-only">نوع همکاری</span>
            <select name="type" defaultValue="all">
              <option value="all">همه نوع‌های همکاری</option>
              <option value="startup">استارتاپ</option>
              <option value="mentor">منتور</option>
              <option value="residency">استقرار</option>
              <option value="organization">همکاری سازمانی</option>
            </select>
          </label>
          <button className="cms-outline-button cms-collaboration-search-button" type="submit">جست‌وجو</button>
        </form>

        <section className="cms-collaboration-table-card" aria-label="فهرست درخواست‌های همکاری">
          <div className="cms-collaboration-table" role="table">
            <div className="cms-collaboration-row cms-collaboration-row--head" role="row">
              <span>نام / مجموعه</span>
              <span>نوع همکاری</span>
              <span>شماره تماس</span>
              <span>وضعیت</span>
              <span>تاریخ</span>
            </div>
            {collaborationRequests.map(([id, name, type, phone, status, tone, date], index) => (
              <a
                className={`cms-collaboration-row${index % 2 ? " is-alt" : ""}`}
                href={`/admin/collaboration/${id}`}
                role="row"
                key={id}
              >
                <strong>{name}</strong>
                <span>{type}</span>
                <span className="cms-collaboration-phone">{phone}</span>
                <span><i className={`cms-collaboration-status cms-collaboration-status--${tone}`}>{status}</i></span>
                <span>{date}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </CmsShell>
  );
}
