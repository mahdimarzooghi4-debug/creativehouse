import { CmsShell } from "../../../components/cms-shell";
import { getCurrentAdmin } from "../../../lib/current-admin";
import { getSiteSettings } from "../../../lib/site-settings";

export const dynamic = "force-dynamic";

const resultMessages: Record<string, string> = {
  "site-saved": "تنظیمات سایت ذخیره شد.",
  "password-updated": "رمز عبور مدیر با موفقیت تغییر کرد.",
  "username-updated": "تنظیمات ذخیره شد و نام کاربری مدیر تغییر کرد.",
  "validation-error": "نام سایت، دامنه، ایمیل و نام کاربری مدیر را معتبر وارد کنید.",
  "current-password-required": "برای تغییر نام کاربری یا رمز عبور، رمز عبور فعلی را وارد کنید.",
  "current-password-invalid": "رمز عبور فعلی صحیح نیست.",
  "password-too-short": "رمز عبور جدید باید حداقل ۱۰ کاراکتر باشد.",
  "username-taken": "این نام کاربری قبلاً استفاده شده است.",
  "save-error": "ذخیره تنظیمات انجام نشد. دوباره تلاش کنید.",
};

export default async function AdminSiteSettingsPage({ searchParams }: { searchParams: Promise<{ result?: string }> }) {
  const [{ result }, settings, admin] = await Promise.all([searchParams, getSiteSettings(), getCurrentAdmin()]);
  const feedback = result ? resultMessages[result] : undefined;

  return (
    <CmsShell active="settings">
      <form className="cms-dashboard cms-site-settings" action="/api/admin/settings" method="post">
        <header className="cms-page-header">
          <div>
            <h1>تنظیمات سایت</h1>
            <p>اطلاعات عمومی، تماس، سئو و امنیت پنل را مدیریت کن</p>
          </div>
          <button className="cms-site-save" type="submit" name="operation" value="save-site">ذخیره تنظیمات</button>
        </header>

        {feedback ? <div className="cms-secondary-feedback" role="status">{feedback}</div> : null}

        <div className="cms-site-grid">
          <section className="cms-site-card cms-general-settings">
            <h2>اطلاعات عمومی</h2>
            <label><span>نام سایت</span><input name="siteName" required maxLength={120} defaultValue={settings.siteName} /></label>
            <label><span>شعار</span><input name="tagline" maxLength={160} defaultValue={settings.tagline || ""} /></label>
            <label><span>دامنه</span><input name="domain" required maxLength={180} defaultValue={settings.domain || ""} data-ltr="true" /></label>
          </section>

          <section className="cms-site-card cms-contact-settings">
            <h2>اطلاعات تماس</h2>
            <label><span>تلفن ۱</span><input name="phone1" type="tel" maxLength={30} defaultValue={settings.phone1 || ""} /></label>
            <label><span>تلفن ۲</span><input name="phone2" type="tel" maxLength={30} defaultValue={settings.phone2 || ""} /></label>
            <label><span>ایمیل</span><input name="email" required type="email" maxLength={180} defaultValue={settings.email || ""} data-ltr="true" /></label>
            <label><span>آدرس</span><input name="address" maxLength={300} defaultValue={settings.address || ""} /></label>
          </section>

          <section className="cms-site-card cms-seo-settings">
            <h2>سئو و اشتراک‌گذاری</h2>
            <label><span>عنوان پیش‌فرض</span><input name="defaultTitle" maxLength={160} defaultValue={settings.defaultTitle || ""} /></label>
            <label><span>توضیحات متا</span><textarea name="metaDescription" maxLength={320} defaultValue={settings.metaDescription || ""} /></label>
          </section>

          <section className="cms-site-card cms-security-settings">
            <h2>امنیت و حساب مدیر</h2>
            <label><span>نام کاربری مدیر</span><input name="adminUsername" required minLength={3} maxLength={60} defaultValue={admin?.username || "admin"} data-ltr="true" autoComplete="username" /></label>
            <label><span>رمز عبور فعلی</span><input name="currentPassword" type="password" autoComplete="current-password" placeholder="فقط برای تغییر حساب لازم است" /></label>
            <label><span>رمز عبور جدید</span><input name="password" type="password" minLength={10} maxLength={128} placeholder="حداقل ۱۰ کاراکتر" autoComplete="new-password" /></label>
            <button className="cms-change-password" type="submit" name="operation" value="change-password" formNoValidate>تغییر رمز عبور</button>
          </section>
        </div>
      </form>
    </CmsShell>
  );
}
