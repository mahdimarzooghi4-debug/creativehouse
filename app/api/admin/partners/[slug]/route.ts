import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { asBoolean, asOrder, asText } from "../../../../../lib/content-utils";
import { getCurrentAdmin } from "../../../../../lib/current-admin";
import { db } from "../../../../../lib/db";
import { saveImageUpload } from "../../../../../lib/media-storage";

function redirectToList(request: NextRequest, result: string) {
  const url = new URL("/admin/partners", request.url);
  url.searchParams.set("result", result);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  const { slug } = await params;
  const existing = await db.partner.findUnique({ where: { slug } });
  if (!existing || existing.deletedAt) return redirectToList(request, "not-found");

  const form = await request.formData();
  const operation = asText(form, "operation") || "draft";
  if (operation === "delete") {
    await db.partner.update({ where: { id: existing.id }, data: { deletedAt: new Date(), status: "draft", featured: false } });
    revalidatePath("/");
    revalidatePath("/admin/partners");
    return redirectToList(request, "deleted");
  }

  const name = asText(form, "name");
  if (!name) return redirectToList(request, "validation-error");
  try {
    const logo = await saveImageUpload(form.get("logo"), name, 3 * 1024 * 1024);
    await db.partner.update({
      where: { id: existing.id },
      data: {
        name,
        website: asText(form, "website") || null,
        status: operation === "publish" ? "active" : "draft",
        featured: asBoolean(form, "featured"),
        displayOrder: asOrder(form),
        logoMediaId: logo?.id || existing.logoMediaId,
      },
    });
    revalidatePath("/");
    revalidatePath("/admin/partners");
    return redirectToList(request, operation === "publish" ? "published" : "saved");
  } catch (error) {
    return redirectToList(request, error instanceof Error ? error.message : "save-error");
  }
}
