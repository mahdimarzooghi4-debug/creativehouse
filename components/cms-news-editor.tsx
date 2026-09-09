import { CmsShell } from "./cms-shell";

type NewsEditorValue = {
  slug: string;
  title: string;
  summary: string | null;
  body: string;
  tags: string | null;
  category: string;
  status: string;
  publishedAt: Date | null;
  featured: boolean;
};

type NewsEditorProps = {
  mode?: "create" | "edit";
  news?: NewsEditorValue | null;
};

function dateInputValue(value?: Date | null) {
  if (!value) return "";
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function CmsNewsEditor({ mode = "edit", news }: NewsEditorProps) {
  const isCreate = mode === "create";
  const action = isCreate ? "/api/admin/news" : `/api/admin/news/${news?.slug}`;
  const previewHref = isCreate ? "/news" : `/news/${news?.slug}`;

  return (
    <CmsShell active="news">
      <form className="cms-dashboard cms-news-editor" action={action} method="post" encType="multipart/form-data">
        <header className="cms-page-header cms-news-editor-header">
          <div>
            <h1>{isCreate ? "ثبت خبر جدید" : "ویرایش خبر"}</h1>
            <p>عنوان، متن خبر، تصویر، دسته‌بندی و زمان انتشار را مدیریت کن</p>
          </div>
          <div className="cms-news-editor-actions" aria-label="عملیات ویرایش خبر">
            <a className="cms-outline-button" href="/admin/news">{isCreate ? "لغو" : "بازگشت"}</a>
            <a className="cms-outline-button" href={previewHref} target="_blank" rel="noreferrer">پیش‌نمایش</a>
            {!isCreate ? <button className="cms-outline-button" type="submit" name="operation" value="delete" formNoValidate>حذف</button> : null}
            <button className="cms-outline-button" type="submit" name="operation" value="draft" formNoValidate>ذخیره پیش‌نویس</button>
            <button className="cms-news-dark-button" type="submit" name="operation" value="publish">انتشار</button>
          </div>
        </header>

        <div className="cms-news-editor-grid">
          <section className="cms-news-editor-card cms-news-editor-card--main" aria-label="محتوای خبر">
            <label className="cms-news-form-field">
              <span>عنوان خبر</span>
              <input name="title" required defaultValue={news?.title ?? ""} placeholder="عنوان خبر" />
            </label>

            <label className="cms-news-form-field">
              <span>خلاصه</span>
              <textarea className="cms-news-summary" name="summary" rows={3} required defaultValue={news?.summary ?? ""} placeholder="خلاصه خبر" />
            </label>

            <label className="cms-news-form-field">
              <span>متن خبر</span>
              <textarea className="cms-news-body" name="body" rows={10} required defaultValue={news?.body ?? ""} placeholder="متن کامل خبر" />
            </label>

            <label className="cms-news-form-field">
              <span>برچسب‌ها</span>
              <input name="tags" defaultValue={news?.tags ?? ""} placeholder="برچسب‌ها را با ویرگول جدا کن" />
            </label>
          </section>

          <section className="cms-news-editor-card cms-news-editor-card--side">
            <h2>تنظیمات انتشار</h2>

            <label className="cms-news-form-field">
              <span>دسته‌بندی</span>
              <select name="category" defaultValue={news?.category ?? "news"}>
                <option value="news">خبر</option>
                <option value="activity-report">گزارش فعالیت</option>
                <option value="report">گزارش</option>
                <option value="call">فراخوان</option>
                <option value="collaboration">همکاری</option>
              </select>
            </label>

            <label className="cms-news-form-field">
              <span>وضعیت</span>
              <select name="status" defaultValue={news?.status ?? "draft"}>
                <option value="published">منتشرشده</option>
                <option value="scheduled">زمان‌بندی</option>
                <option value="draft">پیش‌نویس</option>
                <option value="review">بازبینی</option>
              </select>
            </label>

            <label className="cms-news-form-field">
              <span>تاریخ انتشار</span>
              <input name="publishedAt" type="date" defaultValue={dateInputValue(news?.publishedAt)} />
            </label>

            <label className="cms-news-form-field">
              <span>خبر منتخب</span>
              <select name="featured" defaultValue={news?.featured ? "yes" : "no"}>
                <option value="yes">بله</option>
                <option value="no">خیر</option>
              </select>
            </label>

            <label className="cms-news-upload-field">
              <input type="file" name="cover" accept="image/png,image/jpeg,image/webp" />
              <span>تصویر خبر</span>
              <small>PNG / JPG / WebP • حداکثر ۵ مگابایت</small>
            </label>
          </section>
        </div>
      </form>
    </CmsShell>
  );
}
