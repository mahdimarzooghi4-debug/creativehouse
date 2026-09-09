import { SiteFooter, SiteHeader } from "../../components/site-chrome";

const modes = [
  ["تیم و استارتاپ", "برای ساخت، اعتبارسنجی و رشد یک محصول یا راهکار مسئله‌محور."],
  ["متخصص و منتور", "برای انتقال تجربه، منتورینگ تیم‌ها و همراهی در مسیر توسعه."],
  ["سازمان و مجموعه", "برای تعریف مسئله، اجرای پایلوت، همکاری فناورانه و توسعه بازار."],
  ["حامی و شریک اجرایی", "برای حمایت مالی، زیرساختی، رسانه‌ای یا همراهی در اجرای برنامه‌ها."],
];

const nextSteps = ["بررسی درخواست", "گفت‌وگوی اولیه", "تعریف مسیر همکاری"];

export default function CollaborationPage() {
  return (
    <div className="public-page">
      <SiteHeader />
      <main className="public-page__main">
        <section className="collaboration-hero">
          <div className="shell collaboration-hero__grid">
            <div className="collaboration-visual" aria-hidden="true">
              <span className="collaboration-visual__navy" />
              <span className="collaboration-visual__coral" />
              <span className="collaboration-visual__gold" />
              <strong>همکاری</strong>
              <p>خانه خلاق و نوآوری آینه</p>
            </div>
            <div className="collaboration-hero__copy">
              <p className="eyebrow">همکاری با خانه خلاق</p>
              <h1>بیایید با هم چیزی بسازیم</h1>
              <p>اگر تیم خلاق، استارتاپ، متخصص، مجموعه اجرایی یا سازمانی هستید و می‌خواهید در حل یک مسئله واقعی شریک شوید، از همین‌جا مسیر همکاری را شروع کنید.</p>
            </div>
          </div>
        </section>

        <section className="collaboration-modes">
          <div className="shell">
            <div className="section-intro section-intro--compact">
              <p className="eyebrow">مسیرهای همکاری</p>
              <h2>هر همکاری، یک مسیر مشخص دارد</h2>
            </div>
            <div className="collaboration-mode-grid">
              {modes.map(([title, text]) => (
                <article className="collaboration-mode" key={title}>
                  <div className="collaboration-mode__accent" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="collaboration-form-section">
          <div className="shell">
            <div className="section-intro section-intro--compact">
              <p className="eyebrow">فرم درخواست همکاری</p>
              <h2>کمی از خودتان و ایده همکاری بگویید</h2>
            </div>
            <div className="collaboration-form-grid">
              <aside className="collaboration-side">
                <p className="eyebrow">ارتباط مستقیم</p>
                <h3>قبل از ارسال فرم هم می‌توانید با ما در تماس باشید</h3>
                <div className="collaboration-side__contact">
                  <p>تهران، خیابان انقلاب، خیابان رازی، کوچه شهبازیان، پلاک ۲۲</p>
                  <p>تلفن: ۰۲۱-۶۶۴۸۵۳۷۴</p>
                  <p>تلفن: ۰۲۱-۶۶۴۰۶۴۷۵</p>
                  <p>info@ayenehouse.ir</p>
                </div>
                <p className="collaboration-side__note">پس از ارسال، درخواست بررسی می‌شود و در صورت تناسب، تیم خانه خلاق برای ادامه مسیر با شما تماس می‌گیرد.</p>
              </aside>

              <form className="collaboration-form">
                <div className="collaboration-form__two">
                  <div className="form-field">
                    <label htmlFor="fullName">نام و نام خانوادگی</label>
                    <input id="fullName" name="fullName" placeholder="مثلاً: مهدی رضایی" autoComplete="name" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="teamName">نام مجموعه / تیم</label>
                    <input id="teamName" name="teamName" placeholder="نام مجموعه یا تیم شما" />
                  </div>
                </div>
                <div className="collaboration-form__two">
                  <div className="form-field">
                    <label htmlFor="phone">شماره تماس</label>
                    <input id="phone" name="phone" inputMode="tel" placeholder="۰۹۱۲۱۲۳۴۵۶۷" autoComplete="tel" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">ایمیل</label>
                    <input id="email" name="email" type="email" placeholder="name@example.com" autoComplete="email" />
                  </div>
                </div>

                <fieldset>
                  <legend>نوع همکاری</legend>
                  <div className="collaboration-options">
                    <label className="collaboration-option"><input type="radio" name="type" defaultChecked />تیم / استارتاپ</label>
                    <label className="collaboration-option"><input type="radio" name="type" />منتور / متخصص</label>
                    <label className="collaboration-option"><input type="radio" name="type" />سازمان / مجموعه</label>
                  </div>
                </fieldset>

                <div className="form-field form-field--wide">
                  <label htmlFor="subject">موضوع همکاری</label>
                  <input id="subject" name="subject" placeholder="در یک جمله موضوع اصلی همکاری را بنویسید" />
                </div>
                <div className="form-field form-field--textarea">
                  <label htmlFor="description">توضیحات</label>
                  <textarea id="description" name="description" rows={3} placeholder="مسئله، ظرفیت، پیشنهاد یا انتظارتان از همکاری با خانه خلاق را کوتاه توضیح دهید." />
                </div>
                <button className="button button--primary collaboration-submit" type="button">ارسال درخواست</button>
              </form>
            </div>
          </div>
        </section>

        <section className="collaboration-next">
          <div className="shell">
            <div className="section-intro section-intro--compact">
              <p className="eyebrow">بعد از ارسال درخواست</p>
              <h2>سه قدم تا شروع یک همکاری</h2>
            </div>
            <div className="collaboration-next-grid">
              {nextSteps.map((step, index) => (
                <article className="collaboration-next-card" key={step}>
                  <span>{index + 1}</span>
                  <strong>{step}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
