import { NewsArt, type NewsArtVariant } from "../components/news-art";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import { formatPersianMonth, newsCategoryLabels, programTypeLabels } from "../lib/content-utils";
import { db } from "../lib/db";
import { getHomepageSettings, splitStoredIds } from "../lib/homepage-settings";

export const dynamic = "force-dynamic";

const services = [
  ["منتورینگ و راهبری", "همراهی متخصصان برای تصمیم‌های کلیدی محصول، بازار و مدل کسب‌وکار."],
  ["توسعه کسب‌وکار", "طراحی مسیر رشد، بازارسازی و آماده‌سازی برای همکاری‌های سازمانی."],
  ["شبکه‌سازی", "اتصال تیم‌ها به متخصصان، مجموعه‌های همکار و فرصت‌های واقعی همکاری."],
  ["فضای ساخت و آزمون", "فضایی برای کار، تجربه، نمونه‌سازی و تبدیل ایده به خروجی قابل ارزیابی."],
];
const newsArt: NewsArtVariant[] = ["stage", "workshop", "lab"];

function prependUnique<T extends { id: string }>(selected: T | null, items: T[], take: number) {
  const result: T[] = [];
  if (selected) result.push(selected);
  for (const item of items) if (!result.some((entry) => entry.id === item.id)) result.push(item);
  return result.slice(0, take);
}

function plusMetric(value: string | null | undefined, fallback: string) {
  const normalized = (value || fallback).trim();
  return normalized.startsWith("+") ? normalized : `+${normalized}`;
}

function renderHeroTitle(title: string) {
  const commaIndex = title.indexOf("،");
  if (commaIndex < 0) return title;
  return (
    <>
      {title.slice(0, commaIndex)}
      <span>،</span>
      {title.slice(commaIndex + 1)}
    </>
  );
}

