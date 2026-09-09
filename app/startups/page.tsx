import { SiteFooter, SiteHeader } from "../../components/site-chrome";

const categories = ["همه", "فناوری نرم", "صنایع خلاق", "محتوا و رسانه", "خدمات اجتماعی"];

const startups = [
  ["استارتاپ نمونه ۰۱", "فناوری نرم"],
  ["استارتاپ نمونه ۰۲", "صنایع خلاق"],
  ["استارتاپ نمونه ۰۳", "محتوا و رسانه"],
  ["استارتاپ نمونه ۰۴", "خدمات اجتماعی"],
  ["استارتاپ نمونه ۰۵", "فناوری نرم"],
  ["استارتاپ نمونه ۰۶", "صنایع خلاق"],
  ["استارتاپ نمونه ۰۷", "محتوا و رسانه"],
  ["استارتاپ نمونه ۰۸", "خدمات اجتماعی"],
];

const journey = [
  ["معرفی تیم", "ثبت اطلاعات اولیه، محصول یا ایده و مسئله‌ای که تیم روی آن کار می‌کند."],
  ["بررسی و پذیرش", "بررسی تناسب تیم با ظرفیت‌ها، برنامه‌ها و شبکه همراهان خانه خلاق."],
  ["همراهی و رشد", "منتورینگ، اتصال به شبکه، توسعه محصول و نمایش دستاوردها."],
];

export default function StartupsPage() {
  return (
    <div className="public-page">
      <SiteHeader active="startups" />
      <main className="public-page__main">
        <section className="public-hero">
          <div className="shell public-hero__row">
            <div className="hero-stat-pair" aria-label="آمار استارتاپ‌ها">
              <article className="hero-stat hero-stat--filled">
                <strong>+۲۰</strong>
                <span>استارتاپ همراه</span>
              </article>
              <article className="hero-stat">
                <strong>+۳۰</strong>
                <span>منتور و متخصص</span>
              </article>
            </div>
            <div className="public-hero__copy">
              <p className="eyebrow">استارتاپ‌های خانه خلاق</p>
              <h1>ایده‌هایی که وارد مرحله ساخت شده‌اند</h1>
              <p>در این صفحه تیم‌ها و استارتاپ‌های همراه خانه خلاق آینه معرفی می‌شوند؛ هر تیم می‌تواند پروفایل مستقل، محصول، حوزه فعالیت، دستاوردها و مسیر رشد خود را داشته باشد.</p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="shell">
            <div className="section-intro section-intro--compact">
              <p className="eyebrow">استارتاپ منتخب</p>
              <h2>یک معرفی کامل‌تر برای تیم منتخب</h2>
            </div>
            <article className="featured-startup">
              <div className="featured-startup__visual" aria-hidden="true">
                <strong>از ایده<br />تا اثر</strong>
              </div>
              <div className="featured-startup__body">
                <h3>نام استارتاپ منتخب</h3>
                <p>این بخش در نسخه واقعی برای معرفی کوتاه محصول، مسئله‌ای که حل می‌کند، تیم، مرحله رشد و مهم‌ترین دستاوردهای استارتاپ استفاده می‌شود.</p>
                <a href="/startups/sample-01">مشاهده پروفایل کامل ←</a>
              </div>
            </article>
          </div>
        </section>

        <section className="content-section content-section--white">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">همه استارتاپ‌ها</p>
              <h2>تیم‌ها و کسب‌وکارهای همراه خانه خلاق</h2>
              <p>در سایت نهایی این فهرست از پنل مدیریت قابل اضافه‌کردن، حذف، جابه‌جایی و فیلتر شدن خواهد بود.</p>
            </div>
            <div className="filter-row" aria-label="فیلتر استارتاپ‌ها">
              {categories.map((category, index) => (
                <span className={`filter-chip${index === 0 ? " filter-chip--active" : ""}`} key={category}>{category}</span>
              ))}
            </div>
            <div className="directory-grid">
              {startups.map(([title, category], index) => (
                <article className="directory-card" key={title}>
                  <span className="tag">{category}</span>
                  <h3>{title}</h3>
                  <p>معرفی کوتاه محصول یا راهکار استارتاپ و مسئله‌ای که برای آن راه‌حل ساخته است.</p>
                  <div className="directory-card__divider" />
                  <a href={`/startups/sample-${String(index + 1).padStart(2, "0")}`}>مشاهده پروفایل ←</a>
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
              <p>فرآیند واقعی می‌تواند بعداً بر اساس مدل پذیرش خانه خلاق دقیق‌تر شود.</p>
            </div>
            <div className="three-card-grid">
              {journey.map(([title, text], index) => (
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
