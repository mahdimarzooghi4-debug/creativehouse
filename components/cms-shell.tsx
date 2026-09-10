import type { ReactNode } from "react";

const navItems = [
  ["dashboard", "/admin", "داشبورد"],
  ["startups", "/admin/startups", "استارتاپ‌ها"],
  ["programs", "/admin/programs", "برنامه‌ها"],
  ["news", "/admin/news", "اخبار"],
  ["partners", "/admin/partners", "همراهان"],
  ["licenses", "/admin/licenses", "مجوزها"],
  ["collaboration", "/admin/collaboration", "درخواست‌های همکاری"],
  ["settings", "/admin/settings", "تنظیمات سایت"],
] as const;

export type CmsSection = (typeof navItems)[number][0];

function CmsIcon({ type }: { type: CmsSection | "logout" }) {
  const common = {
    className: "cms-icon",
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (type === "dashboard") return <svg {...common}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>;
  if (type === "startups") return <svg {...common}><path d="M12 3c3.6 1.7 5.8 4.4 6 8.2-2.5.1-4.8 1-6 3.1-1.2-2.1-3.5-3-6-3.1C6.2 7.4 8.4 4.7 12 3Z" /><path d="M12 14.3V21" /><path d="M8.5 18h7" /></svg>;
  if (type === "programs") return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18" /><path d="m8 15 2 2 5-5" /></svg>;
  if (type === "news") return <svg {...common}><path d="M5 4h11a3 3 0 0 1 3 3v13H7a2 2 0 0 1-2-2V4Z" /><path d="M9 8h6M9 12h6M9 16h4" /><path d="M19 8h2v10a2 2 0 0 1-2 2" /></svg>;
  if (type === "partners") return <svg {...common}><path d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM16 12a3 3 0 1 0 0-6" /><path d="M2.5 21a5.5 5.5 0 0 1 11 0M13 17a4.5 4.5 0 0 1 8.5 2" /></svg>;
  if (type === "licenses") return <svg {...common}><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 12h6M9 16h6" /><circle cx="9" cy="8" r="1" /></svg>;
  if (type === "collaboration") return <svg {...common}><path d="M8 12 4.5 8.5a2.1 2.1 0 0 1 3-3L12 10l4.5-4.5a2.1 2.1 0 0 1 3 3L12 16Z" /><path d="M8.5 12.5 6 15a2 2 0 0 0 2.8 2.8l1-1M15.5 12.5 18 15a2 2 0 0 1-2.8 2.8l-1-1" /></svg>;
  if (type === "settings") return <svg {...common}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></svg>;
  return <svg {...common}><path d="M10 5H5v14h5M13 8l4 4-4 4M17 12H9" /></svg>;
}

export function CmsShell({ active = "dashboard", children }: { active?: CmsSection; children: ReactNode }) {
  return (
    <div className="cms-shell">
      <main className="cms-main">{children}</main>
      <aside className="cms-sidebar">
        <a className="cms-brand" href="/" aria-label="خانه خلاق و نوآوری آینه">
          <img
            src="/figma-footer-brand-lockup.png"
            alt="خانه خلاق و نوآوری آینه"
            width={210}
            height={70}
            style={{ width: "210px", height: "70px", objectFit: "contain", display: "block" }}
          />
        </a>

        <p className="cms-sidebar__title">پنل مدیریت خانه خلاق</p>
        <nav className="cms-nav" aria-label="ناوبری پنل مدیریت">
          {navItems.map(([key, href, label]) => (
            <a className={active === key ? "is-active" : undefined} href={href} key={key} aria-current={active === key ? "page" : undefined}>
              <CmsIcon type={key} />
              <span>{label}</span>
            </a>
          ))}
        </nav>

        <div className="cms-sidebar__divider" />
        <div className="cms-admin-meta">
          <strong>مدیر سایت</strong>
          <span>دسترسی کامل</span>
        </div>

        <form action="/api/admin/logout" method="post">
          <button className="cms-logout" type="submit" style={{ width: "100%", cursor: "pointer", textAlign: "right" }}>
            <CmsIcon type="logout" />
            <span>خروج از پنل</span>
          </button>
        </form>
      </aside>
    </div>
  );
}
