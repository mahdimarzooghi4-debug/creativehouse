import { CmsShell } from "../../../components/cms-shell";

export default function AdminSiteSettingsPage() {
  return (
    <CmsShell active="settings">
      <form className="cms-dashboard cms-site-settings" action="#" method="post">
        <header className="cms-page-header">
          <div>
            <h1>تنظیمات سایت</h1>
            <p>اطلاعات عمومی، تماس، سئو و امنیت پنل را مدیریت کن</p>
          </div>
          <button className="cms-site-save" type="submit">ذخیره تنظیمات</button>
        </header>

        <div className="cms-site-grid">
          <section className="cms-site-card cms-general-settings">
            <h2>اطلاعات عمومی</h2>
            <label>
              <span>نام سایت</span>
              <input name="siteName" defaultValue="خانه خلاق و نوآوری آینه" />
            </label>
            <label>
              <span>شعار</span>
              <input name="tagline" defaultValue="وطن، ساختنی است" />
            </label>
            <label>
              <span>دامنه</span>
              <input name="domain" defaultValue="ayenehouse.ir" data-ltr="true" />
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
              <input name="email" type="email" defaultValue="info@ayenehouse.ir" data-ltr="true" />
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
              <input name="adminUsername" defaultValue="admin" data-ltr="true" />
            </label>
            <label>
              <span>رمز عبور</span>
              <input name="password" type="password" placeholder="••••••••••••" autoComplete="new-password" />
            </label>
            <button className="cms-change-password" type="button">تغییر رمز عبور</button>
          </section>
        </div>
      </form>
    </CmsShell>
  );
}
