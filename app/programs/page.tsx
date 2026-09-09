import { SiteFooter, SiteHeader } from "../../components/site-chrome";

const filters = ["همه", "رویدادها", "رشد و شتابدهی", "کارگاه‌ها"];

const programs = [
  {
    title: "رویداد ملی آینه",
    description: "حل مسئله‌های واقعی و تبدیل آن‌ها به راهکارهای قابل اجرا.",
    href: "/programs/ayene",
    featured: true,
  },
  {
    title: "برنامه رشد و شتابدهی",
    description: "منتورینگ، اعتبارسنجی و طراحی مسیر توسعه برای تیم‌ها و استارتاپ‌ها.",
    href: "/programs/growth",
  },
  {
    title: "کارگاه‌های تخصصی",
    description: "کارگاه‌های کاربردی برای ساخت محصول، بازار، برند و توسعه کسب‌وکار.",
    href: "/programs/workshops",
  },
  {
    title: "شبکه‌سازی و توسعه بازار",
    description: "اتصال تیم‌ها به سازمان‌ها، متخصصان، سرمایه‌گذاران و شرکای بالقوه.",
    href: "/programs/networking",
  },
  {
    title: "بوت‌کمپ مسئله‌محور",
    description: "یک مسیر فشرده برای تعریف مسئله، ایده‌پردازی و ساخت نمونه اولیه.",
    href: "/programs/bootcamp",
  },
  {
    title: "نشست‌های تجربه و الهام",
    description: "گفت‌وگو با کارآفرینان و سازندگان برای انتقال تجربه‌های واقعی ساختن.",
    href: "/programs/talks",
  },
];

const cycle = [
  ["فراخوان و ثبت‌نام", "انتخاب مخاطب و دریافت درخواست‌ها"],
  ["اجرا و همراهی", "منتورینگ، کارگاه و توسعه راهکار"],
  ["ارزیابی و ارائه", "سنجش خروجی و اتصال به فرصت بعدی"],
];

export default function ProgramsPage() {
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
                <article className="programs-stat programs-stat--filled"><strong>+۱۲</strong><span>برنامه و رویداد</span></article>
                <article className="programs-stat"><strong>۳</strong><span>مسیر فعال</span></article>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="shell">
            <div className="section-intro section-intro--compact">
              <p className="eyebrow">برنامه منتخب</p>
              <h2>رویداد ملی خلاقیت و نوآوری آینه</h2>
            </div>
            <article className="featured-program">
              <div className="featured-program__copy">
                <span className="tag">برنامه ویژه</span>
                <h3>رویداد ملی خلاقیت و نوآوری آینه</h3>
                <p>یک مسیر مسئله‌محور برای تبدیل نیازهای واقعی به راهکارهای قابل اجرا؛ با فرآیند ثبت‌نام، پیگیری و صفحه اختصاصی رویداد.</p>
                <a href="/programs/ayene">ورود به صفحه رویداد ←</a>
              </div>
              <div className="featured-program__visual" aria-hidden="true"><strong>از مسئله<br />تا راهکار</strong></div>
            </article>
          </div>
        </section>

        <section className="content-section content-section--white content-section--large">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">همه برنامه‌ها</p>
              <h2>برنامه‌ای متناسب با مرحله‌ای که در آن هستید</h2>
              <p>برنامه‌ها در سایت نهایی از پنل مدیریت قابل افزودن، جایگزینی، زمان‌بندی و آرشیو خواهند بود.</p>
            </div>
            <div className="filter-row" aria-label="فیلتر برنامه‌ها">
              {filters.map((filter, index) => <span className={`filter-chip${index === 0 ? " filter-chip--active" : ""}`} key={filter}>{filter}</span>)}
            </div>
            <div className="program-directory-grid">
              {programs.map((program) => (
                <article className={`program-directory-card${program.featured ? " program-directory-card--featured" : ""}`} key={program.title}>
                  <span className="tag">جامعه خلاق</span>
                  <h3>{program.title}</h3>
                  <p>{program.description}</p>
                  <a href={program.href}>{program.featured ? "ورود به برنامه" : "مشاهده جزئیات"} ←</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section program-cycle">
          <div className="shell">
            <div className="section-intro section-intro--compact">
              <p className="eyebrow">چرخه یک برنامه</p>
              <h2>از فراخوان تا خروجی قابل ارائه</h2>
            </div>
            <div className="three-card-grid">
              {cycle.map(([title, text], index) => (
                <article className="step-card" key={title}>
                  <span className="step-card__number">{index + 1}</span>
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
