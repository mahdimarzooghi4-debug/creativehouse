import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { asBoolean, asOrder, asText, parseOptionalDate, uniqueProgramSlug } from "../../../../lib/content-utils";
import { getCurrentAdmin } from "../../../../lib/current-admin";
import { db } from "../../../../lib/db";
import { saveImageUpload } from "../../../../lib/media-storage";

function redirectToList(request: NextRequest, notice: string) {
  const url = new URL("/admin/programs", request.url);
  url.searchParams.set("notice", notice);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.redirect(new URL("/admin/login", request.url), 303);

  const form = await request.formData();
  const operation = asText(form, "operation") || "draft";
  const title = asText(form, "title");
  const type = asText(form, "type") || "event";
  const summary = asText(form, "summary");
  if (!title || (operation === "publish" && !summary)) return redirectToList(request, "validation-error");

  try {
    const cover = await saveImageUpload(form.get("cover"), title);
    const requestedStatus = asText(form, "status");
    const status = operation === "publish" && ["published", "active", "scheduled"].includes(requestedStatus) ? requestedStatus : operation === "publish" ? "published" : "draft";
    const slug = await uniqueProgramSlug(title);

    await db.program.create({
      data: {
        slug,
        title,
        type,
        duration: asText(form, "duration") || null,
        summary: summary || null,
        outputs: asText(form, "outputs") || null,
        registrationUrl: asText(form, "registration") || null,
        status,
        startsAt: parseOptionalDate(form.get("startsAt")),
        endsAt: parseOptionalDate(form.get("endsAt")),
        featured: asBoolean(form, "featured"),
        displayOrder: asOrder(form),
        coverMediaId: cover?.id || null,
      },
    });

    revalidatePath("/");
    revalidatePath("/programs");
    revalidatePath("/admin/programs");
    return redirectToList(request, operation === "publish" ? "published" : "draft-saved");
  } catch (error) {
    return redirectToList(request, error instanceof Error ? error.message : "save-error");
  }
}
