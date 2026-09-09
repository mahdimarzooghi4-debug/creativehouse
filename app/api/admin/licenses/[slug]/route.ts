import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { asOrder, asText, parseOptionalDate } from "../../../../../lib/content-utils";
import { getCurrentAdmin } from "../../../../../lib/current-admin";
import { db } from "../../../../../lib/db";
import { saveDocumentUpload } from "../../../../../lib/media-storage";

function redirectToList(request: NextRequest, result: string) {
  const url = new URL("/admin/licenses", request.url);
  url.searchParams.set("result", result);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  const { slug } = await params;
  const existing = await db.license.findUnique({ where: { slug } });
  if (!existing || existing.deletedAt) return redirectToList(request, "not-found");

  const form = await request.formData();
  const operation = asText(form, "operation") || "draft";
  if (operation === "delete") {
    await db.license.update({ where: { id: existing.id }, data: { deletedAt: new Date(), status: "draft" } });
    revalidatePath("/licenses");
    revalidatePath("/admin/licenses");
    return redirectToList(request, "deleted");
  }

  const title = asText(form, "title");
  const issuer = asText(form, "issuer");
  if (!title || (operation === "publish" && !issuer)) return redirectToList(request, "validation-error");
  try {
    const document = await saveDocumentUpload(form.get("document"), title);
    if (operation === "publish" && !document && !existing.documentMediaId) return redirectToList(request, "document-required");
    await db.license.update({
      where: { id: existing.id },
      data: {
        title,
        issuer: issuer || null,
        description: asText(form, "description") || null,
        issuedAt: parseOptionalDate(form.get("issuedAt")),
        status: operation === "publish" ? "published" : "draft",
        documentMediaId: document?.id || existing.documentMediaId,
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
