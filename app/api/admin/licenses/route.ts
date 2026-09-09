import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { asOrder, asText, parseOptionalDate, uniqueLicenseSlug } from "../../../../lib/content-utils";
import { getCurrentAdmin } from "../../../../lib/current-admin";
import { db } from "../../../../lib/db";
import { saveDocumentUpload } from "../../../../lib/media-storage";

function redirectToList(request: NextRequest, result: string) {
  const url = new URL("/admin/licenses", request.url);
  url.searchParams.set("result", result);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  const form = await request.formData();
  const operation = asText(form, "operation") || "draft";
  const title = asText(form, "title");
  const issuer = asText(form, "issuer");
  if (!title || (operation === "publish" && !issuer)) return redirectToList(request, "validation-error");

  try {
    const document = await saveDocumentUpload(form.get("document"), title);
    if (operation === "publish" && !document) return redirectToList(request, "document-required");
    const slug = await uniqueLicenseSlug(title);
    await db.license.create({
      data: {
        slug,
        title,
        issuer: issuer || null,
        description: asText(form, "description") || null,
        issuedAt: parseOptionalDate(form.get("issuedAt")),
        status: operation === "publish" ? "published" : "draft",
        documentMediaId: document?.id || null,
        displayOrder: asOrder(form),
      },
    });
    revalidatePath("/licenses");
    revalidatePath("/admin/licenses");
    return redirectToList(request, operation === "publish" ? "published" : "saved");
  } catch (error) {
    return redirectToList(request, error instanceof Error ? error.message : "save-error");
  }
}
