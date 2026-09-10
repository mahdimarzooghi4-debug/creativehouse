import { getSiteSettings } from "../lib/site-settings";
import { BrandMark } from "./brand-mark";

type ActiveNav = "home" | "about" | "startups" | "programs" | "news" | null;

const navItems: Array<{ key: Exclude<ActiveNav, null>; label: string; href: string }> = [
  { key: "home", label: "خانه", href: "/" },
  { key: "about", label: "درباره ما", href: "/about" },
  { key: "startups", label: "استارتاپ‌ها", href: "/startups" },
  { key: "programs", label: "برنامه‌ها", href: "/programs" },
  { key: "news", label: "اخبار", href: "/news" },
];

export function Brand({ footer = false }: { footer?: boolean }) {
  if (footer) {
    return (
      <a className="brand brand--footer" href="/" aria-label="خانه خلاق و نوآوری آینه">
        <img
          className="footer-brand__figma-lockup"
          src="/figma-footer-brand-lockup.png"
          alt="خانه خلاق و نوآوری آینه"
          width={210}
          height={70}
        />
      </a>
    );
  }

  return (
    <a className="brand" href="/" aria-label="خانه خلاق و نوآوری آینه">
      <span className="brand__title">خانه خلاق و نوآوری <b>آینه</b></span>
      <span className="brand__logo-shell" aria-hidden="true">
        <BrandMark className="brand__logo" />
      </span>
    </a>
  );
}

export function SiteHeader({ active = null }: { active?: ActiveNav }) {
  return (
    <header className="site-header shell">
      <Brand />
      <nav className="main-nav" aria-label="ناوبری اصلی">
        {navItems.map((item) => (
          <a key={item.key} href={item.href} aria-current={active === item.key ? "page" : undefined}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="button button--primary header-cta" href="/collaboration">همکاری با ما</a>
    </header>
  );
}

function FooterTagline({ value }: { value: string }) {
  const commaIndex = value.indexOf("،");
  if (commaIndex < 0) return <>{value}</>;
  return (
    <>
      {value.slice(0, commaIndex)}
      <span>،</span>
      {value.slice(commaIndex + 1)}
    </>
  );
}

function FooterContactLine({ label, value }: { label: string; value: string }) {
  return (
    <p className="footer-contact__line">
      <span>{label}: </span>
      <bdi className="footer-contact__value" dir="ltr">{value}</bdi>
    </p>
  );
}

export async function SiteFooter() {
  const settings = await getSiteSettings();
  const tagline = settings.tagline || "وطن، ساختنی است";

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Brand footer />
          <p className="footer-slogan"><FooterTagline value={tagline} /></p>
        </div>
        <div className="footer-programs">
          <h3>برنامه‌ها</h3>
          <a href="/programs">همه برنامه‌ها</a>
          <a href="/programs?type=event">رویداد آینه</a>
          <a href="/programs">برنامه‌های آینده</a>
        </div>
        <div className="footer-house">
          <h3>خانه خلاق</h3>
          <a href="/about">درباره ما</a>
          <a href="/startups">استارتاپ‌ها</a>
          <a href="/news">اخبار و رسانه</a>
          <a href="/licenses">مجوزها و تأییدیه‌ها</a>
        </div>
        <div className="footer-contact">
          <h3>ارتباط با ما</h3>
          {settings.address ? <p>آدرس: {settings.address}</p> : null}
          {settings.phone1 ? <FooterContactLine label="تلفن" value={settings.phone1} /> : null}
          {settings.phone2 ? <FooterContactLine label="تلفن" value={settings.phone2} /> : null}
          {settings.email ? <FooterContactLine label="ایمیل" value={settings.email} /> : null}
        </div>
      </div>
      <div className="shell footer-bottom">تمام حقوق برای {settings.siteName} محفوظ است</div>
    </footer>
  );
}
