import { CmsShell } from "./cms-shell";

type StartupEditorProps = {
  mode?: "create" | "edit";
};

export function CmsStartupEditor({ mode = "edit" }: StartupEditorProps) {
  const isCreate = mode === "create";

  return (
    <CmsShell active="startups">
      <form className="cms-dashboard cms-startup-editor" action="/admin/startups" method="get">
        <header className="cms-page-header cms-editor-header">
          <div>
            <h1>{isCreate ? "افزودن پروفایل استارتاپ" : "ویرایش پروفایل استارتاپ"}</h1>
            <p>اطلاعات عمومی، تصویر، تیم و وضعیت انتشار را مدیریت کن</p>
          </div>
          <div className="cms-editor-actions" aria-label="عملیات ویرایش استارتاپ">
            <a className="cms-outline-button" href="/admin/startups">{isCreate ? "لغو" : "بازگشت"}</a>
            <button className="cms-outline-button" type="submit" name="notice" value="draft-saved" formNoValidate>ذخیره پیش‌نویس</button>
            <button className="cms-dark-button" type="submit" name="notice" value="published">انتشار</button>
          </div>
        </header>

        <div className="cms-startup-editor-grid">
          <section className="cms-editor-card cms-editor-card--main">
            <h2>اطلاعات استارتاپ</h2>

            <label className="cms-form-field">
              <span>نام استارتاپ</span>
              <input name="name" required defaultValue={isCreate ? "" : "مرکز نوآوری آفتاب"} placeholder="نام استارتاپ" />
            </label>

            <label className="cms-form-field">
              <span>حوزه فعالیت</span>
              <input name="field" required defaultValue={isCreate ? "" : "فناوری فرهنگی و صنایع خلاق"} placeholder="حوزه فعالیت" />
            </label>

            <div className="cms-form-split">
              <label className="cms-form-field">
                <span>وضعیت انتشار</span>
                <select name="status" defaultValue={isCreate ? "draft" : "published"}>
                  <option value="published">منتشرشده</option>
                  <option value="draft">پیش‌نویس</option>
                  <option value="review">بازبینی</option>
                </select>
              </label>
              <label className="cms-form-field">
                <span>مرحله رشد</span>
                <select name="stage" defaultValue={isCreate ? "idea" : "growth"}>
                  <option value="idea">ایده</option>
                  <option value="prototype">نمونه اولیه</option>
                  <option value="validation">اعتبارسنجی</option>
                  <option value="growth">رشد</option>
                </select>
              </label>
            </div>

            <label className="cms-form-field">
              <span>معرفی کوتاه</span>
              <textarea name="summary" rows={4} required defaultValue={isCreate ? "" : "تیمی مسئله‌محور برای توسعه راهکارهای نوآورانه در بازار صنایع خلاق ایران."} placeholder="معرفی کوتاه استارتاپ" />
            </label>

            <label className="cms-form-field">
              <span>مسئله و راهکار</span>
              <textarea name="solution" rows={4} defaultValue={isCreate ? "" : "مسئله اصلی، راهکار پیشنهادی و مزیت متمایز استارتاپ در این بخش ثبت می‌شود."} placeholder="مسئله اصلی، راهکار پیشنهادی و مزیت متمایز" />
            </label>
          </section>

          <section className="cms-editor-card cms-editor-card--media">
            <h2>رسانه و تیم</h2>

            <label className="cms-upload-field cms-upload-field--logo">
              <input type="file" name="logo" accept="image/png,image/svg+xml" />
              <span>لوگوی استارتاپ</span>
              <small>PNG / SVG • حداکثر ۲ مگابایت</small>
            </label>

            <label className="cms-upload-field cms-upload-field--cover">
              <input type="file" name="cover" accept="image/*" />
              <span>تصویر کاور پروفایل</span>
              <small>نسبت پیشنهادی 16:9</small>
            </label>

            <label className="cms-form-field">
              <span>نام بنیان‌گذار</span>
              <input name="founder" defaultValue={isCreate ? "" : "علی رضایی"} placeholder="نام بنیان‌گذار" />
            </label>

            <label className="cms-form-field">
              <span>وب‌سایت / شبکه اجتماعی</span>
              <input name="website" dir="ltr" defaultValue={isCreate ? "" : "example.ir"} placeholder="example.ir" />
            </label>

            <div className="cms-form-split cms-form-split--media">
              <label className="cms-form-field">
                <span>نمایش در صفحه اصلی</span>
                <select name="featured" defaultValue={isCreate ? "no" : "yes"}>
                  <option value="yes">بله</option>
                  <option value="no">خیر</option>
                </select>
              </label>
              <label className="cms-form-field">
                <span>ترتیب نمایش</span>
                <input type="number" name="order" min="1" defaultValue={isCreate ? 1 : 4} />
              </label>
            </div>
          </section>
        </div>
      </form>
    </CmsShell>
  );
}
