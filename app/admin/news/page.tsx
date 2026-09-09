import { CmsShell } from "../../../components/cms-shell";
import { db } from "../../../lib/db";
import { contentStatusLabels, formatPersianDate, newsCategoryLabels } from "../../../lib/content-utils";

export const dynamic = "force-dynamic";

type AdminNewsPageProps = {
  searchParams: Promise<{ notice?: string; q?: string; category?: string }>;
};

const noticeMessages: Record<string, string> = {
  published: "خبر منتشر شد یا برای زمان انتخاب‌شده زمان‌بندی شد.",
  "draft-saved": "پیش‌نویس خبر ذخیره شد.",
  deleted: "خبر حذف شد.",
  "validation-error": "عنوان و متن خبر الزامی است و برای انتشار باید خلاصه هم وارد شود.",
  "unsupported-image": "فرمت تصویر پشتیبانی نمی‌شود. از PNG، JPG یا WebP استفاده کن.",
  "image-too-large": "حجم تصویر بیشتر از حد مجاز است.",
  "invalid-image": "فایل انتخاب‌شده تصویر معتبر نیست.",
  "save-error": "ذخیره خبر انجام نشد. دوباره تلاش کن.",
  "not-found": "خبر موردنظر پیدا نشد.",
};

export default async function AdminNewsPage({ searchParams }: AdminNewsPageProps) {
  const { notice, q = "", category = "all" } = await searchParams;
  const cleanQuery = q.trim();
  const where = {
    deletedAt: null,
    ...(cleanQuery ? { title: { contains: cleanQuery } } : {}),
    ...(category !== "all" ? { category } : {}),
  };

  const [newsItems, total, published, draft, featured] = await Promise.all([
    db.news.findMany({ where, orderBy: [{ featured: "desc" }, { publishedAt: "desc" }, { updatedAt: "desc" }] }),
    db.news.count({ where: { deletedAt: null } }),
    db.news.count({ where: { deletedAt: null, status: "published" } }),
    db.news.count({ where: { deletedAt: null, status: "draft" } }),
    db.news.count({ where: { deletedAt: null, featured: true } }),
  ]);

  const newsStats = [
    ["کل خبرها", String(total), `${published} منتشرشده`],
    ["پیش‌نویس", String(draft), "نیازمند بازبینی"],
    ["خبر منتخب", String(featured), "نمایش در بالای صفحه"],
  ] as const;

  return (
    <CmsShell active="news">
      <div className="cms-dashboard cms-news-page">
        <header className="cms-page-header">
          <div>
            <h1>مدیریت اخبار و رسانه</h1>
            <p>خبرها، گزارش‌ها و محتوای رسانه‌ای سایت را منتشر و زمان‌بندی کن</p>
          </div>
          <div className="cms-news-header-actions">
            <a className="cms-outline-button cms-view-site" href="/news">مشاهده سایت</a>
            <a className="cms-news-dark-button cms-add-news" href="/admin/news/new">ثبت خبر جدید</a>
          </div>
        </header>

        {notice && noticeMessages[notice] ? <p className="cms-flow-notice" role="status">{noticeMessages[notice]}</p> : null}

        <section className="cms-news-stat-grid" aria-label="آمار اخبار">
          {newsStats.map(([label, value, note]) => (
            <article className="cms-news-stat" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{note}</small>
            </article>
          ))}
        </section>

        <form className="cms-news-filter-bar" action="/admin/news" method="get">
          <label className="cms-news-search-field">
            <span className="cms-news-sr-only">جست‌وجو در عنوان خبر</span>
            <input type="search" name="q" defaultValue={cleanQuery} placeholder="جست‌وجو در عنوان خبر" />
          </label>
          <label className="cms-news-filter-field">
            <span className="cms-news-sr-only">فیلتر دسته‌بندی</span>
            <select name="category" defaultValue={category}>
              <option value="all">همه دسته‌بندی‌ها</option>
              <option value="news">خبر</option>
              <option value="activity-report">گزارش فعالیت</option>
              <option value="report">گزارش</option>
              <option value="call">فراخوان</option>
              <option value="collaboration">همکاری</option>
            </select>
          </label>
          <button className="cms-outline-button cms-news-search-button" type="submit">جست‌وجو</button>
        </form>

        <section className="cms-news-table-card" aria-label="فهرست اخبار">
          <div className="cms-news-table" role="table">
            <div className="cms-news-row cms-news-row--head" role="row">
              <span>عنوان خبر</span>
              <span>دسته</span>
              <span>وضعیت</span>
              <span>تاریخ انتشار</span>
              <span>بازدید</span>
            </div>
            {newsItems.map((item, index) => (
              <a className={`cms-news-row${index % 2 ? " is-alt" : ""}`} role="row" href={`/admin/news/${item.slug}`} key={item.id}>
                <strong>{item.title}</strong>
                <span>{newsCategoryLabels[item.category] || item.category}</span>
                <span><i className={`cms-news-status cms-news-status--${item.status}`}>{contentStatusLabels[item.status] || item.status}</i></span>
                <span>{formatPersianDate(item.publishedAt)}</span>
                <span>{item.views.toLocaleString("fa-IR")}</span>
              </a>
            ))}
            {newsItems.length === 0 ? <p className="cms-flow-notice">خبری با این فیلتر پیدا نشد.</p> : null}
          </div>
        </section>
      </div>
    </CmsShell>
  );
}
