import { CmsShell } from "../../../components/cms-shell";
import { db } from "../../../lib/db";

export const dynamic = "force-dynamic";

const resultMessages: Record<string, string> = {
  saved: "اطلاعات همراه به‌صورت پیش‌نویس ذخیره شد.",
  published: "همراه با موفقیت فعال شد.",
  deleted: "همراه حذف شد.",
  "validation-error": "نام همراه الزامی است.",
  "unsupported-image": "فرمت لوگو پشتیبانی نمی‌شود.",
  "image-too-large": "حجم لوگو بیشتر از حد مجاز است.",
  "invalid-image": "فایل لوگو معتبر نیست.",
  "save-error": "ذخیره همراه انجام نشد.",
  "not-found": "همراه موردنظر پیدا نشد.",
};

export default async function AdminPartnersPage({ searchParams }: { searchParams: Promise<{ result?: string }> }) {
  const { result } = await searchParams;
  const feedback = result ? resultMessages[result] : undefined;
  const [partners, total, active, featured] = await Promise.all([
    db.partner.findMany({ where: { deletedAt: null }, orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }] }),
    db.partner.count({ where: { deletedAt: null } }),
    db.partner.count({ where: { deletedAt: null, status: "active" } }),
    db.partner.count({ where: { deletedAt: null, status: "active", featured: true } }),
  ]);
  const partnerStats = [
    ["همراهان فعال", String(active), "نمایش در سایت"],
    ["جایگاه‌های خالی", String(Math.max(0, 12 - total)), "قابل افزودن"],
    ["همراه اصلی", String(featured), "نمایش برجسته"],
  ] as const;

  return (
    <CmsShell active="partners">
      <div className="cms-dashboard cms-partners-page">
        <header className="cms-page-header">
          <div><h1>مدیریت همراهان</h1><p>لوگو، عنوان و ترتیب نمایش همراهان خانه خلاق را مدیریت کن</p></div>
          <div className="cms-partners-header-actions">
            <a className="cms-outline-button cms-view-site" href="/#partners">مشاهده سایت</a>
            <a className="cms-partners-dark-button cms-add-partner" href="/admin/partners/new">افزودن همراه</a>
          </div>
        </header>

        {feedback ? <div className="cms-secondary-feedback" role="status">{feedback}</div> : null}

        <section className="cms-partners-stat-grid" aria-label="آمار همراهان">
          {partnerStats.map(([label, value, note]) => <article className="cms-partners-stat" key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}
        </section>

        <p className="cms-partners-hint">ترتیب نمایش هر همراه از داخل صفحه ویرایش همان همراه قابل تغییر است.</p>

        <section className="cms-partners-grid" aria-label="فهرست همراهان">
          {partners.map((partner) => (
            <article className="cms-partner-card" id={`partner-${partner.slug}`} key={partner.id}>
              <div className="cms-partner-logo" aria-label={`محل لوگوی ${partner.name}`}><span>{partner.logoMediaId ? "لوگو ثبت شده" : "افزودن لوگو"}</span></div>
              <h2>{partner.name}</h2>
              <div className="cms-partner-card-footer">
                <span className={`cms-partner-status cms-partner-status--${partner.status === "active" ? "active" : "draft"}`}>{partner.status === "active" ? "فعال" : "پیش‌نویس"}</span>
                <a className="cms-partner-action" href={`/admin/partners/${partner.slug}`}>ویرایش</a>
              </div>
            </article>
          ))}
        </section>

        <div className="cms-partner-order-card" aria-labelledby="partner-order-title">
          <h2 id="partner-order-title">ترتیب نمایش در صفحه اصلی</h2>
          <p>{partners.map((partner) => partner.name).join(" ← ") || "هنوز همراهی ثبت نشده است."}</p>
          <a className="cms-outline-button cms-partner-save-order" href="/admin/partners">ترتیب از شماره نمایش هر همراه خوانده می‌شود</a>
        </div>
      </div>
    </CmsShell>
  );
}
