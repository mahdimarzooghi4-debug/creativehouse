import { CmsShell } from "../../../components/cms-shell";

const licenseStats = [
  ["کل اسناد", "۳", "۲ منتشرشده"],
  ["پیش‌نویس", "۱", "در انتظار تکمیل"],
  ["جایگاه آماده", "۶", "قابل افزایش"],
] as const;

const licenses = [
  ["creative-house-license", "مجوز فعالیت خانه خلاق", "مرجع صادرکننده", "منتشرشده", "published"],
  ["collaboration-approval", "تأییدیه همکاری", "مرجع صادرکننده", "منتشرشده", "published"],
  ["new", "سند جدید", "اطلاعات تکمیل نشده", "پیش‌نویس", "draft"],
] as const;

const resultMessages: Record<string, string> = {
  saved: "اطلاعات مجوز ذخیره شد.",
  published: "مجوز برای نمایش عمومی منتشر شد.",
};

export default async function AdminLicensesPage({ searchParams }: { searchParams: Promise<{ result?: string }> }) {
  const { result } = await searchParams;
  const feedback = result ? resultMessages[result] : undefined;

  return (
    <CmsShell active="licenses">
      <div className="cms-dashboard cms-licenses-page">
        <header className="cms-page-header">
          <div>
            <h1>مدیریت مجوزها و تأییدیه‌ها</h1>
            <p>اسناد واقعی را بارگذاری و وضعیت نمایش عمومی آن‌ها را مدیریت کن</p>
          </div>
          <div className="cms-licenses-header-actions">
            <a className="cms-outline-button cms-view-site" href="/licenses">مشاهده سایت</a>
            <a className="cms-licenses-dark-button cms-add-license" href="/admin/licenses/new">افزودن مجوز</a>
          </div>
        </header>

        {feedback ? <div className="cms-secondary-feedback" role="status">{feedback}</div> : null}

        <section className="cms-licenses-stat-grid" aria-label="آمار مجوزها">
          {licenseStats.map(([label, value, note]) => (
            <article className="cms-licenses-stat" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{note}</small>
            </article>
          ))}
        </section>

        <section className="cms-licenses-grid" aria-label="فهرست مجوزها و تأییدیه‌ها">
          {licenses.map(([slug, title, issuer, status, tone]) => (
            <article className="cms-license-card" id={`license-${slug}`} key={slug}>
              <div className="cms-license-preview" aria-label={`پیش‌نمایش ${title}`}>
                <span>پیش‌نمایش سند</span>
              </div>
              <h2>{title}</h2>
              <p>{issuer}</p>
              <div className="cms-license-card-footer">
                <span className={`cms-license-status cms-license-status--${tone}`}>{status}</span>
                <a className="cms-license-action" href={slug === "new" ? "/admin/licenses/new" : `/admin/licenses/${slug}`}>ویرایش</a>
              </div>
            </article>
          ))}
        </section>

        <aside className="cms-license-note" aria-label="یادآوری انتشار اسناد">
          فقط اسناد و مجوزهای واقعی منتشر می‌شوند؛ اطلاعات نمونه به‌عنوان مرجع عمومی نمایش داده نمی‌شود.
        </aside>
      </div>
    </CmsShell>
  );
}
