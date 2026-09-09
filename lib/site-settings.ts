import { cache } from "react";
import { db } from "./db";

export const defaultSiteSettings = {
  id: "main",
  siteName: "خانه خلاق و نوآوری آینه",
  tagline: "وطن، ساختنی است",
  domain: "ayenehouse.ir",
  phone1: "۰۲۱-۶۶۴۸۵۳۷۴",
  phone2: "۰۲۱-۶۶۴۰۶۴۷۵",
  email: "info@ayenehouse.ir",
  address: "تهران، خیابان انقلاب، خیابان رازی، کوچه شهبازیان، پلاک ۲۲",
  defaultTitle: "خانه خلاق و نوآوری آینه",
  metaDescription: "خانه خلاق و نوآوری آینه؛ بستری برای رشد تیم‌ها، برنامه‌های نوآوری و صنایع خلاق.",
};

export const getSiteSettings = cache(async () => {
  try {
    const settings = await db.siteSettings.findUnique({ where: { id: "main" } });
    return settings ? { ...defaultSiteSettings, ...settings } : defaultSiteSettings;
  } catch {
    return defaultSiteSettings;
  }
});
