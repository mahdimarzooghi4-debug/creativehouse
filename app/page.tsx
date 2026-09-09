const startups = Array.from({ length: 4 }, (_, index) => ({
  id: index + 1,
  title: "نام استارتاپ",
  description: "معرفی کوتاه محصول یا راهکار استارتاپ و مسئله‌ای که برای آن راه‌حل ساخته است.",
}));

const programs = [
  {
    title: "رویداد ملی خلاقیت و نوآوری آینه",
    tag: "برنامه ویژه",
    description: "مسیر تبدیل مسئله‌های واقعی به راهکارهای قابل اجرا؛ با صفحه اختصاصی رویداد و فرآیند ثبت‌نام مستقل.",
    featured: true,
  },
  {
    title: "برنامه رشد و شتابدهی",
    tag: "توسعه کسب‌وکار",
    description: "منتورینگ، اعتبارسنجی، طراحی مسیر رشد و آماده‌سازی برای توسعه بازار و همکاری‌های سازمانی.",
  },
  {
    title: "کارگاه‌ها و شبکه‌سازی",
    tag: "جامعه خلاق",
    description: "نشست‌ها، کارگاه‌های تخصصی و اتصال استارتاپ‌ها به منتورها، متخصصان و مجموعه‌های همکار.",
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

const news = [
  {
    meta: "برنامه‌ها • شهریور ۱۴۰۵",
    title: "نخستین گردهمایی تیم‌های منتخب خانه خلاق آینه برگزار شد",
    image: "/images/news-1.svg",
  },
  {
    meta: "استارتاپ‌ها • مرداد ۱۴۰۵",
    title: "سه تیم خلاق وارد مرحله منتورینگ و توسعه محصول شدند",
    image: "/images/news-2.svg",
  },
  {
    meta: "گزارش فعالیت • تیر ۱۴۰۵",
    title: "یک روز از کارگاه مسئله‌محور خانه خلاق؛ از ایده تا نمونه اولیه",
    image: "/images/news-3.svg",
  },
];

function Brand() {
  return (
    <a className="brand" href="/" aria-label="خانه خلاق و نوآوری آینه">
      <span className="brand__title">خانه خلاق و نوآوری <b>آینه</b></span>
      <img className="brand__logo" src="/images/brand-creative-house.png" alt="" />
    </a>
  );
}

function Header() {
  return (
    <header className="site-header shell">
      <Brand />
      <nav className="main-nav" aria-label="ناوبری اصلی">
        <a href="/">خانه</a>
        <a href="/about">درباره ما</a>
        <a href="/startups">استارتاپ‌ها</a>
        <a href="/programs">برنامه‌ها</a>
        <a href="/news">اخبار</a>
      </nav>
      <a className="button button--primary header-cta" href="/collaboration">همکاری با ما</a>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Brand />
          <p className="footer-slogan">وطن<span>،</span> ساختنی است</p>
        </div>
        <div>
          <h3>برنامه‌ها</h3>
          <a href="/programs">همه برنامه‌ها</a>
          <a href="/programs/ayene">رویداد آینه</a>
          <a href="/programs">برنامه‌های آینده</a>
        </div>
        <div>
          <h3>خانه خلاق</h3>
          <a href="/about">درباره ما</a>
          <a href="/startups">استارتاپ‌ها</a>
          <a href="/news">اخبار و رسانه</a>
          <a href="/licenses">مجوزها و تأییدیه‌ها</a>
        </div>
        <div className="footer-contact">
          <h3>ارتباط با ما</h3>
          <p>آدرس: تهران، خیابان انقلاب، خیابان رازی، کوچه شهبازیان، پلاک ۲۲</p>
          <p>تلفن: ۰۲۱-۶۶۴۸۵۳۷۴</p>
          <p>تلفن: ۰۲۱-۶۶۴۰۶۴۷۵</p>
          <p>ایمیل: info@ayenehouse.ir</p>
        </div>
      </div>
      <div className="shell footer-bottom">تمام حقوق برای خانه خلاق و نوآوری آینه محفوظ است</div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main>
      <Header />

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
              <img src="/images/hero-home.png" alt="جوانان ایرانی در محیط خلاق پیرامون نقشه ایران" />
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
              <article className="metric"><strong>+۲۰</strong><span>استارتاپ همراه</span></article>
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
            <p>هر استارتاپ در سایت نهایی پروفایل مستقل، معرفی محصول، حوزه فعالیت، دستاوردها و مسیر ارتباطی خواهد داشت.</p>
          </div>
          <div className="startup-grid">
            {startups.map((startup) => (
              <article className="startup-card" key={startup.id}>
                <span className="tag">پروفایل استارتاپ</span>
                <h3>{startup.title}</h3>
                <p>{startup.description}</p>
                <div className="card-divider" />
                <a href={`/startups/${startup.id}`}>مشاهده پروفایل ←</a>
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
                <a href="/programs">{program.featured ? "ورود به صفحه رویداد" : "مشاهده جزئیات"} ←</a>
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
            {news.map((item, index) => (
              <article className="news-card" key={item.title}>
                <div className="news-image">
                  <img src={item.image} alt="" />
                  <span aria-hidden="true">{index + 1}</span>
                </div>
                <p className="news-meta">{item.meta}</p>
                <h3>{item.title}</h3>
                <a href={`/news/${index + 1}`}>مشاهده خبر</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
