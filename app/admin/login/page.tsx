import { BrandMark } from "../../../components/brand-mark";

const errorMessages: Record<string, string> = {
  invalid: "نام کاربری یا رمز عبور صحیح نیست.",
  locked: "تلاش‌های ورود بیش از حد مجاز بود. حدود ۱۵ دقیقه بعد دوباره امتحان کن.",
  setup: "حساب مدیر هنوز راه‌اندازی نشده است. تنظیمات اولیه سرور را بررسی کن.",
};

function safeNext(value?: string) {
  if (!value || !value.startsWith("/admin") || value.startsWith("//")) return "/admin";
  return value;
}

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string; next?: string }> }) {
  const { error, next } = await searchParams;
  const errorMessage = error ? errorMessages[error] : undefined;
  const destination = safeNext(next);

  return (
    <main className="cms-login" dir="rtl">
      <section className="cms-login__visual" aria-label="هویت خانه خلاق و نوآوری آینه">
        <a className="cms-login__brand" href="/" aria-label="خانه خلاق و نوآوری آینه">
          <BrandMark className="cms-login__brand-mark" />
          <span className="cms-login__brand-title">خانه خلاق و نوآوری <b>آینه</b></span>
        </a>
        <div className="cms-login__identity-copy">
          <h1>وطن<span className="cms-login__identity-comma">،</span> ساختنی است</h1>
          <p>مدیریت محتوای خانه خلاق، برنامه‌ها، استارتاپ‌ها و اخبار</p>
        </div>
      </section>

      <section className="cms-login__panel">
        <div className="cms-login__card">
          <header>
            <h2>ورود به پنل مدیریت</h2>
            <p>اطلاعات حساب مدیر خانه خلاق را وارد کن.</p>
          </header>

          {errorMessage ? <p className="cms-login__error" role="alert">{errorMessage}</p> : null}

          <form action="/api/admin/login" method="post" className="cms-login__form">
            <input type="hidden" name="next" value={destination} />
            <label>
              <span>نام کاربری</span>
              <input name="username" type="text" autoCapitalize="none" autoComplete="username" required />
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
