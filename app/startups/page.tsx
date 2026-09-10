import { SiteFooter, SiteHeader } from "../../components/site-chrome";
import { db } from "../../lib/db";

export const dynamic = "force-dynamic";

const journey = [
  ["معرفی تیم", "ثبت اطلاعات اولیه، محصول یا ایده و مسئله‌ای که تیم روی آن کار می‌کند."],
  ["بررسی و پذیرش", "بررسی تناسب تیم با ظرفیت‌ها، برنامه‌ها و شبکه همراهان خانه خلاق."],
  ["همراهی و رشد", "منتورینگ، اتصال به شبکه، توسعه محصول و نمایش دستاوردها."],
];

const journeyNumbers = ["۱", "۲", "۳"];

export default async function StartupsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category = "همه" } = await searchParams;
  const startups = await db.startup.findMany({
    where: { deletedAt: null, status: "published" },
    orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { updatedAt: "desc" }],
  });
  const featured = startups.find((item) => item.featured) || startups[0];
  const categories = ["همه", ...Array.from(new Set(startups.map((item) => item.field)))];
  const visibleStartups = category === "همه" ? startups : startups.filter((item) => item.field === category);
  const cover = featured?.coverMediaId ? await db.media.findUnique({ where: { id: featured.coverMediaId } }) : null;

  return (
    <div className="public-page startups-page">
      <SiteHeader active="startups" />
      <main className="public-page__main">
        <section className="public-hero">
          <div className="shell public-hero__row">
            <div className="hero-stat-pair" aria-label="آمار استارتاپ‌ها">
              <article className="hero-stat hero-stat--filled">
                <strong>{startups.length.toLocaleString("fa-IR")}</strong>
                <span>استارتاپ همراه</span>
              </article>
              <article className="hero-stat">
                <strong><bdi className="hero-stat__number" dir="ltr">+۳۰</bdi></strong>
                <span>منتور و متخصص</span>
              </article>
            </div>
            <div className="public-hero__copy">
              <p className="eyebrow">استارتاپ‌های خانه خلاق</p>
              <h1>ایده‌هایی که وارد مرحله ساخت شده‌اند</h1>
              <p>در این صفحه تیم‌ها و استارتاپ‌های همراه خانه خلاق آینه معرفی می‌شوند؛ هر تیم پروفایل مستقل، حوزه فعالیت و مسیر رشد خود را دارد.</p>
            </div>
          </div>
        </section>

        {featured ? (
          <section className="content-section">
            <div className="shell">
              <div className="section-intro section-intro--compact">
                <p className="eyebrow">استارتاپ منتخب</p>
                <h2>یک معرفی کامل‌تر برای تیم منتخب</h2>
              </div>
              <article className="featured-startup">
                <div className="featured-startup__visual" aria-hidden="true">
                  {cover ? <img src={`/uploads/${cover.storageKey}`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <strong>از ایده<br />تا اثر</strong>}
                </div>
                <div className="featured-startup__body">
                  <h3>{featured.name}</h3>
                  <p>{featured.summary || "معرفی این استارتاپ به‌زودی تکمیل می‌شود."}</p>
                  <a href={`/startups/${featured.slug}`}>مشاهده پروفایل کامل ←</a>
                </div>
              </article>
            </div>
          </section>
        ) : null}

        <section className="content-section content-section--white">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">همه استارتاپ‌ها</p>
              <h2>تیم‌ها و کسب‌وکارهای همراه خانه خلاق</h2>
              <p>این فهرست مستقیماً از پنل مدیریت به‌روزرسانی می‌شود.</p>
            </div>
            <div className="filter-row" aria-label="فیلتر استارتاپ‌ها">
              {categories.map((item) => (
                <a className={`filter-chip${item === category ? " filter-chip--active" : ""}`} href={item === "همه" ? "/startups" : `/startups?category=${encodeURIComponent(item)}`} key={item}>{item}</a>
              ))}
            </div>
            <div className="directory-grid">
              {visibleStartups.map((startup) => (
                <article className="directory-card" key={startup.id}>
                  <span className="tag">{startup.field}</span>
                  <h3>{startup.name}</h3>
                  <p>{startup.summary || "معرفی کوتاه این استارتاپ به‌زودی تکمیل می‌شود."}</p>
                  <div className="directory-card__divider" />
                  <a href={`/startups/${startup.slug}`}>مشاهده پروفایل ←</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">مسیر همراهی</p>
              <h2>از معرفی تیم تا رشد در کنار خانه خلاق</h2>
            </div>
            <div className="three-card-grid">
              {journey.map(([title, text], index) => (
                <article className="step-card" key={title} dir="rtl">
                  <span
                    className="step-card__number"
                    dir="rtl"
                    style={{ marginRight: 0, marginLeft: "auto" }}
                  >
                    {journeyNumbers[index]}
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
