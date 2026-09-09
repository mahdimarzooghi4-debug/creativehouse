import { formatDateInput } from "../lib/content-utils";
import { CmsShell } from "./cms-shell";

type LicenseData = {
  slug: string;
  title: string;
  issuer: string | null;
  description: string | null;
  issuedAt: Date | null;
  status: string;
  displayOrder: number;
  documentMediaId: string | null;
};

type LicenseEditorProps = { mode?: "create" | "edit"; license?: LicenseData };

export function CmsLicenseEditor({ mode = "edit", license }: LicenseEditorProps) {
  const isCreate = mode === "create";
  const action = isCreate ? "/api/admin/licenses" : `/api/admin/licenses/${license?.slug}`;
  return (
    <CmsShell active="licenses">
      <form className="cms-dashboard cms-secondary-editor" action={action} method="post" encType="multipart/form-data">
        <header className="cms-page-header cms-secondary-editor-header">
          <div>
            <h1>{isCreate ? "افزودن مجوز" : "ویرایش مجوز"}</h1>
            <p>عنوان، مرجع صادرکننده، فایل سند و وضعیت انتشار را مدیریت کن</p>
          </div>
          <div className="cms-secondary-editor-actions">
            <a className="cms-outline-button" href="/admin/licenses">لغو و بازگشت</a>
            {!isCreate ? <button className="cms-outline-button" type="submit" name="operation" value="delete" formNoValidate>حذف</button> : null}
            <button className="cms-outline-button" type="submit" name="operation" value="draft" formNoValidate>ذخیره پیش‌نویس</button>
            <button className="cms-licenses-dark-button" type="submit" name="operation" value="publish">انتشار</button>
          </div>
        </header>
        <section className="cms-secondary-editor-card">
          <label><span>عنوان سند</span><input name="title" required defaultValue={license?.title || ""} /></label>
          <label><span>مرجع صادرکننده</span><input name="issuer" defaultValue={license?.issuer || ""} /></label>
          <div className="cms-secondary-editor-split">
            <label><span>وضعیت</span><select name="status" defaultValue={license?.status || "draft"}><option value="published">منتشرشده</option><option value="draft">پیش‌نویس</option></select></label>
            <label><span>تاریخ صدور</span><input type="date" name="issuedAt" defaultValue={formatDateInput(license?.issuedAt)} /></label>
          </div>
          <div className="cms-secondary-editor-split">
            <label><span>ترتیب نمایش</span><input type="number" min="0" name="order" defaultValue={license?.displayOrder ?? 0} /></label>
            <label><span>فایل فعلی</span><input readOnly value={license?.documentMediaId ? "سند ثبت شده" : "هنوز فایلی ثبت نشده"} /></label>
          </div>
          <label><span>توضیح کوتاه</span><textarea name="description" defaultValue={license?.description || ""} /></label>
          <label className="cms-secondary-upload"><input type="file" name="document" accept="application/pdf,image/png,image/jpeg,image/webp" /><span>فایل سند</span><small>PDF / JPG / PNG / WebP • حداکثر ۱۰ مگابایت</small></label>
        </section>
      </form>
    </CmsShell>
  );
}
