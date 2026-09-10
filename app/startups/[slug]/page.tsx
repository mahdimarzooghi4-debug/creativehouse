import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../../components/site-chrome";
import { db } from "../../../lib/db";
import { startupStageLabels } from "../../../lib/content-utils";

export const dynamic = "force-dynamic";

const milestones = [
  ["تعریف مسئله", "شناخت دقیق مسئله و کاربران هدف"],
  ["نمونه اولیه", "طراحی و ساخت نسخه قابل آزمون"],
  ["اعتبارسنجی", "آزمون با کاربر و اصلاح محصول"],
  ["رشد و بازار", "مدل درآمد، توسعه بازار و همکاری"],
];

const milestoneNumbers = ["۱", "۲", "۳", "۴"];

export default async function StartupDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const startup = await db.startup.findFirst({ where: { slug, deletedAt: null, status: "published" } });
  if (!startup) notFound();

  const mediaIds = [startup.logoMediaId, startup.coverMediaId].filter((value): value is string => Boolean(value));
  const media = mediaIds.length ? await db.media.findMany({ where: { id: { in: mediaIds } } }) : [];
  const mediaMap = new Map(media.map((item) => [item.id, item]));
  const cover = startup.coverMediaId ? mediaMap.get(startup.coverMediaId) : null;
  const logo = startup.logoMediaId ? mediaMap.get(startup.logoMediaId) : null;
  const stageLabel = startupStageLabels[startup.stage] || startup.stage;

  return (
    <div className="public-page">
      <SiteHeader active="startups" />
      <main className="public-page__main">
        <section className="startup-detail-hero">
          <div className="shell startup-detail-hero__grid">
            <div className={`startup-detail-visual${logo ? " startup-detail-visual--logo" : ""}`}>
              {logo ? (
                <img
                  className="startup-detail-visual__logo"
                  src={`/uploads/${logo.storageKey}`}
                  alt={`لوگوی ${startup.name}`}
                />
              ) : cover ? (
                <img src={`/uploads/${cover.storageKey}`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <>
                  <span className="startup-detail-visual__navy" />
                  <span className="startup-detail-visual__coral" />
                  <span className="startup-detail-visual__gold" />
                  <strong>{startup.name}</strong>
                  <p>هویت بصری استارتاپ</p>
                </>
              )}
            </div>
            <div className="startup-detail-copy">
              <p className="eyebrow">پروفایل استارتاپ</p>
              <h1>{startup.name}</h1>
              <p>{startup.summary || "معرفی این استارتاپ به‌زودی تکمیل می‌شود."}</p>
              <div className="detail-tags">
                <span className="detail-tag detail-tag--primary">{startup.field}</span>
                <span className="detail-tag">{stageLabel}</span>
                {startup.featured ? <span className="detail-tag">تیم منتخب</span> : null}
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
                <article className="startup-fact"><span>مرحله فعلی</span><strong>{stageLabel}</strong></article>
                <article className="startup-fact"><span>حوزه فعالیت</span><strong>{startup.field}</strong></article>
                <article className="startup-fact"><span>بنیان‌گذار</span><strong>{startup.founder || "—"}</strong></article>
                <article className="startup-fact"><span>وضعیت</span><strong>فعال در خانه خلاق</strong></article>
              </div>
              <article className="startup-about-copy">
                <h3>معرفی کوتاه</h3>
                <p>{startup.summary || "اطلاعات تکمیلی این تیم در حال آماده‌سازی است."}</p>
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
              <article className="startup-product-card">
                <div className="startup-product-card__accent" />
                <h3>مسئله و راهکار</h3>
                <p>{startup.solution || "شرح مسئله و راهکار این تیم به‌زودی تکمیل می‌شود."}</p>
              </article>
              <article className="startup-product-card">
                <div className="startup-product-card__accent" />
                <h3>مرحله رشد</h3>
                <p>این تیم در مرحله «{stageLabel}» قرار دارد و مسیر توسعه خود را در کنار شبکه خانه خلاق ادامه می‌دهد.</p>
              </article>
              <article className="startup-product-card">
                <div className="startup-product-card__accent" />
                <h3>حوزه فعالیت</h3>
                <p>{startup.field}</p>
              </article>
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
                <article className="milestone-card" key={title} dir="rtl">
                  <span>{milestoneNumbers[index]}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {(startup.founder || startup.website || logo) ? (
          <section className="startup-team-section">
            <div className="shell">
              <div className="section-intro">
                <p className="eyebrow">تیم و ارتباط</p>
                <h2>آدم‌هایی که پشت محصول ایستاده‌اند</h2>
              </div>
              <div className="startup-team-grid">
                <article className="team-card">
                  {logo ? <img src={`/uploads/${logo.storageKey}`} alt={`لوگوی ${startup.name}`} style={{ width: 72, height: 72, objectFit: "contain" }} /> : <span className="team-avatar">{(startup.founder || startup.name).slice(0, 1)}</span>}
                  <h3>{startup.founder || startup.name}</h3>
                  <p>{startup.founder ? `بنیان‌گذار ${startup.name}` : startup.field}</p>
                  {startup.website ? <a href={startup.website.startsWith("http") ? startup.website : `https://${startup.website}`} target="_blank" rel="noreferrer">وب‌سایت / شبکه اجتماعی ←</a> : null}
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
