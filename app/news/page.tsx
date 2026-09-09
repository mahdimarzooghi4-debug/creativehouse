import { SiteFooter, SiteHeader } from "../../components/site-chrome";

type NewsArtVariant = "lab" | "workshop" | "stage";

function NewsArt({ variant, large = false }: { variant: NewsArtVariant; large?: boolean }) {
  return (
    <div className={`news-art news-art--${variant}${large ? " news-art--large" : ""}`} aria-hidden="true">
      <div className="news-art__canvas">
        <span className="news-art__board" />
        <span className="news-art__table" />
        <span className="news-art__person news-art__person--1" />
        <span className="news-art__person news-art__person--2" />
        <span className="news-art__person news-art__person--3" />
      </div>
    </div>
  );
}

const filters = ["همه", "رویدادها", "استارتاپ‌ها", "گزارش فعالیت"];

const newsItems: Array<{
  slug: string;
  meta: string;
  title: string;
  art: NewsArtVariant;
}> = [
  {
    slug: "selected-teams-gathering",
    meta: "خانه خلاق • شهریور ۱۴۰۵",
    title: "نخستین گردهمایی تیم‌های منتخب خانه خلاق آینه برگزار شد",
    art: "lab",
  },
  {
    slug: "teams-enter-mentoring",
    meta: "استارتاپ‌ها • مرداد ۱۴۰۵",
    title: "سه تیم خلاق وارد مرحله منتورینگ و توسعه محصول شدند",
    art: "workshop",
  },
  {
    slug: "problem-workshop-day",
    meta: "گزارش فعالیت • تیر ۱۴۰۵",
    title: "یک روز از کارگاه مسئله‌محور خانه خلاق؛ از ایده تا نمونه اولیه",
    art: "stage",
  },
  {
    slug: "growth-program-call",
    meta: "برنامه‌ها • خرداد ۱۴۰۵",
    title: "فراخوان دوره جدید برنامه رشد و شتابدهی منتشر شد",
    art: "lab",
  },
  {
    slug: "problem-to-market-session",
    meta: "نشست‌ها • اردیبهشت ۱۴۰۵",
    title: "نشست تجربه‌محور «از مسئله تا بازار» در خانه خلاق برگزار شد",
    art: "workshop",
  },
  {
    slug: "mentor-network",
    meta: "همراهان • فروردین ۱۴۰۵",
    title: "خانه خلاق آینه میزبان شبکه‌ای از منتورها و متخصصان شد",
    art: "stage",
  },
];

export default function NewsPage() {
  const featured = newsItems[0];

  return (
    <div className="public-page">
      <SiteHeader active="news" />
      <main className="public-page__main">
        <section className="news-page-hero">
          <div className="shell">
            <p className="eyebrow">رسانه و اخبار</p>
            <h1>خانه خلاق در جریان است</h1>
            <p>گزارش رویدادها، خبر استارتاپ‌ها، برنامه‌های در حال اجرا و روایت‌هایی از مسیر ساختن در خانه خلاق آینه.</p>
          </div>
        </section>

        <section className="news-featured-section">
          <div className="shell">
            <p className="eyebrow">خبر منتخب</p>
            <article className="news-featured-card">
              <NewsArt variant={featured.art} large />
              <div className="news-featured-copy">
                <p className="news-meta">{featured.meta}</p>
                <h2>{featured.title}</h2>
                <a href={`/news/${featured.slug}`}>مشاهده خبر ←</a>
              </div>
            </article>
          </div>
        </section>

        <section className="news-directory-section">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">همه اخبار</p>
              <h2>تازه‌ترین خبرها و روایت‌ها</h2>
            </div>
            <div className="filter-row" aria-label="فیلتر اخبار">
              {filters.map((filter, index) => (
                <span className={`filter-chip${index === 0 ? " filter-chip--active" : ""}`} key={filter}>{filter}</span>
              ))}
            </div>
            <div className="news-directory-grid">
              {newsItems.map((item) => (
                <article className="news-directory-card" key={item.slug}>
                  <NewsArt variant={item.art} />
                  <p className="news-meta">{item.meta}</p>
                  <h3>{item.title}</h3>
                  <a href={`/news/${item.slug}`}>مشاهده خبر ←</a>
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
