type ActiveNav = "home" | "about" | "startups" | "programs" | "news" | null;

const navItems: Array<{ key: Exclude<ActiveNav, null>; label: string; href: string }> = [
  { key: "home", label: "خانه", href: "/" },
  { key: "about", label: "درباره ما", href: "/about" },
  { key: "startups", label: "استارتاپ‌ها", href: "/startups" },
  { key: "programs", label: "برنامه‌ها", href: "/programs" },
  { key: "news", label: "اخبار", href: "/news" },
];

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a className={`brand${footer ? " brand--footer" : ""}`} href="/" aria-label="خانه خلاق و نوآوری آینه">
      <span className="brand__title">خانه خلاق و نوآوری <b>آینه</b></span>
      <span className="brand__logo-shell" aria-hidden="true">
        <img className="brand__logo" src="/images/brand-creative-house.png" alt="" />
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

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Brand footer />
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
