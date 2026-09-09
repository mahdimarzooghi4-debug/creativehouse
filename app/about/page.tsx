import { SiteFooter, SiteHeader } from "../../components/site-chrome";

const values = [
  { title: "مسئله‌محوری", text: "شروع از یک نیاز یا مسئله واقعی، نه صرفاً یک ایده جذاب.", accent: "" },
  { title: "ساختن", text: "حرکت سریع از گفتگو به نمونه، تجربه و خروجی قابل ارزیابی.", accent: " info-card__accent--gold" },
  { title: "همکاری", text: "ساختن در کنار تیم‌ها، متخصصان، سازمان‌ها و شبکه همراهان.", accent: " info-card__accent--blue" },
  { title: "اثرگذاری", text: "سنجیدن ارزش کار با تغییری که در دنیای واقعی ایجاد می‌کند.", accent: " info-card__accent--green" },
];

const model = [
  ["مسئله واقعی", "شناخت دقیق نیاز، زمینه و ذی‌نفعان."],
  ["ایده و تیم", "شکل‌دادن راهکار و کنار هم قرار دادن توانمندی‌ها."],
  ["ساخت و آزمون", "تبدیل ایده به نمونه و مواجهه با بازخورد واقعی."],
  ["رشد و اثر", "بهبود مدل، توسعه همکاری و آماده‌شدن برای مقیاس."],
];

const audience = [
  ["تیم‌ها و استارتاپ‌ها", "تیم‌هایی که می‌خواهند ایده یا محصول خود را در میدان واقعی بسازند و رشد دهند."],
  ["سازمان‌ها و مجموعه‌ها", "مجموعه‌هایی که مسئله، ظرفیت همکاری یا فرصت اجرای یک راهکار خلاق دارند."],
  ["متخصصان و منتورها", "افرادی که تجربه و دانش خود را برای ساختن راهکارهای بهتر وارد شبکه می‌کنند."],
];

export default function AboutPage() {
  return (
    <div className="public-page">
      <SiteHeader active="about" />
      <main className="public-page__main">
        <section className="identity-hero">
          <div className="shell identity-hero__grid">
            <div className="identity-panel" aria-hidden="true">
              <span className="identity-panel__coral" />
              <span className="identity-panel__gold" />
              <div className="identity-panel__text">
                <p className="identity-panel__kicker">خانه خلاق و نوآوری آینه</p>
                <h2>از ایده<br />تا اثر</h2>
                <p className="identity-panel__caption">ساختن، آزمودن، یادگرفتن و رشد کردن</p>
              </div>
            </div>
            <div className="identity-copy">
              <p className="eyebrow">درباره خانه خلاق</p>
              <h1>جایی برای ساختن، آزمودن<br />و اثر گذاشتن</h1>
              <p>خانه خلاق و نوآوری آینه به عنوان بازوی نوآوری کمیته امداد امام خمینی(ره) فضایی برای تبدیل ایده‌های خلاق به راهکارها و کسب‌وکارهای قابل اجراست؛ جایی که تیم‌ها با مسئله‌های واقعی روبه‌رو می‌شوند، می‌سازند، می‌آزمایند و رشد می‌کنند.</p>
              <div className="slogan-chip">وطن<span>،</span>&nbsp; ساختنی است</div>
            </div>
          </div>
        </section>

        <section className="content-section content-section--white">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">ماموریت و چشم‌انداز</p>
              <h2>چرا خانه خلاق آینه وجود دارد؟</h2>
            </div>
            <div className="two-card-grid">
              <article className="purpose-card">
                <p className="eyebrow">چشم‌انداز ما</p>
                <h3>شبکه‌ای از سازندگان مسئله‌محور</h3>
                <p>جایی که استعدادهای خلاق، متخصصان و سازمان‌ها کنار هم قرار می‌گیرند تا راه‌حل‌های ماندگار برای مسائل واقعی بسازند.</p>
              </article>
              <article className="purpose-card purpose-card--featured">
                <p className="eyebrow">ماموریت ما</p>
                <h3>ایده را به ساختن نزدیک کنیم</h3>
                <p>تیم‌ها را در مسیر فهم مسئله، ساخت نمونه، آزمون با واقعیت و تبدیل خروجی به راهکار یا کسب‌وکار اثرگذار همراه می‌کنیم.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">ارزش‌های ما</p>
              <h2>چطور کار می‌کنیم؟</h2>
              <p>این چهار اصل در طراحی برنامه‌ها، انتخاب همکاری‌ها و همراهی با تیم‌ها برای ما ثابت است.</p>
            </div>
            <div className="four-card-grid">
              {values.map((item) => (
                <article className="info-card" key={item.title}>
                  <div className={`info-card__accent${item.accent}`} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section content-section--white">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">مدل همراهی</p>
              <h2>از مسئله تا اثر، یک مسیر پیوسته</h2>
              <p>هر برنامه ممکن است شکل متفاوتی داشته باشد، اما منطق حرکت ما همیشه بر ساختن و آزمودن استوار است.</p>
            </div>
            <div className="four-card-grid model-grid">
              {model.map(([title, text], index) => (
                <article className="step-card" key={title}>
                  <span className="step-card__number">{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">برای چه کسانی؟</p>
              <h2>با سازندگانی همراه می‌شویم که آماده عمل‌اند</h2>
            </div>
            <div className="three-card-grid audience-grid">
              {audience.map(([title, text]) => (
                <article className="info-card" key={title}>
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
