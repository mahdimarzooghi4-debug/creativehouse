import { SiteFooter, SiteHeader } from "../../../components/site-chrome";

const programNames: Record<string, { title: string; visual: string; description: string }> = {
  ayene: {
    title: "رویداد ملی خلاقیت و نوآوری آینه",
    visual: "آینه",
    description: "یک مسیر مسئله‌محور برای تبدیل نیازهای واقعی به راهکارهای قابل اجرا؛ با همراهی منتورها، متخصصان و شبکه خانه خلاق آینه.",
  },
  growth: {
    title: "برنامه رشد و شتابدهی",
    visual: "رشد",
    description: "یک مسیر عملی برای اعتبارسنجی ایده، ساخت محصول، پیدا کردن مدل رشد و آماده‌شدن برای ورود به بازار؛ با همراهی منتورها و متخصصان خانه خلاق آینه.",
  },
  workshops: { title: "کارگاه‌های تخصصی", visual: "کارگاه", description: "کارگاه‌های کاربردی و مسئله‌محور برای تقویت مهارت‌های ساخت محصول، بازار، برند و توسعه کسب‌وکار." },
  networking: { title: "شبکه‌سازی و توسعه بازار", visual: "اتصال", description: "مسیر اتصال تیم‌ها به سازمان‌ها، متخصصان، شرکای اجرایی و فرصت‌های واقعی توسعه بازار." },
  bootcamp: { title: "بوت‌کمپ مسئله‌محور", visual: "ساخت", description: "یک مسیر فشرده برای تعریف مسئله، ساخت فرضیه، ایده‌پردازی و رسیدن به نمونه اولیه قابل آزمون." },
  talks: { title: "نشست‌های تجربه و الهام", visual: "تجربه", description: "گفت‌وگو با سازندگان و کارآفرینان برای انتقال تجربه واقعی، یادگیری از مسیر ساختن و توسعه شبکه." },
};

const outcomes = [
  ["نقشه اعتبارسنجی", "فرضیه‌ها، مشتریان کلیدی و نتایج آزمون‌های واقعی در یک چارچوب روشن."],
  ["نسخه قابل ارائه", "نمونه اولیه یا نسخه بهبودیافته محصول که بتوان آن را به مشتری یا شریک نشان داد."],
  ["برنامه رشد", "اولویت‌های بازار، مدل درآمدی و اقدام‌های بعدی برای سه ماه آینده."],
];

const journey = [
  ["شناخت و هدف‌گذاری", "تعریف مسئله، مشتری و معیار موفقیت."],
  ["اعتبارسنجی", "آزمون فرضیه‌ها و جمع‌آوری شواهد واقعی."],
  ["ساخت و بهبود", "توسعه نمونه اولیه و اصلاح تجربه محصول."],
  ["رشد و ارائه", "برنامه بازار، ارائه نهایی و مسیر ادامه."],
];

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = programNames[slug] ?? programNames.growth;

  return (
    <div className="public-page">
      <SiteHeader active="programs" />
      <main className="public-page__main">
        <section className="program-detail-hero">
          <div className="shell program-detail-hero__grid">
            <div className="program-detail-visual" aria-hidden="true">
              <span className="program-detail-visual__navy" />
              <span className="program-detail-visual__coral" />
              <span className="program-detail-visual__gold" />
              <strong>{program.visual}</strong>
              <p>{program.title}</p>
            </div>
            <div className="program-detail-copy">
              <p className="eyebrow">جزئیات برنامه</p>
              <h1>{program.title}</h1>
              <p>{program.description}</p>
              <div className="program-detail-actions">
                <span className="program-detail-status">در حال پذیرش</span>
                <span className="program-detail-status">۸ هفته</span>
                <div className="program-detail-buttons">
                  <a className="button button--primary" href="/collaboration">درخواست حضور</a>
                  <a className="button button--secondary" href="/programs">بازگشت به برنامه‌ها</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="program-overview">
          <div className="shell">
            <div className="section-intro section-intro--compact">
              <p className="eyebrow">درباره برنامه</p>
              <h2>از ایده تا یک مسیر رشد قابل اندازه‌گیری</h2>
            </div>
            <div className="program-overview-grid">
              <article className="program-goal">
                <p className="eyebrow">هدف برنامه</p>
                <h3>ساختن شواهد واقعی برای رشد</h3>
                <p>تیم‌ها در طول برنامه مسئله، مشتری، راهکار و مدل کسب‌وکار خود را با آزمون‌های واقعی اعتبارسنجی می‌کنند و در پایان یک برنامه اجرایی روشن برای ادامه مسیر دارند.</p>
              </article>
              <div className="program-metrics">
                <article className="program-metric"><strong>۸ هفته</strong><span>مدت برنامه</span></article>
                <article className="program-metric"><strong>۱۲ جلسه</strong><span>منتورینگ و کارگاه</span></article>
                <article className="program-metric"><strong>۳ خروجی</strong><span>قابل ارائه</span></article>
              </div>
            </div>
          </div>
        </section>

        <section className="program-outcomes">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">خروجی‌های برنامه</p>
              <h2>در پایان چه چیزی دارید؟</h2>
            </div>
            <div className="program-outcome-grid">
              {outcomes.map(([title, text]) => (
                <article className="program-outcome-card" key={title}>
                  <div className="program-outcome-card__accent" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="program-journey">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">مسیر اجرا</p>
              <h2>چهار مرحله تا خروجی نهایی</h2>
            </div>
            <div className="program-journey-grid">
              {journey.map(([title, text], index) => (
                <article className="program-journey-card" key={title}>
                  <span>{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="program-participation">
          <div className="shell">
            <div className="section-intro section-intro--compact">
              <p className="eyebrow">برای چه تیم‌هایی؟</p>
              <h2>اگر آماده آزمون واقعی هستید، این برنامه برای شماست</h2>
            </div>
            <div className="program-participation-grid">
              <article className="program-participation-card">
                <h3>مناسب برای</h3>
                <p>تیم‌های اولیه و استارتاپ‌های نوپا<br />محصولات خلاق و فناوری نرم<br />تیم‌هایی که مشتری یا مسئله مشخص دارند</p>
              </article>
              <article className="program-participation-card">
                <h3>زمان‌بندی نمونه</h3>
                <p>ثبت درخواست: تا ۲۰ مهر ۱۴۰۵<br />شروع برنامه: ۲۸ مهر ۱۴۰۵<br />ارائه نهایی: نیمه دوم آذر ۱۴۰۵</p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
