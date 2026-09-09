import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { asBoolean, asOrder, asText, uniquePartnerSlug } from "../../../../lib/content-utils";
import { getCurrentAdmin } from "../../../../lib/current-admin";
import { db } from "../../../../lib/db";
import { saveImageUpload } from "../../../../lib/media-storage";

function redirectToList(request: NextRequest, result: string) {
  const url = new URL("/admin/partners", request.url);
  url.searchParams.set("result", result);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  const form = await request.formData();
  const operation = asText(form, "operation") || "draft";
  const name = asText(form, "name");
  if (!name) return redirectToList(request, "validation-error");

  try {
    const logo = await saveImageUpload(form.get("logo"), name, 3 * 1024 * 1024);
    const slug = await uniquePartnerSlug(name);
    await db.partner.create({
      data: {
        slug,
        name,
        website: asText(form, "website") || null,
        status: operation === "publish" ? "active" : "draft",
        featured: asBoolean(form, "featured"),
        displayOrder: asOrder(form),
        logoMediaId: logo?.id || null,
      },
    });
    revalidatePath("/");
    revalidatePath("/admin/partners");
    return redirectToList(request, operation === "publish" ? "published" : "saved");
  } catch (error) {
    return redirectToList(request, error instanceof Error ? error.message : "save-error");
  }
}
