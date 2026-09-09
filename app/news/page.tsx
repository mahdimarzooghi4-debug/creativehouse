import { SiteFooter, SiteHeader } from "../../components/site-chrome";
import { db } from "../../lib/db";
import { formatPersianMonth, newsCategoryLabels } from "../../lib/content-utils";

type NewsArtVariant = "lab" | "workshop" | "stage";

export const dynamic = "force-dynamic";

function NewsArt({ variant, large = false, src }: { variant: NewsArtVariant; large?: boolean; src?: string }) {
  if (src) {
    return (
      <div className={`news-art news-art--${variant}${large ? " news-art--large" : ""}`} aria-hidden="true">
        <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    );
  }
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

const artVariants: NewsArtVariant[] = ["lab", "workshop", "stage"];

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category = "all" } = await searchParams;
  const now = new Date();
  const allNews = await db.news.findMany({
    where: {
      deletedAt: null,
      OR: [
        { status: "published" },
        { status: "scheduled", publishedAt: { lte: now } },
      ],
    },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
  });

  const categories = Array.from(new Set(allNews.map((item) => item.category)));
  const newsItems = category === "all" ? allNews : allNews.filter((item) => item.category === category);
  const featured = allNews.find((item) => item.featured) || allNews[0];
  const mediaIds = allNews.map((item) => item.coverMediaId).filter((value): value is string => Boolean(value));
  const media = mediaIds.length ? await db.media.findMany({ where: { id: { in: mediaIds } } }) : [];
  const mediaMap = new Map(media.map((item) => [item.id, item]));

  function meta(item: (typeof allNews)[number]) {
    const categoryLabel = newsCategoryLabels[item.category] || item.category;
    const month = formatPersianMonth(item.publishedAt);
    return month ? `${categoryLabel} • ${month}` : categoryLabel;
  }

  function coverSrc(item: (typeof allNews)[number]) {
    const cover = item.coverMediaId ? mediaMap.get(item.coverMediaId) : null;
    return cover ? `/uploads/${cover.storageKey}` : undefined;
  }

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

        {featured ? (
          <section className="news-featured-section">
            <div className="shell">
              <p className="eyebrow">خبر منتخب</p>
              <article className="news-featured-card">
                <NewsArt variant="lab" large src={coverSrc(featured)} />
                <div className="news-featured-copy">
                  <p className="news-meta">{meta(featured)}</p>
                  <h2>{featured.title}</h2>
                  <a href={`/news/${featured.slug}`}>مشاهده خبر ←</a>
                </div>
              </article>
            </div>
          </section>
        ) : null}

        <section className="news-directory-section">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">همه اخبار</p>
              <h2>تازه‌ترین خبرها و روایت‌ها</h2>
            </div>
            <div className="filter-row" aria-label="فیلتر اخبار">
              <a className={`filter-chip${category === "all" ? " filter-chip--active" : ""}`} href="/news">همه</a>
              {categories.map((item) => (
                <a className={`filter-chip${category === item ? " filter-chip--active" : ""}`} href={`/news?category=${encodeURIComponent(item)}`} key={item}>{newsCategoryLabels[item] || item}</a>
              ))}
            </div>
            <div className="news-directory-grid">
              {newsItems.map((item, index) => (
                <article className="news-directory-card" key={item.id}>
                  <NewsArt variant={artVariants[index % artVariants.length]} src={coverSrc(item)} />
                  <p className="news-meta">{meta(item)}</p>
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
