import { NewsArt, type NewsArtVariant } from "../components/news-art";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import { db } from "../lib/db";
import { formatPersianMonth, newsCategoryLabels } from "../lib/content-utils";

export const dynamic = "force-dynamic";

const programs = [
  {
    title: "رویداد ملی خلاقیت و نوآوری آینه",
    tag: "برنامه ویژه",
    description: "مسیر تبدیل مسئله‌های واقعی به راهکارهای قابل اجرا؛ با صفحه اختصاصی رویداد و فرآیند ثبت‌نام مستقل.",
    featured: true,
    href: "/programs/ayene",
  },
  {
    title: "برنامه رشد و شتابدهی",
    tag: "توسعه کسب‌وکار",
    description: "منتورینگ، اعتبارسنجی، طراحی مسیر رشد و آماده‌سازی برای توسعه بازار و همکاری‌های سازمانی.",
    href: "/programs/growth",
  },
  {
    title: "کارگاه‌ها و شبکه‌سازی",
    tag: "جامعه خلاق",
    description: "نشست‌ها، کارگاه‌های تخصصی و اتصال استارتاپ‌ها به منتورها، متخصصان و مجموعه‌های همکار.",
    href: "/programs/workshops",
  },
];

const services = [
  ["منتورینگ و راهبری", "همراهی متخصصان برای تصمیم‌های کلیدی محصول، بازار و مدل کسب‌وکار."],
  ["توسعه کسب‌وکار", "طراحی مسیر رشد، بازارسازی و آماده‌سازی برای همکاری‌های سازمانی."],
  ["شبکه‌سازی", "اتصال تیم‌ها به متخصصان، مجموعه‌های همکار و فرصت‌های واقعی همکاری."],
  ["فضای ساخت و آزمون", "فضایی برای کار، تجربه، نمونه‌سازی و تبدیل ایده به خروجی قابل ارزیابی."],
];

const partners = [
  "کمیته امداد امام خمینی(ره)",
  "معاونت علمی، فناوری و اقتصاد دانش‌بنیان ریاست جمهوری",
  "ستاد توسعه فناوری‌های نرم و صنایع خلاق",
  "جایگاه همراه جدید",
  "جایگاه همراه جدید",
  "جایگاه همراه جدید",
];

const newsArt: NewsArtVariant[] = ["stage", "workshop", "lab"];

