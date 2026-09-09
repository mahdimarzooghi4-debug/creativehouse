import { SiteFooter, SiteHeader } from "../../components/site-chrome";
import { programTypeLabels } from "../../lib/content-utils";
import { db } from "../../lib/db";

export const dynamic = "force-dynamic";

const filters = [
  { label: "همه", value: "all" },
  { label: "رویدادها", value: "event" },
  { label: "رشد و شتابدهی", value: "acceleration" },
  { label: "کارگاه‌ها", value: "workshop" },
] as const;
const allowedTypes = new Set(filters.map((item) => item.value));
const cycle = [
  ["فراخوان و ثبت‌نام", "انتخاب مخاطب و دریافت درخواست‌ها"],
  ["اجرا و همراهی", "منتورینگ، کارگاه و توسعه راهکار"],
  ["ارزیابی و ارائه", "سنجش خروجی و اتصال به فرصت بعدی"],
];

export default async function ProgramsPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type = "all" } = await searchParams;
  const selectedType = allowedTypes.has(type as (typeof filters)[number]["value"]) ? type : "all";
  const programs = await db.program.findMany({
    where: { deletedAt: null, status: { in: ["published", "active"] } },
    orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { updatedAt: "desc" }],
  });
  const visiblePrograms = selectedType === "all" ? programs : programs.filter((program) => program.type === selectedType);
  const featured = visiblePrograms.find((program) => program.featured) || visiblePrograms[0] || programs.find((program) => program.featured) || programs[0];
  const activeCount = programs.filter((program) => program.status === "active").length;

  return (
    <div className="public-page">
      <SiteHeader active="programs" />
      <main className="public-page__main">
        <section className="programs-hero">
          <div className="shell">
            <p className="eyebrow">برنامه‌های خانه خلاق</p>
            <h1>مسیرهایی برای ساختن، رشد و اتصال</h1>
            <div className="programs-hero__bottom">
              <p>هر برنامه یک مسیر مستقل برای تبدیل ایده به تجربه، محصول یا کسب‌وکار است. رویداد ملی آینه نیز یکی از همین برنامه‌هاست و صفحه اختصاصی خودش را دارد.</p>
              <div className="programs-stat-row" aria-label="آمار برنامه‌ها">
                <article className="programs-stat programs-stat--filled"><strong>{programs.length.toLocaleString("fa-IR")}</strong><span>برنامه و رویداد</span></article>
                <article className="programs-stat"><strong>{activeCount.toLocaleString("fa-IR")}</strong><span>مسیر فعال</span></article>
              </div>
            </div>
          </div>
        </section>

        {featured ? (
          <section className="content-section">
            <div className="shell">
              <div className="section-intro section-intro--compact"><p className="eyebrow">برنامه منتخب</p><h2>{featured.title}</h2></div>
              <article className="featured-program">
                <div className="featured-program__copy">
                  <span className="tag">{programTypeLabels[featured.type] || featured.type}</span>
                  <h3>{featured.title}</h3>
                  <p>{featured.summary || "اطلاعات این برنامه به‌زودی تکمیل می‌شود."}</p>
                  <a href={`/programs/${featured.slug}`}>ورود به صفحه برنامه ←</a>
                </div>
                <div className="featured-program__visual" aria-hidden="true"><strong>از مسئله<br />تا راهکار</strong></div>
              </article>
            </div>
          </section>
        ) : null}

        <section className="content-section content-section--white content-section--large">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">همه برنامه‌ها</p>
              <h2>برنامه‌ای متناسب با مرحله‌ای که در آن هستید</h2>
              <p>فهرست برنامه‌ها مستقیماً از پنل مدیریت خانه خلاق به‌روزرسانی می‌شود.</p>
            </div>
            <div className="filter-row" aria-label="فیلتر برنامه‌ها">
              {filters.map((filter) => (
                <a className={`filter-chip${selectedType === filter.value ? " filter-chip--active" : ""}`} href={filter.value === "all" ? "/programs" : `/programs?type=${filter.value}`} key={filter.value}>{filter.label}</a>
              ))}
            </div>
            <div className="program-directory-grid">
              {visiblePrograms.map((program) => (
                <article className={`program-directory-card${program.featured ? " program-directory-card--featured" : ""}`} key={program.id}>
                  <span className="tag">{programTypeLabels[program.type] || program.type}</span>
                  <h3>{program.title}</h3>
                  <p>{program.summary || "معرفی این برنامه به‌زودی تکمیل می‌شود."}</p>
                  <a href={`/programs/${program.slug}`}>{program.featured ? "ورود به برنامه" : "مشاهده جزئیات"} ←</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section program-cycle">
          <div className="shell">
            <div className="section-intro section-intro--compact"><p className="eyebrow">چرخه یک برنامه</p><h2>از فراخوان تا خروجی قابل ارائه</h2></div>
            <div className="three-card-grid">
              {cycle.map(([title, text], index) => (
                <article className="step-card" key={title}><span className="step-card__number">{index + 1}</span><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
