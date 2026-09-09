import { CmsShell } from "../../../components/cms-shell";

const partnerStats = [
  ["همراهان فعال", "۸", "نمایش در سایت"],
  ["جایگاه‌های خالی", "۴", "قابل افزودن"],
  ["همراه اصلی", "۳", "نمایش برجسته"],
] as const;

const partners = [
  ["science-vice-presidency", "معاونت علمی ریاست جمهوری", "لوگوی همراه", "فعال", "active", "ویرایش"],
  ["emdad", "کمیته امداد امام خمینی(ره)", "لوگوی همراه", "فعال", "active", "ویرایش"],
  ["soft-technology", "ستاد توسعه فناوری‌های نرم و صنایع خلاق", "لوگوی همراه", "فعال", "active", "ویرایش"],
  ["new", "همراه جدید", "افزودن لوگو", "پیش‌نویس", "draft", "تکمیل"],
] as const;

const resultMessages: Record<string, string> = {
  saved: "اطلاعات همراه ذخیره شد.",
  published: "همراه با موفقیت فعال شد.",
  "order-saved": "ترتیب نمایش همراهان ذخیره شد.",
};

export default async function AdminPartnersPage({ searchParams }: { searchParams: Promise<{ result?: string }> }) {
  const { result } = await searchParams;
  const feedback = result ? resultMessages[result] : undefined;

  return (
    <CmsShell active="partners">
      <div className="cms-dashboard cms-partners-page">
        <header className="cms-page-header">
          <div>
            <h1>مدیریت همراهان</h1>
            <p>لوگو، عنوان و ترتیب نمایش همراهان خانه خلاق را مدیریت کن</p>
          </div>
          <div className="cms-partners-header-actions">
            <a className="cms-outline-button cms-view-site" href="/">مشاهده سایت</a>
            <a className="cms-partners-dark-button cms-add-partner" href="/admin/partners/new">افزودن همراه</a>
          </div>
        </header>

        {feedback ? <div className="cms-secondary-feedback" role="status">{feedback}</div> : null}

        <section className="cms-partners-stat-grid" aria-label="آمار همراهان">
          {partnerStats.map(([label, value, note]) => (
            <article className="cms-partners-stat" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{note}</small>
            </article>
          ))}
        </section>

        <p className="cms-partners-hint">ترتیب نمایش نهایی پس از اتصال دیتابیس با Drag & Drop ذخیره می‌شود.</p>

        <section className="cms-partners-grid" aria-label="فهرست همراهان">
          {partners.map(([slug, name, logoText, status, tone, action]) => (
            <article className="cms-partner-card" id={`partner-${slug}`} key={slug}>
              <div className="cms-partner-logo" aria-label={`محل لوگوی ${name}`}>
                <span>{logoText}</span>
              </div>
              <h2>{name}</h2>
              <div className="cms-partner-card-footer">
                <span className={`cms-partner-status cms-partner-status--${tone}`}>{status}</span>
                <a className="cms-partner-action" href={slug === "new" ? "/admin/partners/new" : `/admin/partners/${slug}`}>{action}</a>
              </div>
            </article>
          ))}
        </section>

        <form className="cms-partner-order-card" action="/admin/partners" method="get" aria-labelledby="partner-order-title">
          <h2 id="partner-order-title">ترتیب نمایش در صفحه اصلی</h2>
          <p>معاونت علمی ریاست جمهوری&nbsp; ← &nbsp;کمیته امداد&nbsp; ← &nbsp;ستاد توسعه فناوری‌های نرم&nbsp; ← &nbsp;سایر همراهان</p>
          <button className="cms-outline-button cms-partner-save-order" type="submit" name="result" value="order-saved">ذخیره ترتیب</button>
        </form>
      </div>
    </CmsShell>
  );
}
