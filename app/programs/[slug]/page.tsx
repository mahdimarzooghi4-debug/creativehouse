import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../../components/site-chrome";
import { contentStatusLabels, formatPersianDate } from "../../../lib/content-utils";
import { db } from "../../../lib/db";

export const dynamic = "force-dynamic";

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
  const program = await db.program.findFirst({ where: { slug, deletedAt: null, status: { in: ["published", "active"] } } });
  if (!program) notFound();
  const cover = program.coverMediaId ? await db.media.findUnique({ where: { id: program.coverMediaId } }) : null;
  const registrationHref = program.registrationUrl || "/collaboration";

  return (
    <div className="public-page">
      <SiteHeader active="programs" />
      <main className="public-page__main">
        <section className="program-detail-hero">
          <div className="shell program-detail-hero__grid">
            <div className="program-detail-visual" aria-hidden="true">
              {cover ? <img src={`/uploads/${cover.storageKey}`} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }} /> : <><span className="program-detail-visual__navy" /><span className="program-detail-visual__coral" /><span className="program-detail-visual__gold" /><strong>{program.featured ? "آینه" : "رشد"}</strong><p>{program.title}</p></>}
            </div>
            <div className="program-detail-copy">
              <p className="eyebrow">جزئیات برنامه</p><h1>{program.title}</h1><p>{program.summary || "اطلاعات تکمیلی این برنامه به‌زودی منتشر می‌شود."}</p>
              <div className="program-detail-actions">
                <span className="program-detail-status">{contentStatusLabels[program.status] || program.status}</span>
                {program.duration ? <span className="program-detail-status">{program.duration}</span> : null}
                <div className="program-detail-buttons"><a className="button button--primary" href={registrationHref}>درخواست حضور</a><a className="button button--secondary" href="/programs">بازگشت به برنامه‌ها</a></div>
              </div>
            </div>
          </div>
        </section>

        <section className="program-overview"><div className="shell"><div className="section-intro section-intro--compact"><p className="eyebrow">درباره برنامه</p><h2>از ایده تا یک مسیر رشد قابل اندازه‌گیری</h2></div><div className="program-overview-grid"><article className="program-goal"><p className="eyebrow">هدف برنامه</p><h3>ساختن شواهد واقعی برای رشد</h3><p>{program.outputs || program.summary || "خروجی‌های دقیق برنامه در پنل مدیریت قابل تکمیل است."}</p></article><div className="program-metrics"><article className="program-metric"><strong>{program.duration || "—"}</strong><span>مدت برنامه</span></article><article className="program-metric"><strong>{formatPersianDate(program.startsAt)}</strong><span>شروع</span></article><article className="program-metric"><strong>{formatPersianDate(program.endsAt)}</strong><span>پایان</span></article></div></div></div></section>
        <section className="program-outcomes"><div className="shell"><div className="section-intro"><p className="eyebrow">خروجی‌های برنامه</p><h2>در پایان چه چیزی دارید؟</h2></div><div className="program-outcome-grid">{outcomes.map(([title, text]) => <article className="program-outcome-card" key={title}><div className="program-outcome-card__accent" /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
        <section className="program-journey"><div className="shell"><div className="section-intro"><p className="eyebrow">مسیر اجرا</p><h2>چهار مرحله تا خروجی نهایی</h2></div><div className="program-journey-grid">{journey.map(([title, text], index) => <article className="program-journey-card" key={title}><span>{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      </main>
      <SiteFooter />
    </div>
  );
}
