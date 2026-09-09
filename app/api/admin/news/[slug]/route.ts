import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentAdmin } from "../../../../../lib/current-admin";
import { db } from "../../../../../lib/db";
import { asBoolean, asText, parseOptionalDate } from "../../../../../lib/content-utils";
import { saveImageUpload } from "../../../../../lib/media-storage";

function redirectToList(request: NextRequest, notice: string) {
  const url = new URL("/admin/news", request.url);
  url.searchParams.set("notice", notice);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.redirect(new URL("/admin/login", request.url), 303);

  const { slug } = await params;
  const existing = await db.news.findUnique({ where: { slug } });
  if (!existing || existing.deletedAt) return redirectToList(request, "not-found");

  const form = await request.formData();
  const operation = asText(form, "operation") || "draft";

  if (operation === "delete") {
    await db.news.update({ where: { id: existing.id }, data: { deletedAt: new Date(), status: "draft", featured: false } });
    revalidatePath("/");
    revalidatePath("/news");
    revalidatePath(`/news/${slug}`);
    revalidatePath("/admin/news");
    return redirectToList(request, "deleted");
  }

  const title = asText(form, "title");
  const summary = asText(form, "summary");
  const body = asText(form, "body");
  if (!title || !body || (operation === "publish" && !summary)) return redirectToList(request, "validation-error");

  try {
    const cover = await saveImageUpload(form.get("cover"), title);
    const requestedStatus = asText(form, "status");
    const status = operation === "publish" ? (requestedStatus === "scheduled" ? "scheduled" : "published") : "draft";
    const publishedAt = operation === "publish" ? (parseOptionalDate(form.get("publishedAt")) || existing.publishedAt || new Date()) : existing.publishedAt;
    const featured = asBoolean(form, "featured");
    const updateNews = db.news.update({
      where: { id: existing.id },
      data: {
        title,
        summary: summary || null,
        body,
        tags: asText(form, "tags") || null,
        category: asText(form, "category") || "news",
        status,
        publishedAt,
        featured,
        coverMediaId: cover?.id || existing.coverMediaId,
      },
    });

    if (featured) {
      await db.$transaction([
        db.news.updateMany({ where: { deletedAt: null, featured: true, id: { not: existing.id } }, data: { featured: false } }),
        updateNews,
      ]);
    } else {
      await updateNews;
    }

    revalidatePath("/");
    revalidatePath("/news");
    revalidatePath(`/news/${slug}`);
    revalidatePath("/admin/news");
    return redirectToList(request, operation === "publish" ? "published" : "draft-saved");
  } catch (error) {
    const code = error instanceof Error ? error.message : "save-error";
    return redirectToList(request, code);
  }
}
