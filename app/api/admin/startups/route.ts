import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "../../../../lib/current-admin";
import { db } from "../../../../lib/db";
import { asBoolean, asOrder, asText, uniqueStartupSlug } from "../../../../lib/content-utils";
import { saveImageUpload } from "../../../../lib/media-storage";

function redirectToList(request: NextRequest, notice: string) {
  const url = new URL("/admin/startups", request.url);
  url.searchParams.set("notice", notice);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.redirect(new URL("/admin/login", request.url), 303);

  const form = await request.formData();
  const operation = asText(form, "operation") || "draft";
  const name = asText(form, "name");
  const field = asText(form, "field");
  const summary = asText(form, "summary");

  if (!name || !field || (operation === "publish" && !summary)) {
    return redirectToList(request, "validation-error");
  }

  try {
    const [logo, cover] = await Promise.all([
      saveImageUpload(form.get("logo"), `${name} - لوگو`, 2 * 1024 * 1024),
      saveImageUpload(form.get("cover"), `${name} - تصویر کاور`),
    ]);

    const slug = await uniqueStartupSlug(name);
    await db.startup.create({
      data: {
        slug,
        name,
        field,
        stage: asText(form, "stage") || "idea",
        status: operation === "publish" ? "published" : "draft",
        summary: summary || null,
        solution: asText(form, "solution") || null,
        founder: asText(form, "founder") || null,
        website: asText(form, "website") || null,
        featured: asBoolean(form, "featured"),
        displayOrder: asOrder(form),
        logoMediaId: logo?.id || null,
        coverMediaId: cover?.id || null,
      },
    });

    revalidatePath("/");
    revalidatePath("/startups");
    revalidatePath("/admin/startups");
    return redirectToList(request, operation === "publish" ? "published" : "draft-saved");
  } catch (error) {
    const code = error instanceof Error ? error.message : "save-error";
    return redirectToList(request, code);
  }
}
