import { CmsShell } from "./cms-shell";

type ProgramEditorProps = {
  mode?: "create" | "edit";
};

export function CmsProgramEditor({ mode = "edit" }: ProgramEditorProps) {
  const isCreate = mode === "create";

  return (
    <CmsShell active="programs">
      <form className="cms-dashboard cms-program-editor" action="/admin/programs" method="get">
        <header className="cms-page-header cms-program-editor-header">
          <div>
            <h1>{isCreate ? "افزودن برنامه" : "ویرایش برنامه"}</h1>
            <p>محتوا، زمان‌بندی، ثبت‌نام و وضعیت انتشار برنامه را مدیریت کن</p>
          </div>
          <div className="cms-program-editor-actions">
            <button className="cms-outline-button" type="submit" name="state" value="draft">ذخیره پیش‌نویس</button>
            <button className="cms-program-dark-button" type="submit" name="state" value="published">انتشار</button>
          </div>
        </header>

        <div className="cms-program-editor-grid">
          <section className="cms-program-editor-card cms-program-editor-card--main">
            <h2>اطلاعات برنامه</h2>

            <label className="cms-program-form-field">
              <span>عنوان برنامه</span>
              <input name="title" defaultValue={isCreate ? "" : "برنامه رشد و شتابدهی"} placeholder="عنوان برنامه" />
            </label>

            <div className="cms-program-form-split cms-program-form-split--main">
              <label className="cms-program-form-field">
                <span>مدت</span>
                <input name="duration" defaultValue={isCreate ? "" : "۳ ماه"} placeholder="مدت برنامه" />
              </label>
              <label className="cms-program-form-field">
                <span>نوع برنامه</span>
                <select name="type" defaultValue={isCreate ? "event" : "acceleration"}>
                  <option value="event">رویداد</option>
                  <option value="acceleration">شتابدهی</option>
                  <option value="workshop">کارگاه</option>
                  <option value="session">نشست</option>
                  <option value="mentoring">منتورینگ</option>
                </select>
              </label>
            </div>

            <label className="cms-program-form-field">
              <span>معرفی</span>
              <textarea name="summary" rows={4} defaultValue={isCreate ? "" : "برنامه‌ای برای همراهی تیم‌ها از اعتبارسنجی مسئله تا توسعه محصول و بازار."} placeholder="معرفی برنامه" />
            </label>

            <label className="cms-program-form-field">
              <span>خروجی‌های برنامه</span>
              <textarea name="outputs" rows={4} defaultValue={isCreate ? "" : "منتورینگ تخصصی، کارگاه، اعتبارسنجی بازار، آماده‌سازی ارائه و اتصال به شبکه همراهان."} placeholder="خروجی‌های برنامه" />
            </label>

            <label className="cms-program-form-field">
              <span>لینک ثبت‌نام</span>
              <input name="registration" dir="ltr" defaultValue={isCreate ? "" : "event.ayenehouse.ir"} placeholder="event.ayenehouse.ir" />
            </label>
          </section>

          <section className="cms-program-editor-card cms-program-editor-card--side">
            <h2>انتشار و زمان‌بندی</h2>

            <label className="cms-program-form-field">
              <span>وضعیت</span>
              <select name="status" defaultValue={isCreate ? "draft" : "published"}>
                <option value="published">منتشرشده</option>
                <option value="active">فعال</option>
                <option value="draft">پیش‌نویس</option>
                <option value="scheduled">زمان‌بندی</option>
              </select>
            </label>

            <label className="cms-program-form-field">
              <span>شروع</span>
              <input name="startsAt" inputMode="numeric" defaultValue={isCreate ? "" : "۱۴۰۵/۰۷/۱۵"} placeholder="۱۴۰۵/۰۷/۱۵" />
            </label>

            <label className="cms-program-form-field">
              <span>پایان</span>
              <input name="endsAt" inputMode="numeric" defaultValue={isCreate ? "" : "۱۴۰۵/۱۰/۱۵"} placeholder="۱۴۰۵/۱۰/۱۵" />
            </label>

            <div className="cms-program-form-split cms-program-form-split--side">
              <label className="cms-program-form-field">
                <span>برنامه منتخب</span>
                <select name="featured" defaultValue={isCreate ? "no" : "yes"}>
                  <option value="yes">بله</option>
                  <option value="no">خیر</option>
                </select>
              </label>
              <label className="cms-program-form-field">
                <span>ترتیب نمایش</span>
                <input type="number" name="order" min="1" defaultValue={isCreate ? 1 : 2} />
              </label>
            </div>

            <label className="cms-program-upload-field">
              <input type="file" name="cover" accept="image/*" />
              <span>تصویر برنامه</span>
              <small>نسبت پیشنهادی 16:9</small>
            </label>
          </section>
        </div>
      </form>
    </CmsShell>
  );
}
