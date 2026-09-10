import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../../components/site-chrome";
import { db } from "../../../lib/db";
import { formatPersianDate, newsCategoryLabels } from "../../../lib/content-utils";

export const dynamic = "force-dynamic";

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const now = new Date();
  const news = await db.news.findFirst({
    where: {
      slug,
      deletedAt: null,
      OR: [
        { status: "published" },
        { status: "scheduled", publishedAt: { lte: now } },
      ],
    },
  });
  if (!news) notFound();

  await db.news.update({ where: { id: news.id }, data: { views: { increment: 1 } } });
  const cover = news.coverMediaId ? await db.media.findUnique({ where: { id: news.coverMediaId } }) : null;
  const categoryLabel = newsCategoryLabels[news.category] || news.category;
  const tags = (news.tags || "").split(/[،,]/).map((tag) => tag.trim()).filter(Boolean);
  const normalizedBody = news.body
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\n")
    .replace(/\r\n?/g, "\n");
  const paragraphs = normalizedBody.split(/\n\s*\n+/).map((part) => part.trim()).filter(Boolean);
  const readingMinutes = Math.max(1, Math.ceil(normalizedBody.length / 850));

  return (
    <div className="public-page">
      <SiteHeader active="news" />
      <main className="public-page__main">
        <section className="news-detail-hero">
          <div className="shell news-detail-hero__grid">
            <div className="news-detail-visual" aria-hidden="true">
              {cover ? <img src={`/uploads/${cover.storageKey}`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (
                <>
                  <span className="news-detail-visual__navy" />
                  <span className="news-detail-visual__coral" />
                  <span className="news-detail-visual__gold" />
                  <strong>خبر آینه</strong>
                  <p>{categoryLabel}</p>
                </>
              )}
            </div>
            <div className="news-detail-copy">
              <p className="eyebrow">{categoryLabel} • {formatPersianDate(news.publishedAt)}</p>
              <h1>{news.title}</h1>
              <p>{news.summary || "خبر و گزارش فعالیت‌های خانه خلاق و نوآوری آینه."}</p>
              <div className="news-detail-tags">
                {news.featured ? <span className="news-detail-tag">خبر منتخب</span> : null}
                <span className="news-detail-tag">{categoryLabel}</span>
                {tags.slice(0, 2).map((tag) => <span className="news-detail-tag" key={tag}>{tag}</span>)}
              </div>
              <div className="news-detail-actions">
                <a className="button button--primary" href="/news">بازگشت به اخبار</a>
                <a className="button button--secondary" href={`mailto:?subject=${encodeURIComponent(news.title)}`}>اشتراک‌گذاری</a>
              </div>
            </div>
          </div>
        </section>

        <section className="news-summary">
          <div className="shell">
            <div className="section-intro section-intro--compact">
              <p className="eyebrow">در یک نگاه</p>
              <h2>{news.summary || news.title}</h2>
            </div>
            <div className="news-summary-grid">
              <article className="news-summary-copy">
                <p className="eyebrow">خلاصه خبر</p>
                <h3>{news.title}</h3>
                <p>{news.summary || paragraphs[0] || "جزئیات این خبر در متن کامل آمده است."}</p>
              </article>
              <div className="news-summary-metrics">
                <article className="news-summary-metric"><strong>{formatPersianDate(news.publishedAt)}</strong><span>تاریخ انتشار</span></article>
                <article className="news-summary-metric"><strong>{categoryLabel}</strong><span>نوع محتوا</span></article>
                <article className="news-summary-metric"><strong>{readingMinutes.toLocaleString("fa-IR")} دقیقه</strong><span>زمان مطالعه</span></article>
              </div>
            </div>
          </div>
        </section>

        <section className="news-highlights">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">متن خبر</p>
              <h2>شرح کامل</h2>
            </div>
            <div className={`news-highlights-layout${cover ? " news-highlights-layout--with-media" : " news-highlights-layout--text-only"}`}>
              <div className={`news-highlight-grid${cover ? "" : " news-highlight-grid--full"}`}>
                {paragraphs.map((paragraph, index) => (
                  <article className="news-highlight-card" key={`${news.id}-${index}`}>
                    <div className="news-highlight-card__accent" />
                    <h3>{index === 0 ? news.title : `بخش ${(index + 1).toLocaleString("fa-IR")}`}</h3>
                    <p>{paragraph}</p>
                  </article>
                ))}
              </div>
              {cover ? (
                <figure className="news-highlight-media">
                  <img src={`/uploads/${cover.storageKey}`} alt={`تصویر خبر ${news.title}`} />
                </figure>
              ) : null}
            </div>
          </div>
        </section>

        {tags.length ? (
          <section className="news-closing">
            <div className="shell">
              <div className="section-intro section-intro--compact">
                <p className="eyebrow">برچسب‌ها</p>
                <h2>موضوعات مرتبط با این خبر</h2>
              </div>
              <div className="news-closing-grid">
                <article className="news-closing-card">
                  <h3>موضوعات</h3>
                  <p>{tags.join(" • ")}</p>
                </article>
                <article className="news-closing-card">
                  <h3>ادامه خبرها</h3>
                  <p>برای دنبال کردن تازه‌ترین فعالیت‌ها و گزارش‌ها به صفحه اخبار خانه خلاق برگردید.</p>
                  <a href="/news">مشاهده همه اخبار ←</a>
                </article>
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}