export default async function HomePage() {
  const now = new Date();
  const settings = await getHomepageSettings();
  const selectedStartupId = splitStoredIds(settings.featuredStartupIds)[0];
  const publicNewsWhere = { deletedAt: null, OR: [{ status: "published" }, { status: "scheduled", publishedAt: { lte: now } }] };
  const publicProgramWhere = { deletedAt: null, status: { in: ["published", "active"] } };

  const [defaultStartups, defaultNews, defaultPrograms, homePartners, startupCount, programCount, selectedStartup, selectedNews, selectedProgram, heroMedia] = await Promise.all([
    db.startup.findMany({ where: { deletedAt: null, status: "published" }, orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { updatedAt: "desc" }], take: 4 }),
    db.news.findMany({ where: publicNewsWhere, orderBy: [{ featured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }], take: 3 }),
    db.program.findMany({ where: publicProgramWhere, orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { updatedAt: "desc" }], take: 3 }),
    db.partner.findMany({ where: { deletedAt: null, status: "active" }, orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { updatedAt: "desc" }], take: 6 }),
    db.startup.count({ where: { deletedAt: null, status: "published" } }),
    db.program.count({ where: publicProgramWhere }),
    selectedStartupId ? db.startup.findFirst({ where: { id: selectedStartupId, deletedAt: null, status: "published" } }) : Promise.resolve(null),
    settings.featuredNewsSlug ? db.news.findFirst({ where: { slug: settings.featuredNewsSlug, ...publicNewsWhere } }) : Promise.resolve(null),
    settings.featuredProgramSlug ? db.program.findFirst({ where: { slug: settings.featuredProgramSlug, ...publicProgramWhere } }) : Promise.resolve(null),
    settings.heroMediaId ? db.media.findUnique({ where: { id: settings.heroMediaId } }) : Promise.resolve(null),
  ]);

  const publishedStartups = prependUnique(selectedStartup, defaultStartups, 4);
  const homeNews = prependUnique(selectedNews, defaultNews, 3);
  const homePrograms = prependUnique(selectedProgram, defaultPrograms, 3);
  const logoIds = homePartners.map((partner) => partner.logoMediaId).filter((id): id is string => Boolean(id));
  const logoMedia = logoIds.length ? await db.media.findMany({ where: { id: { in: logoIds } } }) : [];
  const logoById = new Map(logoMedia.map((item) => [item.id, item]));
  const partnerSlots: Array<(typeof homePartners)[number] | null> = [...homePartners];
  while (partnerSlots.length < 6) partnerSlots.push(null);

  return (
    <main className="home-page">
      <SiteHeader active="home" />
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{settings.heroEyebrow}</p>
            <h1>{renderHeroTitle(settings.heroTitle)}</h1>
            <p className="hero-lead">{settings.heroSubtitle}</p>
            <div className="hero-actions">
              <a className="button button--primary" href={settings.heroPrimaryHref || "/startups"}>{settings.heroPrimaryLabel || "مشاهده استارتاپ‌ها"}</a>
              <a className="button button--secondary" href={settings.heroSecondaryHref || "/about"}>{settings.heroSecondaryLabel || "آشنایی با خانه خلاق"}</a>
            </div>
          </div>
          <div className="hero-visual" aria-label="تصویر محیط خلاق و نوآوری ایران">
            <div className="hero-photo-frame">
              <img
                src={heroMedia ? `/uploads/${heroMedia.storageKey}` : "/figma-home-hero.jpg"}
                alt="جوانان ایرانی در محیط خلاق پیرامون نقشه ایران"
              />
            </div>
            <div className="hero-ornament" aria-hidden="true"><span /><i /><span /></div>
          </div>
        </div>
      </section>

      <section className="section section--white home-about">
        <div className="shell">
          <div className="section-heading"><p className="eyebrow">درباره خانه خلاق</p><h2>از ایده تا ساختن یک اثر واقعی</h2></div>
          <div className="impact-grid">
            <article className="mission-card"><h3>ماموریت ما</h3><p>کمک می‌کنیم ایده‌های خلاق از مرحله تصور عبور کنند، ساخته شوند، با واقعیت آزموده شوند و به راهکار یا کسب‌وکار اثرگذار برای خدمت به محرومان تبدیل شوند.</p></article>
            <div className="metric-grid">
              <article className="metric"><strong>{plusMetric(settings.statStartups, startupCount.toLocaleString("fa-IR"))}</strong><span>استارتاپ همراه</span></article>
              <article className="metric"><strong>{plusMetric(settings.statPrograms, programCount.toLocaleString("fa-IR"))}</strong><span>برنامه و رویداد</span></article>
              <article className="metric"><strong>+۳۰</strong><span>منتور و متخصص</span></article>
            </div>
          </div>
        </div>
      </section>

      <section className="section home-startups"><div className="shell"><div className="section-heading"><p className="eyebrow">استارتاپ‌های خانه خلاق</p><h2>ایده‌هایی که وارد مرحله ساخت شده‌اند</h2><p>هر استارتاپ در سایت نهایی پروفایل مستقل، معرفی محصول، حوزه فعالیت، دستاوردها و مسیر ارتباطی خواهد داشت.</p></div><div className="startup-grid">{publishedStartups.map((startup) => <article className="startup-card" key={startup.id}><span className="tag">پروفایل استارتاپ</span><h3>{startup.name}</h3><p>{startup.summary || "معرفی کوتاه محصول یا راهکار استارتاپ و مسئله‌ای که برای آن راه‌حل ساخته است."}</p><div className="card-divider" /><a href={`/startups/${startup.slug}`}>مشاهده پروفایل ←</a></article>)}</div><a className="section-link" href="/startups">مشاهده همه استارتاپ‌ها ←</a></div></section>

      <section className="section section--white home-programs"><div className="shell"><div className="section-heading"><p className="eyebrow">برنامه‌های خانه خلاق</p><h2>برنامه‌هایی برای ساختن، رشد کردن و متصل شدن</h2><p>رویداد آینه یکی از برنامه‌های خانه خلاق است؛ در کنار دوره‌ها، شتابدهی، شبکه‌سازی و برنامه‌های توسعه کسب‌وکار.</p></div><div className="program-grid">{homePrograms.map((program) => <article className={`program-card${program.id === selectedProgram?.id || program.featured ? " program-card--featured" : ""}`} key={program.id}><span className="tag">{programTypeLabels[program.type] || program.type}</span><h3>{program.title}</h3><p>{program.summary || "اطلاعات این برنامه به‌زودی تکمیل می‌شود."}</p><a href={`/programs/${program.slug}`}>{program.id === selectedProgram?.id || program.featured ? "ورود به صفحه برنامه" : "مشاهده جزئیات"} ←</a></article>)}</div></div></section>

      <section className="section home-services"><div className="shell"><div className="section-heading"><p className="eyebrow">خدمات و ظرفیت‌ها</p><h2>برای ساختن، فقط ایده کافی نیست</h2><p>خانه خلاق آینه مجموعه‌ای از ظرفیت‌های عملی را کنار هم می‌آورد تا تیم‌ها از مرحله ایده به اجرا و رشد برسند.</p></div><div className="service-grid">{services.map(([title, text], index) => <article className={`service-card${index === 0 ? " service-card--featured" : ""}`} key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="section section--white partners-section" id="partners"><div className="shell"><div className="section-heading"><p className="eyebrow">همراهان خانه خلاق</p><h2>با همراهی مجموعه‌هایی که ساختن را جدی می‌گیرند</h2></div><div className="partner-grid">{partnerSlots.map((partner, index) => {
        if (!partner) return <article className="partner-card partner-card--placeholder" key={`partner-placeholder-${index}`}><div className={`partner-mark partner-mark--${(index % 6) + 1}`} aria-hidden="true" /><p>جایگاه همراه جدید</p></article>;
        const logo = partner.logoMediaId ? logoById.get(partner.logoMediaId) : undefined;
        return <article className="partner-card" key={partner.id}><div className={`partner-mark partner-mark--${(index % 6) + 1}`} aria-hidden={!logo}>{logo ? <img src={`/uploads/${logo.storageKey}`} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "50%" }} /> : null}</div><p>{partner.name}</p></article>;
      })}</div></div></section>

      <section className="section news-section"><div className="shell"><div className="section-heading"><p className="eyebrow">اخبار و فعالیت‌ها</p><h2>خانه خلاق در جریان است</h2></div><div className="news-grid">{homeNews.map((item, index) => <article className="news-card" key={item.id}><NewsArt variant={newsArt[index % newsArt.length]} /><p className="news-meta">{newsCategoryLabels[item.category] || item.category}{item.publishedAt ? ` • ${formatPersianMonth(item.publishedAt)}` : ""}</p><h3>{item.title}</h3><a href={`/news/${item.slug}`}>مشاهده خبر</a></article>)}</div></div></section>
      <SiteFooter />
    </main>
  );
}
