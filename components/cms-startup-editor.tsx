import { CmsShell } from "./cms-shell";

type StartupEditorValue = {
  slug: string;
  name: string;
  field: string;
  stage: string;
  status: string;
  summary: string | null;
  solution: string | null;
  founder: string | null;
  website: string | null;
  featured: boolean;
  displayOrder: number;
};

type StartupEditorProps = {
  mode?: "create" | "edit";
  startup?: StartupEditorValue | null;
};

export function CmsStartupEditor({ mode = "edit", startup }: StartupEditorProps) {
  const isCreate = mode === "create";
  const action = isCreate ? "/api/admin/startups" : `/api/admin/startups/${startup?.slug}`;

  return (
    <CmsShell active="startups">
      <form className="cms-dashboard cms-startup-editor" action={action} method="post" encType="multipart/form-data">
        <header className="cms-page-header cms-editor-header">
          <div>
            <h1>{isCreate ? "افزودن پروفایل استارتاپ" : "ویرایش پروفایل استارتاپ"}</h1>
            <p>اطلاعات عمومی، تصویر، تیم و وضعیت انتشار را مدیریت کن</p>
          </div>
          <div className="cms-editor-actions" aria-label="عملیات ویرایش استارتاپ">
            <a className="cms-outline-button" href="/admin/startups">{isCreate ? "لغو" : "بازگشت"}</a>
            {!isCreate && startup ? <a className="cms-outline-button" href={`/startups/${startup.slug}`} target="_blank" rel="noreferrer">پیش‌نمایش</a> : null}
            {!isCreate ? <button className="cms-outline-button" type="submit" name="operation" value="delete" formNoValidate>حذف</button> : null}
            <button className="cms-outline-button" type="submit" name="operation" value="draft" formNoValidate>ذخیره پیش‌نویس</button>
            <button className="cms-dark-button" type="submit" name="operation" value="publish">انتشار</button>
          </div>
        </header>

        <div className="cms-startup-editor-grid">
          <section className="cms-editor-card cms-editor-card--main">
            <h2>اطلاعات استارتاپ</h2>

            <label className="cms-form-field">
              <span>نام استارتاپ</span>
              <input name="name" required defaultValue={startup?.name ?? ""} placeholder="نام استارتاپ" />
            </label>

            <label className="cms-form-field">
              <span>حوزه فعالیت</span>
              <input name="field" required defaultValue={startup?.field ?? ""} placeholder="حوزه فعالیت" />
            </label>

            <div className="cms-form-split">
              <label className="cms-form-field">
                <span>وضعیت انتشار</span>
                <select name="status" defaultValue={startup?.status ?? "draft"}>
                  <option value="published">منتشرشده</option>
                  <option value="draft">پیش‌نویس</option>
                  <option value="review">بازبینی</option>
                </select>
              </label>
              <label className="cms-form-field">
                <span>مرحله رشد</span>
                <select name="stage" defaultValue={startup?.stage ?? "idea"}>
                  <option value="idea">ایده</option>
                  <option value="prototype">نمونه اولیه</option>
                  <option value="validation">اعتبارسنجی</option>
                  <option value="growth">رشد</option>
                </select>
              </label>
            </div>

            <label className="cms-form-field">
              <span>معرفی کوتاه</span>
              <textarea name="summary" rows={4} required defaultValue={startup?.summary ?? ""} placeholder="معرفی کوتاه استارتاپ" />
            </label>

            <label className="cms-form-field">
              <span>مسئله و راهکار</span>
              <textarea name="solution" rows={4} defaultValue={startup?.solution ?? ""} placeholder="مسئله اصلی، راهکار پیشنهادی و مزیت متمایز" />
            </label>
          </section>

          <section className="cms-editor-card cms-editor-card--media">
            <h2>رسانه و تیم</h2>

            <label className="cms-upload-field cms-upload-field--logo">
              <input type="file" name="logo" accept="image/png,image/jpeg,image/webp" />
              <span>لوگوی استارتاپ</span>
              <small>PNG / JPG / WebP • حداکثر ۲ مگابایت</small>
            </label>

            <label className="cms-upload-field cms-upload-field--cover">
              <input type="file" name="cover" accept="image/png,image/jpeg,image/webp" />
              <span>تصویر کاور پروفایل</span>
              <small>PNG / JPG / WebP • حداکثر ۵ مگابایت</small>
            </label>

            <label className="cms-form-field">
              <span>نام بنیان‌گذار</span>
              <input name="founder" defaultValue={startup?.founder ?? ""} placeholder="نام بنیان‌گذار" />
            </label>

            <label className="cms-form-field">
              <span>وب‌سایت / شبکه اجتماعی</span>
              <input name="website" dir="ltr" defaultValue={startup?.website ?? ""} placeholder="https://example.ir" />
            </label>

            <div className="cms-form-split cms-form-split--media">
              <label className="cms-form-field">
                <span>نمایش در صفحه اصلی</span>
                <select name="featured" defaultValue={startup?.featured ? "yes" : "no"}>
                  <option value="yes">بله</option>
                  <option value="no">خیر</option>
                </select>
              </label>
              <label className="cms-form-field">
                <span>ترتیب نمایش</span>
                <input type="number" name="order" min="0" defaultValue={startup?.displayOrder ?? 0} />
              </label>
            </div>
          </section>
        </div>
      </form>
    </CmsShell>
  );
}
