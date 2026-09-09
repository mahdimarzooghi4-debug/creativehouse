ALTER TABLE "CollaborationRequest" ADD COLUMN "subject" TEXT;

ALTER TABLE "HomepageSettings" ADD COLUMN "statPrograms" TEXT;
ALTER TABLE "HomepageSettings" ADD COLUMN "statStartups" TEXT;
ALTER TABLE "HomepageSettings" ADD COLUMN "statProvinces" TEXT;
ALTER TABLE "HomepageSettings" ADD COLUMN "statPartners" TEXT;
ALTER TABLE "HomepageSettings" ADD COLUMN "featuredProgramSlug" TEXT;
ALTER TABLE "HomepageSettings" ADD COLUMN "featuredPartnerIds" TEXT;

INSERT OR IGNORE INTO "HomepageSettings" (
  "id", "heroEyebrow", "heroTitle", "heroSubtitle", "heroPrimaryLabel", "heroPrimaryHref",
  "heroSecondaryLabel", "heroSecondaryHref", "statPrograms", "statStartups", "statProvinces", "statPartners", "updatedAt"
) VALUES (
  'main',
  'خانه خلاق و نوآوری آینه',
  'وطن، ساختنی است',
  'جایی برای شکل‌گیری، رشد و تبدیل ایده‌های خلاق به کسب‌وکارها و راهکارهای اثرگذار؛ با تمرکز بر ساختن، آزمودن و ایجاد اثر واقعی.',
  'مشاهده استارتاپ‌ها',
  '/startups',
  'آشنایی با خانه خلاق',
  '/about',
  '۱۲', '۲۰+', '۳۱', '۸', CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO "SiteSettings" (
  "id", "siteName", "tagline", "domain", "phone1", "phone2", "email", "address", "defaultTitle", "metaDescription", "updatedAt"
) VALUES (
  'main',
  'خانه خلاق و نوآوری آینه',
  'وطن، ساختنی است',
  'ayenehouse.ir',
  '۰۲۱-۶۶۴۸۵۳۷۴',
  '۰۲۱-۶۶۴۰۶۴۷۵',
  'info@ayenehouse.ir',
  'تهران، خیابان انقلاب، خیابان رازی، کوچه شهبازیان، پلاک ۲۲',
  'خانه خلاق و نوآوری آینه',
  'خانه خلاق و نوآوری آینه؛ بستری برای رشد تیم‌ها، برنامه‌های نوآوری و صنایع خلاق.',
  CURRENT_TIMESTAMP
);
