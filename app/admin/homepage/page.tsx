import { CmsShell } from "../../../components/cms-shell";

const stats = [
  ["برنامه‌ها", "۶"],
  ["استارتاپ‌ها", "۱۲"],
  ["استان‌های درگیر", "۳۱"],
  ["همراهان", "۸"],
] as const;

const featuredContent = [
  ["استارتاپ منتخب", "مرکز نوآوری آفتاب"],
  ["برنامه منتخب", "رویداد ملی آینه"],
  ["خبر منتخب", "گردهمایی تیم‌های منتخب"],
  ["همراهان", "۴ لوگوی اول"],
] as const;

export default function AdminHomepageSettingsPage() {
  return (
    <CmsShell active="settings">
      <form className="cms-dashboard cms-homepage-settings" action="#" method="post">
        <header className="cms-page-header">
          <div>
            <h1>مدیریت صفحه اصلی</h1>
            <p>هیرو، آمارها، برنامه‌ها، استارتاپ‌ها و همراهان صفحه اصلی را مدیریت کن</p>
          </div>
          <button className="cms-homepage-save" type="submit">ذخیره تغییرات</button>
        </header>

        <div className="cms-homepage-top-grid">
          <section className="cms-settings-card cms-homepage-hero" id="hero">
            <h2>هیرو صفحه اصلی</h2>
            <button className="cms-hero-preview" type="button" aria-label="جایگزینی یا برش تصویر هیرو">
              <span>تصویر هیرو • جایگزینی / برش</span>
            </button>
            <div className="cms-homepage-pair">
              <label>
                <span>دکمه اصلی</span>
                <input name="heroCta" defaultValue="مشاهده برنامه‌ها" />
              </label>
              <label>
                <span>تیتر</span>
                <input name="heroTitle" defaultValue="وطن، ساختنی است" />
              </label>
            </div>
          </section>

          <section className="cms-settings-card cms-homepage-stats" id="stats">
            <h2>آمار صفحه</h2>
            <div className="cms-homepage-stat-grid">
              {stats.map(([label, value], index) => (
                <label key={label}>
                  <span>{label}</span>
                  <input name={`stat-${index}`} inputMode="numeric" defaultValue={value} />
                </label>
              ))}
            </div>
          </section>
        </div>

        <section className="cms-settings-card cms-featured-content" aria-labelledby="featured-title">
          <h2 id="featured-title">محتوای منتخب صفحه اصلی</h2>
          <div className="cms-featured-list">
            {featuredContent.map(([label, value], index) => (
              <div className="cms-featured-row" key={label}>
                <span className="cms-featured-label">{label}</span>
                <input aria-label={label} name={`featured-${index}`} defaultValue={value} readOnly />
                <button type="button">تغییر</button>
              </div>
            ))}
          </div>
        </section>
      </form>
    </CmsShell>
  );
}
