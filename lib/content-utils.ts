import { db } from "./db";

export const startupStageLabels: Record<string, string> = {
  idea: "ایده",
  prototype: "نمونه اولیه",
  validation: "اعتبارسنجی",
  growth: "رشد",
};

export const contentStatusLabels: Record<string, string> = {
  published: "منتشرشده",
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

export async function uniqueStartupSlug(name: string) {
  const base = normalizeSlugSource(name, "startup");
  let slug = base;
  let suffix = 2;
  while (await db.startup.findUnique({ where: { slug }, select: { id: true } })) {
    slug = `${base}-${suffix++}`;
  }
  return slug;
}

export async function uniqueNewsSlug(title: string) {
  const base = normalizeSlugSource(title, "news");
  let slug = base;
  let suffix = 2;
  while (await db.news.findUnique({ where: { slug }, select: { id: true } })) {
    slug = `${base}-${suffix++}`;
  }
  return slug;
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
