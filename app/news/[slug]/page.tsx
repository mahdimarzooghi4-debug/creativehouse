import { SiteFooter, SiteHeader } from "../../../components/site-chrome";

const newsTitles: Record<string, string> = {
  "selected-teams-gathering": "نخستین گردهمایی تیم‌های منتخب خانه خلاق آینه برگزار شد",
  "teams-enter-mentoring": "سه تیم خلاق وارد مرحله منتورینگ و توسعه محصول شدند",
  "problem-workshop-day": "یک روز از کارگاه مسئله‌محور خانه خلاق؛ از ایده تا نمونه اولیه",
  "growth-program-call": "فراخوان دوره جدید برنامه رشد و شتابدهی منتشر شد",
  "problem-to-market-session": "نشست تجربه‌محور «از مسئله تا بازار» در خانه خلاق برگزار شد",
  "mentor-network": "خانه خلاق آینه میزبان شبکه‌ای از منتورها و متخصصان شد",
};

const highlights = [
  ["تعریف مسیر هر تیم", "برای هر تیم، مسئله اولویت‌دار و خروجی مرحله بعد مشخص شد."],
  ["شروع منتورینگ", "تیم‌ها با ساختار جلسات تخصصی و منتورهای همراه آشنا شدند."],
  ["تقویم ارزیابی", "نقاط بررسی محصول، اعتبارسنجی و ارائه نهایی زمان‌بندی شد."],
];

const story = [
  ["معرفی تیم‌ها", "هر تیم مسئله و مسیر فعلی خود را کوتاه معرفی کرد."],
  ["بازخورد منتورها", "بازخورد اولیه برای روشن‌تر شدن مسئله و خروجی دریافت شد."],
  ["طراحی مسیر رشد", "جلسات منتورینگ، کارگاه‌ها و نقاط ارزیابی مشخص شد."],
  ["شروع مرحله بعد", "تیم‌ها برای ساخت نمونه و اعتبارسنجی بازار آماده شدند."],
];

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = newsTitles[slug] ?? newsTitles["selected-teams-gathering"];

  return (
    <div className="public-page">
      <SiteHeader active="news" />
      <main className="public-page__main">
        <section className="news-detail-hero">
          <div className="shell news-detail-hero__grid">
            <div className="news-detail-visual" aria-hidden="true">
              <span className="news-detail-visual__navy" />
              <span className="news-detail-visual__coral" />
              <span className="news-detail-visual__gold" />
              <strong>خبر آینه</strong>
              <p>گردهمایی تیم‌های منتخب خانه خلاق</p>
            </div>
            <div className="news-detail-copy">
              <p className="eyebrow">گزارش فعالیت • شهریور ۱۴۰۵</p>
              <h1>{title}</h1>
              <p>تیم‌های منتخب خانه خلاق در یک نشست مشترک، مسیر توسعه محصول، شبکه منتورینگ و برنامه‌های ماه‌های پیش‌رو را مرور کردند.</p>
              <div className="news-detail-tags">
                <span className="program-detail-status">خبر منتخب</span>
                <span className="program-detail-status">گزارش فعالیت</span>
              </div>
              <div className="news-detail-actions">
                <a className="button button--primary" href="/news">بازگشت به اخبار</a>
                <a className="button button--secondary" href={`mailto:?subject=${encodeURIComponent(title)}`}>اشتراک‌گذاری</a>
              </div>
            </div>
          </div>
        </section>

        <section className="news-summary">
          <div className="shell">
            <div className="section-intro section-intro--compact">
              <p className="eyebrow">در یک نگاه</p>
              <h2>یک شروع مشترک برای مسیر ساختن</h2>
            </div>
            <div className="news-summary-grid">
              <article className="news-summary-copy">
                <p className="eyebrow">خلاصه خبر</p>
                <h3>گردهمایی تیم‌های منتخب</h3>
                <p>این نشست با تمرکز بر شناخت دقیق مسئله، تعریف خروجی کوتاه‌مدت و طراحی برنامه رشد هر تیم برگزار شد.</p>
              </article>
              <div className="news-summary-metrics">
                <article className="news-summary-metric"><strong>شهریور ۱۴۰۵</strong><span>تاریخ انتشار</span></article>
                <article className="news-summary-metric"><strong>گزارش</strong><span>نوع محتوا</span></article>
                <article className="news-summary-metric"><strong>۴ دقیقه</strong><span>زمان مطالعه</span></article>
              </div>
            </div>
          </div>
        </section>

        <section className="news-highlights">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">نکات کلیدی</p>
              <h2>این گردهمایی چه خروجی‌ای داشت؟</h2>
            </div>
            <div className="news-highlight-grid">
              {highlights.map(([heading, text]) => (
                <article className="news-highlight-card" key={heading}>
                  <div className="news-highlight-card__accent" />
                  <h3>{heading}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="news-story">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">روایت گردهمایی</p>
              <h2>در این نشست چه گذشت؟</h2>
            </div>
            <div className="news-story-grid">
              {story.map(([heading, text], index) => (
                <article className="news-story-card" key={heading}>
                  <span>{index + 1}</span>
                  <h3>{heading}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="news-closing">
          <div className="shell">
            <div className="section-intro section-intro--compact">
              <p className="eyebrow">ادامه خبر</p>
              <h2>از تیم‌ها تا برنامه ماه‌های آینده</h2>
            </div>
            <div className="news-closing-grid">
              <article className="news-closing-card">
                <h3>آنچه بعد از نشست اتفاق می‌افتد</h3>
                <p>تیم‌ها طی هفته‌های آینده نمونه اولیه یا نسخه بهبود‌یافته محصول خود را آماده می‌کنند و وارد مرحله اعتبارسنجی بازار می‌شوند.</p>
              </article>
              <article className="news-closing-card">
                <h3>خبرهای مرتبط</h3>
                <p>سه تیم خلاق وارد مرحله منتورینگ شدند • یک روز از کارگاه مسئله‌محور خانه خلاق • فراخوان برنامه رشد و شتابدهی</p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
