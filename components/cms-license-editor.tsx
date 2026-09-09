import { CmsShell } from "./cms-shell";

type LicenseEditorProps = { mode?: "create" | "edit" };

export function CmsLicenseEditor({ mode = "edit" }: LicenseEditorProps) {
  const isCreate = mode === "create";
  return (
    <CmsShell active="licenses">
      <form className="cms-dashboard cms-secondary-editor" action="/admin/licenses" method="get">
        <header className="cms-page-header cms-secondary-editor-header">
          <div>
            <h1>{isCreate ? "افزودن مجوز" : "ویرایش مجوز"}</h1>
            <p>عنوان، مرجع صادرکننده، فایل سند و وضعیت انتشار را مدیریت کن</p>
          </div>
          <div className="cms-secondary-editor-actions">
            <a className="cms-outline-button" href="/admin/licenses">لغو و بازگشت</a>
            <button className="cms-outline-button" type="submit" name="result" value="saved">ذخیره پیش‌نویس</button>
            <button className="cms-licenses-dark-button" type="submit" name="result" value="published">انتشار</button>
          </div>
        </header>
        <section className="cms-secondary-editor-card">
          <label><span>عنوان سند</span><input name="title" required defaultValue={isCreate ? "" : "مجوز فعالیت خانه خلاق"} /></label>
          <label><span>مرجع صادرکننده</span><input name="issuer" required defaultValue={isCreate ? "" : "مرجع صادرکننده"} /></label>
          <div className="cms-secondary-editor-split">
            <label><span>وضعیت</span><select name="status" defaultValue={isCreate ? "draft" : "published"}><option value="published">منتشرشده</option><option value="draft">پیش‌نویس</option></select></label>
            <label><span>تاریخ صدور</span><input name="issuedAt" inputMode="numeric" defaultValue={isCreate ? "" : "۱۴۰۵/۰۴/۰۱"} placeholder="۱۴۰۵/۰۴/۰۱" /></label>
          </div>
          <label><span>توضیح کوتاه</span><textarea name="description" defaultValue={isCreate ? "" : "اطلاعات رسمی سند و توضیح کوتاه برای نمایش در صفحه مجوزها."} /></label>
          <label className="cms-secondary-upload"><input type="file" name="document" accept="image/*,application/pdf" /><span>فایل سند</span><small>PDF / JPG / PNG • فقط نسخه واقعی و قابل انتشار</small></label>
        </section>
      </form>
    </CmsShell>
  );
}
