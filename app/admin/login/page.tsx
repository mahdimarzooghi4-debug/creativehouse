const BRAND_IMAGE = "https://www.figma.com/api/mcp/asset/573a13c7-ca7c-4d5c-9ed6-414e3e12c437.png";

export default function AdminLoginPage() {
  return (
    <main className="cms-login" dir="rtl">
      <section className="cms-login__visual" aria-label="هویت خانه خلاق و نوآوری آینه">
        <a className="cms-login__brand" href="/" aria-label="خانه خلاق و نوآوری آینه">
          <span className="cms-login__brand-title">خانه خلاق و نوآوری <b>آینه</b></span>
          <img src={BRAND_IMAGE} alt="" width={82} height={70} />
        </a>
        <div className="cms-login__identity-copy">
          <h1>وطن، ساختنی است</h1>
          <p>مدیریت محتوای خانه خلاق، برنامه‌ها، استارتاپ‌ها و اخبار</p>
        </div>
      </section>

      <section className="cms-login__panel">
        <div className="cms-login__card">
          <header>
            <h2>ورود به پنل مدیریت</h2>
            <p>اطلاعات حساب مدیر خانه خلاق را وارد کن.</p>
          </header>

          <form action="/admin" method="get" className="cms-login__form">
            <label>
              <span>نام کاربری</span>
              <input name="username" type="text" defaultValue="admin" autoComplete="username" required />
            </label>

            <label>
              <span>رمز عبور</span>
              <input name="password" type="password" placeholder="••••••••••••" autoComplete="current-password" required />
            </label>

            <button type="submit">ورود به پنل</button>
          </form>

          <p className="cms-login__security">دسترسی این بخش فقط برای مدیران مجاز سامانه است.</p>
        </div>
      </section>
    </main>
  );
}
