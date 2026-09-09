export const collaborationTypeLabels: Record<string, string> = {
  startup: "تیم / استارتاپ",
  mentor: "منتور / متخصص",
  organization: "سازمان / مجموعه",
  partner: "حامی / شریک اجرایی",
};

export const collaborationStatusLabels: Record<string, string> = {
  new: "جدید",
  following: "در حال پیگیری",
  contacted: "تماس گرفته شد",
  closed: "بسته شد",
};

export const allowedCollaborationTypes = new Set(Object.keys(collaborationTypeLabels));
export const allowedCollaborationStatuses = new Set(Object.keys(collaborationStatusLabels));

export function maskPhone(phone: string) {
  const normalized = phone.trim();
  if (normalized.length < 7) return normalized;
  return `${normalized.slice(0, 4)} *** ${normalized.slice(-4)}`;
}
