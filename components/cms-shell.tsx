import type { ReactNode } from "react";

const BRAND_IMAGE = "https://www.figma.com/api/mcp/asset/6100cc18-517d-47c9-93d7-6d3ceecfab9d.png";

const navItems = [
  ["dashboard", "/admin", "داشبورد", "https://www.figma.com/api/mcp/asset/cb43416f-08bd-479b-9b52-5681956825a3.svg"],
  ["startups", "/admin/startups", "استارتاپ‌ها", "https://www.figma.com/api/mcp/asset/09f9e386-72f1-49a0-bb3a-d5ed08357bb5.svg"],
  ["programs", "/admin/programs", "برنامه‌ها", "https://www.figma.com/api/mcp/asset/e9ea140b-dc16-4986-acd2-844486a57931.svg"],
  ["news", "/admin/news", "اخبار", "https://www.figma.com/api/mcp/asset/74b474ad-0a26-4744-92f4-4a808c825056.svg"],
  ["partners", "/admin/partners", "همراهان", "https://www.figma.com/api/mcp/asset/5afe2e79-de19-46b8-9a72-68bf1922ab3f.svg"],
  ["licenses", "/admin/licenses", "مجوزها", "https://www.figma.com/api/mcp/asset/35fed14c-e428-4da7-ad5c-436393ab6e34.svg"],
  ["collaboration", "/admin/collaboration", "درخواست‌های همکاری", "https://www.figma.com/api/mcp/asset/3a77e5f8-446c-42ef-bab0-996e19d7e26e.svg"],
  ["settings", "/admin/settings", "تنظیمات سایت", "https://www.figma.com/api/mcp/asset/a5f6293b-5ff4-434c-a25d-0d1d54421e15.svg"],
] as const;

const LOGOUT_ICON = "https://www.figma.com/api/mcp/asset/e4a7ea3d-cdbe-4eb9-87e8-b992d777eafc.svg";

export type CmsSection = (typeof navItems)[number][0];

export function CmsShell({ active = "dashboard", children }: { active?: CmsSection; children: ReactNode }) {
  return (
    <div className="cms-shell">
      <main className="cms-main">{children}</main>
      <aside className="cms-sidebar">
        <a className="cms-brand" href="/" aria-label="خانه خلاق و نوآوری آینه">
          <span className="cms-brand__title">خانه خلاق و نوآوری <b>آینه</b></span>
          <img src={BRAND_IMAGE} alt="" width={82} height={70} />
        </a>

        <p className="cms-sidebar__title">پنل مدیریت خانه خلاق</p>
        <nav className="cms-nav" aria-label="ناوبری پنل مدیریت">
          {navItems.map(([key, href, label, icon]) => (
            <a className={active === key ? "is-active" : undefined} href={href} key={key} aria-current={active === key ? "page" : undefined}>
              <img src={icon} alt="" width={20} height={20} />
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
            <img src={LOGOUT_ICON} alt="" width={20} height={20} />
            <span>خروج از پنل</span>
          </button>
        </form>
      </aside>
    </div>
  );
}
