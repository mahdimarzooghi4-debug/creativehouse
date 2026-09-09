import { CmsShell } from "../../../components/cms-shell";
import { collaborationStatusLabels, collaborationTypeLabels, maskPhone } from "../../../lib/collaboration-utils";
import { formatPersianDate } from "../../../lib/content-utils";
import { db } from "../../../lib/db";

export const dynamic = "force-dynamic";

const resultMessages: Record<string, string> = {
  updated: "نتیجه پیگیری ثبت شد.",
  "draft-saved": "یادداشت داخلی ذخیره شد.",
  "not-found": "درخواست موردنظر پیدا نشد.",
};

export default async function AdminCollaborationPage({ searchParams }: { searchParams: Promise<{ result?: string; q?: string; type?: string }> }) {
  const { result, q = "", type = "all" } = await searchParams;
  const feedback = result ? resultMessages[result] : undefined;
  const cleanQuery = q.trim();
  const where = {
    ...(type !== "all" ? { type } : {}),
    ...(cleanQuery ? {
      OR: [
        { name: { contains: cleanQuery } },
        { organization: { contains: cleanQuery } },
        { phone: { contains: cleanQuery } },
      ],
    } : {}),
  };

  const [requests, total, newCount, followingCount] = await Promise.all([
    db.collaborationRequest.findMany({ where, orderBy: { createdAt: "desc" } }),
    db.collaborationRequest.count(),
    db.collaborationRequest.count({ where: { status: "new" } }),
    db.collaborationRequest.count({ where: { status: "following" } }),
  ]);
  const collaborationStats = [
    ["کل درخواست‌ها", String(total), "از ابتدای دوره"],
    ["جدید", String(newCount), "نیازمند بررسی"],
    ["در حال پیگیری", String(followingCount), "در جریان"],
  ] as const;

  return (
    <CmsShell active="collaboration">
      <div className="cms-dashboard cms-collaboration-page">
        <header className="cms-page-header">
          <div>
            <h1>درخواست‌های همکاری</h1>
            <p>درخواست‌های استارتاپ‌ها، منتورها، سازمان‌ها و حامیان را پیگیری کن</p>
          </div>
          <a className="cms-outline-button cms-view-site" href="/collaboration">مشاهده سایت</a>
        </header>

        {feedback ? <div className="cms-secondary-feedback" role="status">{feedback}</div> : null}

        <section className="cms-collaboration-stat-grid" aria-label="آمار درخواست‌های همکاری">
          {collaborationStats.map(([label, value, note]) => (
            <article className="cms-collaboration-stat" key={label}>
              <span>{label}</span>
              <strong>{Number(value).toLocaleString("fa-IR")}</strong>
              <small>{note}</small>
            </article>
          ))}
        </section>

        <form className="cms-collaboration-filter-bar" action="/admin/collaboration" method="get">
          <label className="cms-collaboration-search-field">
            <span className="cms-collaboration-sr-only">جست‌وجو با نام یا شماره تماس</span>
            <input type="search" name="q" defaultValue={cleanQuery} placeholder="جست‌وجو با نام یا شماره تماس" />
          </label>
          <label className="cms-collaboration-filter-field">
            <span className="cms-collaboration-sr-only">نوع همکاری</span>
            <select name="type" defaultValue={type}>
              <option value="all">همه نوع‌های همکاری</option>
              <option value="startup">تیم / استارتاپ</option>
              <option value="mentor">منتور / متخصص</option>
              <option value="organization">سازمان / مجموعه</option>
              <option value="partner">حامی / شریک اجرایی</option>
            </select>
          </label>
          <button className="cms-outline-button cms-collaboration-search-button" type="submit">جست‌وجو</button>
        </form>

        <section className="cms-collaboration-table-card" aria-label="فهرست درخواست‌های همکاری">
          <div className="cms-collaboration-table" role="table">
            <div className="cms-collaboration-row cms-collaboration-row--head" role="row">
              <span>نام / مجموعه</span>
              <span>نوع همکاری</span>
              <span>شماره تماس</span>
              <span>وضعیت</span>
              <span>تاریخ</span>
            </div>
            {requests.map((request, index) => (
              <a className={`cms-collaboration-row${index % 2 ? " is-alt" : ""}`} href={`/admin/collaboration/${request.id}`} role="row" key={request.id}>
                <strong>{request.organization || request.name}</strong>
                <span>{collaborationTypeLabels[request.type] || request.type}</span>
                <span className="cms-collaboration-phone">{maskPhone(request.phone)}</span>
                <span><i className={`cms-collaboration-status cms-collaboration-status--${request.status}`}>{collaborationStatusLabels[request.status] || request.status}</i></span>
                <span>{formatPersianDate(request.createdAt)}</span>
              </a>
            ))}
            {requests.length === 0 ? <p className="cms-flow-notice">درخواستی با این فیلتر پیدا نشد.</p> : null}
          </div>
        </section>
      </div>
    </CmsShell>
  );
}
