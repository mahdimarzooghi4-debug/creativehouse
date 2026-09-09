ALTER TABLE "License" ADD COLUMN "description" TEXT;
ALTER TABLE "License" ADD COLUMN "issuedAt" DATETIME;

INSERT OR IGNORE INTO "Program" ("id", "slug", "title", "type", "duration", "summary", "outputs", "registrationUrl", "status", "featured", "displayOrder", "createdAt", "updatedAt") VALUES
('seed_program_ayene', 'ayene', 'رویداد ملی خلاقیت و نوآوری آینه', 'event', 'پاییز ۱۴۰۵', 'یک مسیر مسئله‌محور برای تبدیل نیازهای واقعی به راهکارهای قابل اجرا؛ با همراهی منتورها، متخصصان و شبکه خانه خلاق آینه.', 'تعریف مسئله، ساخت راهکار، منتورینگ تخصصی و ارائه خروجی نهایی.', '/collaboration', 'active', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('seed_program_growth', 'growth', 'برنامه رشد و شتابدهی', 'acceleration', '۳ ماه', 'منتورینگ، اعتبارسنجی و طراحی مسیر توسعه برای تیم‌ها و استارتاپ‌ها.', 'منتورینگ تخصصی، اعتبارسنجی بازار، توسعه محصول و آماده‌سازی ارائه.', '/collaboration', 'published', 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('seed_program_workshops', 'workshops', 'کارگاه‌های تخصصی', 'workshop', 'دوره‌ای', 'کارگاه‌های کاربردی برای ساخت محصول، بازار، برند و توسعه کسب‌وکار.', 'تمرین عملی، بازخورد متخصص و ابزارهای قابل استفاده برای تیم‌ها.', '/collaboration', 'published', 0, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('seed_program_networking', 'networking', 'شبکه‌سازی و توسعه بازار', 'session', 'دوره‌ای', 'اتصال تیم‌ها به سازمان‌ها، متخصصان، سرمایه‌گذاران و شرکای بالقوه.', 'جلسات معرفی، اتصال به شبکه و فرصت‌های همکاری.', '/collaboration', 'published', 0, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('seed_program_bootcamp', 'bootcamp', 'بوت‌کمپ مسئله‌محور', 'workshop', 'فشرده', 'یک مسیر فشرده برای تعریف مسئله، ایده‌پردازی و ساخت نمونه اولیه.', 'تعریف مسئله، فرضیه، نمونه اولیه و آزمون اولیه.', '/collaboration', 'published', 0, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('seed_program_talks', 'talks', 'نشست‌های تجربه و الهام', 'session', 'دوره‌ای', 'گفت‌وگو با کارآفرینان و سازندگان برای انتقال تجربه‌های واقعی ساختن.', 'انتقال تجربه، شبکه‌سازی و یادگیری از مسیرهای واقعی.', '/collaboration', 'published', 0, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT OR IGNORE INTO "Partner" ("id", "slug", "name", "website", "status", "featured", "displayOrder", "createdAt", "updatedAt") VALUES
('seed_partner_emdad', 'emdad', 'کمیته امداد امام خمینی(ره)', NULL, 'active', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('seed_partner_science', 'science-vice-presidency', 'معاونت علمی، فناوری و اقتصاد دانش‌بنیان ریاست جمهوری', NULL, 'active', 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('seed_partner_soft', 'soft-technology', 'ستاد توسعه فناوری‌های نرم و صنایع خلاق', NULL, 'active', 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT OR IGNORE INTO "License" ("id", "slug", "title", "issuer", "description", "status", "displayOrder", "createdAt", "updatedAt") VALUES
('seed_license_activity', 'creative-house-license', 'مجوز فعالیت خانه خلاق', 'مرجع صادرکننده', 'نسخه رسمی مجوز فعالیت خانه خلاق پس از بارگذاری سند در این بخش در دسترس است.', 'published', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('seed_license_collaboration', 'collaboration-approval', 'تأییدیه همکاری', 'مرجع صادرکننده', 'تأییدیه رسمی همکاری و اطلاعات مرجع صادرکننده در این بخش منتشر می‌شود.', 'published', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('seed_license_draft', 'new-document', 'سند جدید', NULL, 'اطلاعات این سند هنوز تکمیل نشده است.', 'draft', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
