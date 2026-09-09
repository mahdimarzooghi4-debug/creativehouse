import { CmsShell } from "./cms-shell";

type PartnerData = {
  slug: string;
  name: string;
  website: string | null;
  status: string;
  featured: boolean;
  displayOrder: number;
};

type PartnerEditorProps = { mode?: "create" | "edit"; partner?: PartnerData };

export function CmsPartnerEditor({ mode = "edit", partner }: PartnerEditorProps) {
  const isCreate = mode === "create";
  const action = isCreate ? "/api/admin/partners" : `/api/admin/partners/${partner?.slug}`;
  return (
    <CmsShell active="partners">
      <form className="cms-dashboard cms-secondary-editor" action={action} method="post" encType="multipart/form-data">
        <header className="cms-page-header cms-secondary-editor-header">
          <div>
            <h1>{isCreate ? "افزودن همراه" : "ویرایش همراه"}</h1>
            <p>عنوان، لوگو، لینک و وضعیت نمایش همراه را مدیریت کن</p>
          </div>
          <div className="cms-secondary-editor-actions">
            <a className="cms-outline-button" href="/admin/partners">لغو و بازگشت</a>
            {!isCreate ? <button className="cms-outline-button" type="submit" name="operation" value="delete" formNoValidate>حذف</button> : null}
            <button className="cms-outline-button" type="submit" name="operation" value="draft" formNoValidate>ذخیره پیش‌نویس</button>
            <button className="cms-partners-dark-button" type="submit" name="operation" value="publish">فعال‌سازی</button>
          </div>
        </header>
        <section className="cms-secondary-editor-card">
          <label><span>نام همراه</span><input name="name" required defaultValue={partner?.name || ""} /></label>
          <label><span>وب‌سایت</span><input name="website" dir="ltr" defaultValue={partner?.website || ""} placeholder="https://example.ir" /></label>
          <div className="cms-secondary-editor-split">
            <label><span>وضعیت</span><select name="status" defaultValue={partner?.status || "draft"}><option value="active">فعال</option><option value="draft">پیش‌نویس</option></select></label>
            <label><span>ترتیب نمایش</span><input type="number" min="0" name="order" defaultValue={partner?.displayOrder ?? 0} /></label>
          </div>
          <label><span>همراه اصلی</span><select name="featured" defaultValue={partner?.featured ? "yes" : "no"}><option value="yes">بله</option><option value="no">خیر</option></select></label>
          <label className="cms-secondary-upload"><input type="file" name="logo" accept="image/png,image/jpeg,image/webp" /><span>لوگوی همراه</span><small>PNG / JPG / WebP • حداکثر ۳ مگابایت</small></label>
        </section>
      </form>
    </CmsShell>
  );
}
