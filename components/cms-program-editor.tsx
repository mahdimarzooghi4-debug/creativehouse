import { formatDateInput } from "../lib/content-utils";
import { CmsShell } from "./cms-shell";

type ProgramData = {
  slug: string;
  title: string;
  type: string;
  duration: string | null;
  summary: string | null;
  outputs: string | null;
  registrationUrl: string | null;
  status: string;
  startsAt: Date | null;
  endsAt: Date | null;
  featured: boolean;
  displayOrder: number;
};

type ProgramEditorProps = {
  mode?: "create" | "edit";
  program?: ProgramData;
};

export function CmsProgramEditor({ mode = "edit", program }: ProgramEditorProps) {
  const isCreate = mode === "create";
  const action = isCreate ? "/api/admin/programs" : `/api/admin/programs/${program?.slug}`;

  return (
    <CmsShell active="programs">
      <form className="cms-dashboard cms-program-editor" action={action} method="post" encType="multipart/form-data">
        <header className="cms-page-header cms-program-editor-header">
          <div>
            <h1>{isCreate ? "افزودن برنامه" : "ویرایش برنامه"}</h1>
            <p>محتوا، زمان‌بندی، ثبت‌نام و وضعیت انتشار برنامه را مدیریت کن</p>
          </div>
          <div className="cms-program-editor-actions" aria-label="عملیات ویرایش برنامه">
            <a className="cms-outline-button" href="/admin/programs">{isCreate ? "لغو" : "بازگشت"}</a>
            {!isCreate ? <button className="cms-outline-button" type="submit" name="operation" value="delete" formNoValidate>حذف</button> : null}
            <button className="cms-outline-button" type="submit" name="operation" value="draft" formNoValidate>ذخیره پیش‌نویس</button>
            <button className="cms-program-dark-button" type="submit" name="operation" value="publish">انتشار</button>
          </div>
        </header>

        <div className="cms-program-editor-grid">
          <section className="cms-program-editor-card cms-program-editor-card--main">
            <h2>اطلاعات برنامه</h2>

            <label className="cms-program-form-field">
              <span>عنوان برنامه</span>
              <input name="title" required defaultValue={program?.title || ""} placeholder="عنوان برنامه" />
            </label>

            <div className="cms-program-form-split cms-program-form-split--main">
              <label className="cms-program-form-field">
                <span>مدت</span>
                <input name="duration" defaultValue={program?.duration || ""} placeholder="مدت برنامه" />
              </label>
              <label className="cms-program-form-field">
                <span>نوع برنامه</span>
                <select name="type" defaultValue={program?.type || "event"}>
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
              <textarea name="summary" rows={4} required defaultValue={program?.summary || ""} placeholder="معرفی برنامه" />
            </label>

            <label className="cms-program-form-field">
              <span>خروجی‌های برنامه</span>
              <textarea name="outputs" rows={4} defaultValue={program?.outputs || ""} placeholder="خروجی‌های برنامه" />
            </label>

            <label className="cms-program-form-field">
              <span>لینک ثبت‌نام</span>
              <input name="registration" dir="ltr" defaultValue={program?.registrationUrl || ""} placeholder="https://..." />
            </label>
          </section>

          <section className="cms-program-editor-card cms-program-editor-card--side">
            <h2>انتشار و زمان‌بندی</h2>

            <label className="cms-program-form-field">
              <span>وضعیت</span>
              <select name="status" defaultValue={program?.status || "draft"}>
                <option value="published">منتشرشده</option>
                <option value="active">فعال</option>
                <option value="draft">پیش‌نویس</option>
                <option value="scheduled">زمان‌بندی</option>
              </select>
            </label>

            <label className="cms-program-form-field">
              <span>شروع</span>
              <input type="date" name="startsAt" defaultValue={formatDateInput(program?.startsAt)} />
            </label>

            <label className="cms-program-form-field">
              <span>پایان</span>
              <input type="date" name="endsAt" defaultValue={formatDateInput(program?.endsAt)} />
            </label>

            <div className="cms-program-form-split cms-program-form-split--side">
              <label className="cms-program-form-field">
                <span>برنامه منتخب</span>
                <select name="featured" defaultValue={program?.featured ? "yes" : "no"}>
                  <option value="yes">بله</option>
                  <option value="no">خیر</option>
                </select>
              </label>
              <label className="cms-program-form-field">
                <span>ترتیب نمایش</span>
                <input type="number" name="order" min="0" defaultValue={program?.displayOrder ?? 0} />
              </label>
            </div>

            <label className="cms-program-upload-field">
              <input type="file" name="cover" accept="image/png,image/jpeg,image/webp" />
              <span>تصویر برنامه</span>
              <small>PNG / JPG / WebP • حداکثر ۵ مگابایت</small>
            </label>
          </section>
        </div>
      </form>
    </CmsShell>
  );
}
