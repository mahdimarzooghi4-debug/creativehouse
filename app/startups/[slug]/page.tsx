import { SiteFooter, SiteHeader } from "../../../components/site-chrome";

const productCards = [
  ["مسئله", "فرآیند فعلی برای کاربران زمان‌بر، پراکنده و فاقد تجربه یکپارچه است؛ نتیجه آن کاهش سرعت و کیفیت تصمیم‌گیری است."],
  ["راهکار", "یک راهکار دیجیتال ساده که جریان کار را شفاف می‌کند، داده‌ها را یکجا جمع می‌کند و ارتباط میان ذی‌نفعان را سریع‌تر می‌سازد."],
  ["محصول", "نسخه اولیه محصول برای آزمون با کاربر واقعی آماده شده و مسیر توسعه آن بر اساس بازخورد، داده و نیاز بازار ادامه پیدا می‌کند."],
];

const milestones = [
  ["تعریف مسئله", "شناخت دقیق مسئله و کاربران هدف"],
  ["نمونه اولیه", "طراحی و ساخت نسخه قابل آزمون"],
  ["اعتبارسنجی", "آزمون با کاربر و اصلاح محصول"],
  ["رشد و بازار", "مدل درآمد، توسعه بازار و همکاری"],
];

const team = [
  ["م", "مهدی نمونه", "هم‌بنیان‌گذار و مدیر محصول"],
  ["س", "سارا نمونه", "طراح محصول و تجربه کاربر"],
  ["ع", "علی نمونه", "توسعه‌دهنده و مسئول فنی"],
];

export default function StartupDetailPage() {
  return (
    <div className="public-page">
      <SiteHeader active="startups" />
      <main className="public-page__main">
        <section className="startup-detail-hero">
          <div className="shell startup-detail-hero__grid">
            <div className="startup-detail-visual" aria-hidden="true">
              <span className="startup-detail-visual__navy" />
              <span className="startup-detail-visual__coral" />
              <span className="startup-detail-visual__gold" />
              <strong>نمونه ۰۱</strong>
              <p>لوگو / هویت بصری استارتاپ</p>
            </div>
            <div className="startup-detail-copy">
              <p className="eyebrow">پروفایل استارتاپ</p>
              <h1>استارتاپ نمونه ۰۱</h1>
              <p>یک تیم خلاق در حوزه فناوری نرم که برای یک مسئله واقعی، محصولی قابل استفاده و توسعه‌پذیر می‌سازد. این صفحه نمونه ساختار پروفایل استارتاپ در سایت خانه خلاق آینه است.</p>
              <div className="detail-tags">
                <span className="detail-tag detail-tag--primary">فناوری نرم</span>
                <span className="detail-tag">در حال رشد</span>
                <span className="detail-tag">تیم منتخب</span>
              </div>
            </div>
          </div>
        </section>

        <section className="startup-about-section">
          <div className="shell">
            <div className="section-intro section-intro--compact">
              <p className="eyebrow">درباره استارتاپ</p>
              <h2>از مسئله‌ای واقعی تا یک کسب‌وکار قابل رشد</h2>
            </div>
            <div className="startup-about-grid">
              <div className="startup-facts">
                <article className="startup-fact"><span>مرحله فعلی</span><strong>اعتبارسنجی و توسعه محصول</strong></article>
                <article className="startup-fact"><span>سال شروع</span><strong>۱۴۰۵</strong></article>
                <article className="startup-fact"><span>تعداد اعضای تیم</span><strong>۴ نفر</strong></article>
                <article className="startup-fact"><span>حوزه فعالیت</span><strong>فناوری نرم و خدمات</strong></article>
              </div>
              <article className="startup-about-copy">
                <h3>معرفی کوتاه</h3>
                <p>این استارتاپ با تمرکز بر طراحی یک راهکار ساده، قابل سنجش و مقیاس‌پذیر شکل گرفته است. تیم در خانه خلاق آینه روی اعتبارسنجی مسئله، ساخت نمونه اولیه، دریافت بازخورد از کاربران و آماده‌سازی برای ورود به بازار کار می‌کند.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="startup-product-section">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">محصول و ارزش پیشنهادی</p>
              <h2>مسئله را می‌شناسیم، راهکار را می‌سازیم</h2>
            </div>
            <div className="startup-product-grid">
              {productCards.map(([title, text]) => (
                <article className="startup-product-card" key={title}>
                  <div className="startup-product-card__accent" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="startup-milestones">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">مسیر رشد</p>
              <h2>از ایده تا آمادگی برای بازار</h2>
            </div>
            <div className="milestone-grid">
              {milestones.map(([title, text], index) => (
                <article className="milestone-card" key={title}>
                  <span>{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="startup-team-section">
          <div className="shell">
            <div className="section-intro">
              <p className="eyebrow">تیم</p>
              <h2>آدم‌هایی که پشت محصول ایستاده‌اند</h2>
            </div>
            <div className="startup-team-grid">
              {team.map(([initial, name, role]) => (
                <article className="team-card" key={name}>
                  <span className="team-avatar">{initial}</span>
                  <h3>{name}</h3>
                  <p>{role}</p>
                  <a href="#">مشاهده پروفایل ←</a>
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
