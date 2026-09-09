import { notFound } from "next/navigation";
import { CmsShell } from "../../../../components/cms-shell";
import { collaborationStatusLabels, collaborationTypeLabels } from "../../../../lib/collaboration-utils";
import { formatPersianDate } from "../../../../lib/content-utils";
import { db } from "../../../../lib/db";

export const dynamic = "force-dynamic";

export default async function AdminCollaborationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const request = await db.collaborationRequest.findUnique({ where: { id } });
  if (!request) notFound();

  const requestDetails = [
    ["نوع همکاری", collaborationTypeLabels[request.type] || request.type],
    ["نام", request.name],
    ["نام مجموعه / تیم", request.organization || "—"],
    ["ایمیل", request.email || "—"],
    ["شماره تماس", request.phone],
    ["زمان مناسب تماس", request.preferredContactTime || "—"],
    ["شهر", request.city || "—"],
  ] as const;

  return (
    <CmsShell active="collaboration">
      <div className="cms-dashboard cms-collaboration-detail-page">
        <header className="cms-page-header cms-collaboration-detail-header">
          <div>
            <h1>جزئیات درخواست همکاری</h1>
            <p>اطلاعات درخواست‌دهنده و وضعیت پیگیری را ثبت و مدیریت کن</p>
          </div>
          <a className="cms-outline-button cms-collaboration-back" href="/admin/collaboration">بازگشت</a>
        </header>

        <div className="cms-collaboration-detail-grid">
          <div className="cms-collaboration-detail-main">
            <section className="cms-collaboration-card cms-collaboration-info-card" aria-labelledby="collaboration-info-title">
              <h2 id="collaboration-info-title">اطلاعات درخواست</h2>
              <div className="cms-collaboration-info-grid">
                {requestDetails.map(([label, value]) => (
                  <div className="cms-collaboration-readonly-field" key={label}>
                    <span>{label}</span>
                    <div dir={label === "ایمیل" ? "ltr" : "auto"}>{value}</div>
                  </div>
                ))}
              </div>
            </section>

            <form className="cms-collaboration-card cms-collaboration-followup-card" action={`/api/admin/collaboration/${request.id}`} method="post" aria-labelledby="collaboration-followup-title">
              <h2 id="collaboration-followup-title">پیگیری درخواست</h2>
              <label className="cms-collaboration-form-field">
                <span>وضعیت فعلی</span>
                <input value={collaborationStatusLabels[request.status] || request.status} readOnly />
              </label>
              <label className="cms-collaboration-form-field">
                <span>وضعیت جدید</span>
                <select name="status" defaultValue={request.status}>
                  <option value="new">جدید</option>
                  <option value="following">در حال پیگیری</option>
                  <option value="contacted">تماس گرفته شد</option>
                  <option value="closed">بسته شد</option>
                </select>
              </label>
              <label className="cms-collaboration-form-field">
                <span>یادداشت داخلی</span>
                <textarea name="internalNote" rows={5} maxLength={3000} defaultValue={request.internalNote || ""} placeholder="یادداشت پیگیری فقط برای مدیر سایت" />
              </label>
              <div className="cms-collaboration-followup-actions">
                <button className="cms-collaboration-primary-button" type="submit" name="operation" value="update">ثبت نتیجه پیگیری</button>
                <button className="cms-outline-button" type="submit" name="operation" value="draft">ذخیره یادداشت</button>
              </div>
            </form>
          </div>

          <section className="cms-collaboration-card cms-collaboration-note-card" aria-labelledby="collaboration-note-title">
            <h2 id="collaboration-note-title">پیام و یادداشت‌ها</h2>
            {request.subject ? <div className="cms-collaboration-message-block"><span>موضوع همکاری</span><div>{request.subject}</div></div> : null}
            <div className="cms-collaboration-message-block">
              <span>متن درخواست</span>
              <div>{request.message}</div>
            </div>
            <div className="cms-collaboration-message-block cms-collaboration-internal-note">
              <span>یادداشت داخلی</span>
              <div>{request.internalNote || "هنوز یادداشتی ثبت نشده است."}</div>
            </div>
            <div className="cms-collaboration-history">
              <h3>تاریخچه پیگیری</h3>
              <p>{formatPersianDate(request.createdAt)}&nbsp; • &nbsp;درخواست دریافت شد</p>
              {request.updatedAt.getTime() !== request.createdAt.getTime() ? <p>{formatPersianDate(request.updatedAt)}&nbsp; • &nbsp;آخرین به‌روزرسانی</p> : null}
            </div>
          </section>
        </div>
      </div>
    </CmsShell>
  );
}
