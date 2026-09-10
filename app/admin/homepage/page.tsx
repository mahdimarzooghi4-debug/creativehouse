import { CmsShell } from "../../../components/cms-shell";
import { db } from "../../../lib/db";
import { CMS_HERO_MEDIA_ALT, getHomepageSettings, splitStoredIds } from "../../../lib/homepage-settings";
import { toPersianDigits } from "../../../lib/content-utils";

export const dynamic = "force-dynamic";

const resultMessages: Record<string, string> = {
  saved: "تنظیمات صفحه اصلی ذخیره شد.",
  "validation-error": "تیتر هیرو و عنوان دکمه اصلی الزامی است.",
  "unsupported-image": "فرمت تصویر هیرو پشتیبانی نمی‌شود.",
  "image-too-large": "حجم تصویر هیرو بیشتر از حد مجاز است.",
  "invalid-image": "فایل تصویر هیرو معتبر نیست.",
  "save-error": "ذخیره تنظیمات صفحه اصلی انجام نشد.",
};

export default async function AdminHomepageSettingsPage({ searchParams }: { searchParams: Promise<{ result?: string }> }) {
  const [{ result }, settings, startupCount, programCount, partnerCount, startups, programs, news] = await Promise.all([
    searchParams,
    getHomepageSettings(),
    db.startup.count({ where: { deletedAt: null, status: "published" } }),
    db.program.count({ where: { deletedAt: null, status: { in: ["published", "active"] } } }),
    db.partner.count({ where: { deletedAt: null, status: "active" } }),
    db.startup.findMany({ where: { deletedAt: null, status: "published" }, orderBy: [{ featured: "desc" }, { displayOrder: "asc" }], select: { id: true, name: true } }),
    db.program.findMany({ where: { deletedAt: null, status: { in: ["published", "active"] } }, orderBy: [{ featured: "desc" }, { displayOrder: "asc" }], select: { slug: true, title: true } }),
    db.news.findMany({ where: { deletedAt: null, status: "published" }, orderBy: [{ featured: "desc" }, { publishedAt: "desc" }], select: { slug: true, title: true } }),
  ]);
  const feedback = result ? resultMessages[result] : undefined;
  const selectedStartupId = splitStoredIds(settings.featuredStartupIds)[0] || startups[0]?.id || "";
  const stats = [
    ["برنامه‌ها", toPersianDigits(settings.statPrograms || programCount), "statPrograms"],
    ["استارتاپ‌ها", toPersianDigits(settings.statStartups || startupCount), "statStartups"],
    ["استان‌های درگیر", toPersianDigits(settings.statProvinces || "۳۱"), "statProvinces"],
    ["همراهان", toPersianDigits(settings.statPartners || partnerCount), "statPartners"],
  ] as const;
  const heroMedia = settings.heroMediaId ? await db.media.findUnique({ where: { id: settings.heroMediaId } }) : null;
  const effectiveHeroMedia = heroMedia?.altText === CMS_HERO_MEDIA_ALT ? heroMedia : null;

  return (
    <CmsShell active="settings">
      <form className="cms-dashboard cms-homepage-settings" action="/api/admin/homepage" method="post" encType="multipart/form-data">
        <header className="cms-page-header">
          <div>
            <h1>مدیریت صفحه اصلی</h1>
            <p>هیرو، آمارها، برنامه‌ها، استارتاپ‌ها و همراهان صفحه اصلی را مدیریت کن</p>
          </div>
          <button className="cms-homepage-save" type="submit">ذخیره تغییرات</button>
        </header>

        {feedback ? <div className="cms-secondary-feedback" role="status">{feedback}</div> : null}

        <div className="cms-homepage-top-grid">
          <section className="cms-settings-card cms-homepage-hero" id="hero">
            <h2>هیرو صفحه اصلی</h2>
            <label className="cms-hero-preview" aria-label="جایگزینی تصویر هیرو">
              <input type="file" name="heroImage" accept="image/png,image/jpeg,image/webp" style={{ display: "none" }} />
              <img
                src={effectiveHeroMedia ? `/uploads/${effectiveHeroMedia.storageKey}` : "/figma-home-hero.png"}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 14 }}
              />
            </label>
            <div className="cms-homepage-pair">
              <label>
                <span>دکمه اصلی</span>
                <input name="heroPrimaryLabel" required defaultValue={settings.heroPrimaryLabel || "مشاهده استارتاپ‌ها"} />
              </label>
              <label>
                <span>تیتر</span>
                <input name="heroTitle" required defaultValue={settings.heroTitle} />
              </label>
            </div>
            <input type="hidden" name="heroPrimaryHref" value={settings.heroPrimaryHref || "/startups"} />
          </section>

          <section className="cms-settings-card cms-homepage-stats" id="stats">
            <h2>آمار صفحه</h2>
            <div className="cms-homepage-stat-grid">
              {stats.map(([label, value, name]) => (
                <label key={label}>
                  <span>{label}</span>
                  <input name={name} inputMode="numeric" maxLength={12} defaultValue={value} />
                </label>
              ))}
            </div>
          </section>
        </div>

        <section className="cms-settings-card cms-featured-content" aria-labelledby="featured-title">
          <h2 id="featured-title">محتوای منتخب صفحه اصلی</h2>
          <div className="cms-featured-list">
            <div className="cms-featured-row">
              <span className="cms-featured-label">استارتاپ منتخب</span>
              <select aria-label="استارتاپ منتخب" name="featuredStartupId" defaultValue={selectedStartupId}>
                <option value="">انتخاب خودکار</option>
                {startups.map((startup) => <option value={startup.id} key={startup.id}>{startup.name}</option>)}
              </select>
              <button type="submit">ذخیره</button>
            </div>
            <div className="cms-featured-row">
              <span className="cms-featured-label">برنامه منتخب</span>
              <select aria-label="برنامه منتخب" name="featuredProgramSlug" defaultValue={settings.featuredProgramSlug || ""}>
                <option value="">انتخاب خودکار</option>
                {programs.map((program) => <option value={program.slug} key={program.slug}>{program.title}</option>)}
              </select>
              <button type="submit">ذخیره</button>
            </div>
            <div className="cms-featured-row">
              <span className="cms-featured-label">خبر منتخب</span>
              <select aria-label="خبر منتخب" name="featuredNewsSlug" defaultValue={settings.featuredNewsSlug || ""}>
                <option value="">انتخاب خودکار</option>
                {news.map((item) => <option value={item.slug} key={item.slug}>{item.title}</option>)}
              </select>
              <button type="submit">ذخیره</button>
            </div>
            <div className="cms-featured-row">
              <span className="cms-featured-label">همراهان</span>
              <input aria-label="همراهان صفحه اصلی" value="بر اساس ترتیب بخش همراهان" readOnly />
              <a href="/admin/partners">تغییر</a>
            </div>
          </div>
        </section>
      </form>
    </CmsShell>
  );
}
