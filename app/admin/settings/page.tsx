import { CmsShell } from "../../../components/cms-shell";

const resultMessages: Record<string, string> = {
  "site-saved": "تنظیمات سایت ذخیره شد.",
  "password-updated": "درخواست تغییر رمز عبور ثبت شد.",
};

export default async function AdminSiteSettingsPage({ searchParams }: { searchParams: Promise<{ result?: string }> }) {
  const { result } = await searchParams;
  const feedback = result ? resultMessages[result] : undefined;

  return (
    <CmsShell active="settings">
      <form className="cms-dashboard cms-site-settings" action="/admin/settings" method="get">
        <header className="cms-page-header">
          <div>
            <h1>تنظیمات سایت</h1>
            <p>اطلاعات عمومی، تماس، سئو و امنیت پنل را مدیریت کن</p>
          </div>
          <button className="cms-site-save" type="submit" name="result" value="site-saved">ذخیره تنظیمات</button>
        </header>

        {feedback ? <div className="cms-secondary-feedback" role="status">{feedback}</div> : null}

        <div className="cms-site-grid">
          <section className="cms-site-card cms-general-settings">
            <h2>اطلاعات عمومی</h2>
            <label>
              <span>نام سایت</span>
              <input name="siteName" required defaultValue="خانه خلاق و نوآوری آینه" />
            </label>
            <label>
              <span>شعار</span>
              <input name="tagline" defaultValue="وطن، ساختنی است" />
            </label>
            <label>
              <span>دامنه</span>
              <input name="domain" required defaultValue="ayenehouse.ir" data-ltr="true" />
            </label>
          </section>

          <section className="cms-site-card cms-contact-settings">
            <h2>اطلاعات تماس</h2>
            <label>
              <span>تلفن ۱</span>
              <input name="phone1" type="tel" defaultValue="۰۲۱-۶۶۴۸۵۳۷۴" />
            </label>
            <label>
              <span>تلفن ۲</span>
              <input name="phone2" type="tel" defaultValue="۰۲۱-۶۶۴۰۶۴۷۵" />
            </label>
            <label>
              <span>ایمیل</span>
              <input name="email" required type="email" defaultValue="info@ayenehouse.ir" data-ltr="true" />
            </label>
          </section>

          <section className="cms-site-card cms-seo-settings">
            <h2>سئو و اشتراک‌گذاری</h2>
            <label>
              <span>عنوان پیش‌فرض</span>
              <input name="defaultTitle" defaultValue="خانه خلاق و نوآوری آینه" />
            </label>
            <label>
              <span>توضیحات متا</span>
              <textarea name="metaDescription" defaultValue="خانه خلاق و نوآوری آینه؛ بستری برای رشد تیم‌ها، برنامه‌های نوآوری و صنایع خلاق." />
            </label>
          </section>

          <section className="cms-site-card cms-security-settings">
            <h2>امنیت و حساب مدیر</h2>
            <label>
              <span>نام کاربری مدیر</span>
              <input name="adminUsername" required defaultValue="admin" data-ltr="true" />
            </label>
            <label>
              <span>رمز عبور جدید</span>
              <input name="password" type="password" minLength={8} placeholder="حداقل ۸ کاراکتر" autoComplete="new-password" />
            </label>
            <button className="cms-change-password" type="submit" name="result" value="password-updated" formNoValidate>تغییر رمز عبور</button>
          </section>
        </div>
      </form>
    </CmsShell>
  );
}
