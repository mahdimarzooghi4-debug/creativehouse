import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { asText } from "../../../../lib/content-utils";
import { getCurrentAdmin } from "../../../../lib/current-admin";
import { db } from "../../../../lib/db";
import { CMS_HERO_MEDIA_ALT } from "../../../../lib/homepage-settings";
import { saveImageUpload } from "../../../../lib/media-storage";

function redirect(request: NextRequest, result: string) {
  const url = new URL("/admin/homepage", request.url);
  url.searchParams.set("result", result);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.redirect(new URL("/admin/login", request.url), 303);

  const form = await request.formData();
  const heroTitle = asText(form, "heroTitle");
  const heroPrimaryLabel = asText(form, "heroPrimaryLabel");
  if (!heroTitle || !heroPrimaryLabel) return redirect(request, "validation-error");

  try {
    const existing = await db.homepageSettings.findUnique({ where: { id: "main" } });
    const heroMedia = await saveImageUpload(form.get("heroImage"), CMS_HERO_MEDIA_ALT, 6 * 1024 * 1024);
    const data = {
      heroEyebrow: existing?.heroEyebrow || "خانه خلاق و نوآوری آینه",
      heroTitle,
      heroSubtitle: existing?.heroSubtitle || "جایی برای شکل‌گیری، رشد و تبدیل ایده‌های خلاق به کسب‌وکارها و راهکارهای اثرگذار؛ با تمرکز بر ساختن، آزمودن و ایجاد اثر واقعی.",
      heroPrimaryLabel,
      heroPrimaryHref: asText(form, "heroPrimaryHref") || existing?.heroPrimaryHref || "/startups",
      heroSecondaryLabel: existing?.heroSecondaryLabel || "آشنایی با خانه خلاق",
      heroSecondaryHref: existing?.heroSecondaryHref || "/about",
      heroMediaId: heroMedia?.id || existing?.heroMediaId || null,
      statPrograms: asText(form, "statPrograms") || null,
      statStartups: asText(form, "statStartups") || null,
      statProvinces: asText(form, "statProvinces") || null,
      statPartners: asText(form, "statPartners") || null,
      featuredStartupIds: asText(form, "featuredStartupId") || null,
      featuredProgramSlug: asText(form, "featuredProgramSlug") || null,
      featuredNewsSlug: asText(form, "featuredNewsSlug") || null,
      featuredPartnerIds: existing?.featuredPartnerIds || null,
    };

    await db.homepageSettings.upsert({
      where: { id: "main" },
      update: data,
      create: { id: "main", ...data },
    });

    revalidatePath("/");
    revalidatePath("/admin/homepage");
    return redirect(request, "saved");
  } catch (error) {
    const code = error instanceof Error ? error.message : "save-error";
    return redirect(request, ["unsupported-image", "image-too-large", "invalid-image"].includes(code) ? code : "save-error");
  }
}
