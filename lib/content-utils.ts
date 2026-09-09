import { db } from "./db";

export const startupStageLabels: Record<string, string> = {
  idea: "ایده",
  prototype: "نمونه اولیه",
  validation: "اعتبارسنجی",
  growth: "رشد",
};

export const contentStatusLabels: Record<string, string> = {
  published: "منتشرشده",
  active: "فعال",
  scheduled: "زمان‌بندی",
  draft: "پیش‌نویس",
  review: "بازبینی",
};

export const newsCategoryLabels: Record<string, string> = {
  news: "خبر",
  report: "گزارش",
  "activity-report": "گزارش فعالیت",
  call: "فراخوان",
  collaboration: "همکاری",
};

export const programTypeLabels: Record<string, string> = {
  event: "رویداد",
  acceleration: "شتابدهی",
  workshop: "کارگاه",
  session: "نشست",
  mentoring: "منتورینگ",
};

export function formatPersianDate(value?: Date | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tehran",
  }).format(value);
}

export function formatPersianMonth(value?: Date | null) {
  if (!value) return "";
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "long",
    timeZone: "Asia/Tehran",
  }).format(value);
}

export function formatDateInput(value?: Date | null) {
  if (!value) return "";
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function normalizeSlugSource(value: string, fallback: string) {
  const normalized = value
    .trim()
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[\s_]+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return normalized || fallback;
}

async function uniqueSlug(baseValue: string, fallback: string, exists: (slug: string) => Promise<boolean>) {
  const base = normalizeSlugSource(baseValue, fallback);
  let slug = base;
  let suffix = 2;
  while (await exists(slug)) slug = `${base}-${suffix++}`;
  return slug;
}

export function uniqueStartupSlug(name: string) {
  return uniqueSlug(name, "startup", async (slug) => Boolean(await db.startup.findUnique({ where: { slug }, select: { id: true } })));
}

export function uniqueNewsSlug(title: string) {
  return uniqueSlug(title, "news", async (slug) => Boolean(await db.news.findUnique({ where: { slug }, select: { id: true } })));
}

export function uniqueProgramSlug(title: string) {
  return uniqueSlug(title, "program", async (slug) => Boolean(await db.program.findUnique({ where: { slug }, select: { id: true } })));
}

export function uniquePartnerSlug(name: string) {
  return uniqueSlug(name, "partner", async (slug) => Boolean(await db.partner.findUnique({ where: { slug }, select: { id: true } })));
}

export function uniqueLicenseSlug(title: string) {
  return uniqueSlug(title, "license", async (slug) => Boolean(await db.license.findUnique({ where: { slug }, select: { id: true } })));
}

export function parseOptionalDate(value: FormDataEntryValue | null) {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) return null;
  const date = new Date(text.length === 10 ? `${text}T09:00:00+03:30` : text);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function asText(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function asBoolean(form: FormData, key: string) {
  return asText(form, key) === "yes";
}

export function asOrder(form: FormData, key = "order") {
  const parsed = Number.parseInt(asText(form, key), 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}