export default async function HomePage() {
  const now = new Date();
  const [publishedStartups, homeNews] = await Promise.all([
    db.startup.findMany({
      where: { deletedAt: null, status: "published" },
      orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { updatedAt: "desc" }],
      take: 4,
    }),
    db.news.findMany({
      where: {
        deletedAt: null,
        OR: [
          { status: "published" },
          { status: "scheduled", publishedAt: { lte: now } },
        ],
      },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
      take: 3,
    }),
  ]);

  const startupCount = await db.startup.count({ where: { deletedAt: null, status: "published" } });

  return (
    <main>
      <SiteHeader active="home" />

      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">خانه خلاق و نوآوری آینه</p>
            <h1>وطن<span>،</span> ساختنی است</h1>
            <p className="hero-lead">جایی برای شکل‌گیری، رشد و تبدیل ایده‌های خلاق به کسب‌وکارها و راهکارهای اثرگذار؛ با تمرکز بر ساختن، آزمودن و ایجاد اثر واقعی.</p>
            <div className="hero-actions">
              <a className="button button--primary" href="/startups">مشاهده استارتاپ‌ها</a>
              <a className="button button--secondary" href="/about">آشنایی با خانه خلاق</a>
            </div>
          </div>

          <div className="hero-visual" aria-label="تصویر محیط خلاق و نوآوری ایران">
            <div className="hero-photo-frame">
              <img src="/images/hero-home.webp" alt="جوانان ایرانی در محیط خلاق پیرامون نقشه ایران" />
            </div>
            <div className="hero-ornament" aria-hidden="true"><span /><i /><span /></div>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">درباره خانه خلاق</p>
            <h2>از ایده تا ساختن یک اثر واقعی</h2>
          </div>
          <div className="impact-grid">
            <article className="mission-card">
              <h3>ماموریت ما</h3>
              <p>کمک می‌کنیم ایده‌های خلاق از مرحله تصور عبور کنند، ساخته شوند، با واقعیت آزموده شوند و به راهکار یا کسب‌وکار اثرگذار برای خدمت به محرومان تبدیل شوند.</p>
            </article>
            <div className="metric-grid">
              <article className="metric"><strong>{startupCount.toLocaleString("fa-IR")}</strong><span>استارتاپ همراه</span></article>
              <article className="metric"><strong>+۱۲</strong><span>برنامه و رویداد</span></article>
              <article className="metric"><strong>+۳۰</strong><span>منتور و متخصص</span></article>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">استارتاپ‌های خانه خلاق</p>
            <h2>ایده‌هایی که وارد مرحله ساخت شده‌اند</h2>
            <p>پروفایل‌های این بخش مستقیماً از پنل مدیریت سایت به‌روزرسانی می‌شوند.</p>
          </div>
          <div className="startup-grid">
            {publishedStartups.map((startup) => (
              <article className="startup-card" key={startup.id}>
                <span className="tag">{startup.field}</span>
                <h3>{startup.name}</h3>
                <p>{startup.summary || "معرفی کوتاه این استارتاپ به‌زودی تکمیل می‌شود."}</p>
                <div className="card-divider" />
                <a href={`/startups/${startup.slug}`}>مشاهده پروفایل ←</a>
              </article>
            ))}
          </div>
          <a className="section-link" href="/startups">مشاهده همه استارتاپ‌ها ←</a>
        </div>
      </section>

      <section className="section section--white">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">برنامه‌های خانه خلاق</p>
            <h2>برنامه‌هایی برای ساختن، رشد کردن و متصل شدن</h2>
            <p>رویداد آینه یکی از برنامه‌های خانه خلاق است؛ در کنار دوره‌ها، شتابدهی، شبکه‌سازی و برنامه‌های توسعه کسب‌وکار.</p>
          </div>
          <div className="program-grid">
            {programs.map((program) => (
              <article className={`program-card${program.featured ? " program-card--featured" : ""}`} key={program.title}>
                <span className="tag">{program.tag}</span>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <a href={program.href}>{program.featured ? "ورود به صفحه رویداد" : "مشاهده جزئیات"} ←</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">خدمات و ظرفیت‌ها</p>
            <h2>برای ساختن، فقط ایده کافی نیست</h2>
            <p>خانه خلاق آینه مجموعه‌ای از ظرفیت‌های عملی را کنار هم می‌آورد تا تیم‌ها از مرحله ایده به اجرا و رشد برسند.</p>
          </div>
          <div className="service-grid">
            {services.map(([title, text], index) => (
              <article className={`service-card${index === 0 ? " service-card--featured" : ""}`} key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--white partners-section">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">همراهان خانه خلاق</p>
            <h2>با همراهی مجموعه‌هایی که ساختن را جدی می‌گیرند</h2>
          </div>
          <div className="partner-grid">
            {partners.map((partner, index) => (
              <article className="partner-card" key={`${partner}-${index}`}>
                <div className={`partner-mark partner-mark--${index + 1}`} aria-hidden="true" />
                <p>{partner}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section news-section">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">اخبار و فعالیت‌ها</p>
            <h2>خانه خلاق در جریان است</h2>
          </div>
          <div className="news-grid">
            {homeNews.map((item, index) => (
              <article className="news-card" key={item.id}>
                <NewsArt variant={newsArt[index % newsArt.length]} />
                <p className="news-meta">{newsCategoryLabels[item.category] || item.category}{item.publishedAt ? ` • ${formatPersianMonth(item.publishedAt)}` : ""}</p>
                <h3>{item.title}</h3>
                <a href={`/news/${item.slug}`}>مشاهده خبر</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
