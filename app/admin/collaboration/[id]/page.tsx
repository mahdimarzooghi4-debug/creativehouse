import { CmsShell } from "../../../../components/cms-shell";

const requestDetails = [
  ["نوع همکاری", "منتور"],
  ["نام", "سارا احمدی"],
  ["ایمیل", "sara@example.ir"],
  ["شماره تماس", "۰۹۱۲۱۲۳۴۵۶۷"],
  ["زمان مناسب تماس", "۹ تا ۱۲"],
  ["شهر", "تهران"],
] as const;

export default function AdminCollaborationDetailPage() {
  return (
    <CmsShell active="collaboration">
      <div className="cms-dashboard cms-collaboration-detail-page">
        <header className="cms-page-header cms-collaboration-detail-header">
          <div>
            <h1>جزئیات درخواست همکاری</h1>
            <p>اطلاعات درخواست‌دهنده و وضعیت پیگیری را ثبت و مدیریت کن</p>
          </div>
          <a className="cms-outline-button cms-collaboration-back" href="/admin/collaboration">بازگشت</a>
        </header>

        <div className="cms-collaboration-detail-grid">
          <div className="cms-collaboration-detail-main">
            <section className="cms-collaboration-card cms-collaboration-info-card" aria-labelledby="collaboration-info-title">
              <h2 id="collaboration-info-title">اطلاعات درخواست</h2>
              <div className="cms-collaboration-info-grid">
                {requestDetails.map(([label, value]) => (
                  <div className="cms-collaboration-readonly-field" key={label}>
                    <span>{label}</span>
                    <div dir={label === "ایمیل" ? "ltr" : "auto"}>{value}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="cms-collaboration-card cms-collaboration-followup-card" aria-labelledby="collaboration-followup-title">
              <h2 id="collaboration-followup-title">پیگیری درخواست</h2>
              <label className="cms-collaboration-form-field">
                <span>وضعیت فعلی</span>
                <input value="جدید" readOnly />
              </label>
              <label className="cms-collaboration-form-field">
                <span>وضعیت جدید</span>
                <select defaultValue="following">
                  <option value="new">جدید</option>
                  <option value="following">در حال پیگیری</option>
                  <option value="contacted">تماس گرفته شد</option>
                  <option value="closed">بسته شد</option>
                </select>
              </label>
              <div className="cms-collaboration-followup-actions">
                <button className="cms-collaboration-primary-button" type="button">ثبت نتیجه پیگیری</button>
                <button className="cms-outline-button" type="button">ذخیره پیش‌نویس</button>
              </div>
            </section>
          </div>

          <section className="cms-collaboration-card cms-collaboration-note-card" aria-labelledby="collaboration-note-title">
            <h2 id="collaboration-note-title">پیام و یادداشت‌ها</h2>
            <div className="cms-collaboration-message-block">
              <span>متن درخواست</span>
              <div>برای همکاری به‌عنوان منتور در حوزه توسعه محصول و مدل کسب‌وکار اعلام آمادگی می‌کنم.</div>
            </div>
            <div className="cms-collaboration-message-block cms-collaboration-internal-note">
              <span>یادداشت داخلی</span>
              <div>تماس اولیه انجام شود و رزومه تخصصی دریافت شود.</div>
            </div>
            <div className="cms-collaboration-history">
              <h3>تاریخچه پیگیری</h3>
              <p>امروز، ۱۰:۲۰&nbsp; • &nbsp;درخواست دریافت شد</p>
              <p>امروز، ۱۰:۲۵&nbsp; • &nbsp;در صف بررسی قرار گرفت</p>
            </div>
          </section>
        </div>
      </div>
    </CmsShell>
  );
}
