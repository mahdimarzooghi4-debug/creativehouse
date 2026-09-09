import { CmsShell } from "./cms-shell";

type NewsEditorProps = {
  mode?: "create" | "edit";
};

export function CmsNewsEditor({ mode = "edit" }: NewsEditorProps) {
  const isCreate = mode === "create";

  return (
    <CmsShell active="news">
      <form className="cms-dashboard cms-news-editor" action="/admin/news" method="get">
        <header className="cms-page-header cms-news-editor-header">
          <div>
            <h1>{isCreate ? "ثبت خبر جدید" : "ویرایش خبر"}</h1>
            <p>عنوان، متن خبر، تصویر، دسته‌بندی و زمان انتشار را مدیریت کن</p>
          </div>
          <div className="cms-news-editor-actions">
            <button className="cms-outline-button" type="submit" name="action" value="preview">پیش‌نمایش</button>
            <button className="cms-news-dark-button" type="submit" name="action" value="publish">انتشار</button>
          </div>
        </header>

        <div className="cms-news-editor-grid">
          <section className="cms-news-editor-card cms-news-editor-card--main" aria-label="محتوای خبر">
            <label className="cms-news-form-field">
              <span>عنوان خبر</span>
              <input
                name="title"
                defaultValue={isCreate ? "" : "نخستین گردهمایی تیم‌های منتخب خانه خلاق آینه برگزار شد"}
                placeholder="عنوان خبر"
              />
            </label>

            <label className="cms-news-form-field">
              <span>خلاصه</span>
              <textarea
                className="cms-news-summary"
                name="summary"
                rows={3}
                defaultValue={isCreate ? "" : "تیم‌های منتخب در یک نشست مشترک مسیر توسعه محصول، شبکه منتورینگ و برنامه‌های ماه‌های پیش‌رو را مرور کردند."}
                placeholder="خلاصه خبر"
              />
            </label>

            <label className="cms-news-form-field">
              <span>متن خبر</span>
              <textarea
                className="cms-news-body"
                name="body"
                rows={10}
                defaultValue={isCreate ? "" : "متن کامل خبر در این بخش با امکان افزودن پاراگراف، تیتر میانی و لینک مدیریت می‌شود. این نمونه برای طراحی CMS قرار گرفته است."}
                placeholder="متن کامل خبر"
              />
            </label>

            <label className="cms-news-form-field">
              <span>برچسب‌ها</span>
              <input
                name="tags"
                defaultValue={isCreate ? "" : "خانه خلاق، استارتاپ، منتورینگ"}
                placeholder="برچسب‌ها را با ویرگول جدا کن"
              />
            </label>
          </section>

          <section className="cms-news-editor-card cms-news-editor-card--side">
            <h2>تنظیمات انتشار</h2>

            <label className="cms-news-form-field">
              <span>دسته‌بندی</span>
              <select name="category" defaultValue={isCreate ? "news" : "activity-report"}>
                <option value="news">خبر</option>
                <option value="activity-report">گزارش فعالیت</option>
                <option value="call">فراخوان</option>
                <option value="collaboration">همکاری</option>
              </select>
            </label>

            <label className="cms-news-form-field">
              <span>وضعیت</span>
              <select name="status" defaultValue={isCreate ? "draft" : "published"}>
                <option value="published">منتشرشده</option>
                <option value="scheduled">زمان‌بندی</option>
                <option value="draft">پیش‌نویس</option>
                <option value="review">بازبینی</option>
              </select>
            </label>

            <label className="cms-news-form-field">
              <span>تاریخ انتشار</span>
              <input
                name="publishedAt"
                inputMode="numeric"
                defaultValue={isCreate ? "" : "۱۴۰۵/۰۶/۱۸"}
                placeholder="۱۴۰۵/۰۶/۱۸"
              />
            </label>

            <label className="cms-news-form-field">
              <span>خبر منتخب</span>
              <select name="featured" defaultValue={isCreate ? "no" : "yes"}>
                <option value="yes">بله</option>
                <option value="no">خیر</option>
              </select>
            </label>

            <label className="cms-news-upload-field">
              <input type="file" name="cover" accept="image/*" />
              <span>تصویر خبر</span>
              <small>نسبت پیشنهادی 16:9</small>
            </label>
          </section>
        </div>
      </form>
    </CmsShell>
  );
}
