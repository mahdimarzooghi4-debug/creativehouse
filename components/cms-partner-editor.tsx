import { CmsShell } from "./cms-shell";

type PartnerEditorProps = { mode?: "create" | "edit" };

export function CmsPartnerEditor({ mode = "edit" }: PartnerEditorProps) {
  const isCreate = mode === "create";
  return (
    <CmsShell active="partners">
      <form className="cms-dashboard cms-secondary-editor" action="/admin/partners" method="get">
        <header className="cms-page-header cms-secondary-editor-header">
          <div>
            <h1>{isCreate ? "افزودن همراه" : "ویرایش همراه"}</h1>
            <p>عنوان، لوگو، لینک و وضعیت نمایش همراه را مدیریت کن</p>
          </div>
          <div className="cms-secondary-editor-actions">
            <a className="cms-outline-button" href="/admin/partners">لغو و بازگشت</a>
            <button className="cms-outline-button" type="submit" name="result" value="saved">ذخیره پیش‌نویس</button>
            <button className="cms-partners-dark-button" type="submit" name="result" value="published">فعال‌سازی</button>
          </div>
        </header>
        <section className="cms-secondary-editor-card">
          <label><span>نام همراه</span><input name="name" required defaultValue={isCreate ? "" : "معاونت علمی ریاست جمهوری"} /></label>
          <label><span>وب‌سایت</span><input name="website" dir="ltr" defaultValue={isCreate ? "" : "https://example.ir"} /></label>
          <div className="cms-secondary-editor-split">
            <label><span>وضعیت</span><select name="status" defaultValue={isCreate ? "draft" : "active"}><option value="active">فعال</option><option value="draft">پیش‌نویس</option></select></label>
            <label><span>ترتیب نمایش</span><input type="number" min="1" name="order" defaultValue={isCreate ? 1 : 1} /></label>
          </div>
          <label className="cms-secondary-upload"><input type="file" name="logo" accept="image/png,image/jpeg,image/svg+xml" /><span>لوگوی همراه</span><small>PNG / JPG / SVG • ترجیحاً پس‌زمینه شفاف</small></label>
        </section>
      </form>
    </CmsShell>
  );
}
