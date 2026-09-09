import { cache } from "react";
import { db } from "./db";

export const defaultHomepageSettings = {
  id: "main",
  heroEyebrow: "خانه خلاق و نوآوری آینه",
  heroTitle: "وطن، ساختنی است",
  heroSubtitle: "جایی برای شکل‌گیری، رشد و تبدیل ایده‌های خلاق به کسب‌وکارها و راهکارهای اثرگذار؛ با تمرکز بر ساختن، آزمودن و ایجاد اثر واقعی.",
  heroPrimaryLabel: "مشاهده استارتاپ‌ها",
  heroPrimaryHref: "/startups",
  heroSecondaryLabel: "آشنایی با خانه خلاق",
  heroSecondaryHref: "/about",
  heroMediaId: null as string | null,
  statPrograms: null as string | null,
  statStartups: null as string | null,
  statProvinces: "۳۱",
  statPartners: null as string | null,
  featuredNewsSlug: null as string | null,
  featuredProgramSlug: null as string | null,
  featuredStartupIds: null as string | null,
  featuredPartnerIds: null as string | null,
};

export const getHomepageSettings = cache(async () => {
  try {
    const settings = await db.homepageSettings.findUnique({ where: { id: "main" } });
    return settings ? { ...defaultHomepageSettings, ...settings } : defaultHomepageSettings;
  } catch {
    return defaultHomepageSettings;
  }
});

export function splitStoredIds(value?: string | null) {
  return (value || "").split(",").map((item) => item.trim()).filter(Boolean);
}
