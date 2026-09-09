CREATE TABLE "AdminUser" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "username" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "name" TEXT NOT NULL DEFAULT 'مدیر سایت',
  "role" TEXT NOT NULL DEFAULT 'admin',
  "active" BOOLEAN NOT NULL DEFAULT true,
  "lastLoginAt" DATETIME,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

CREATE TABLE "Media" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "storageKey" TEXT NOT NULL,
  "originalName" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "sizeBytes" INTEGER NOT NULL,
  "width" INTEGER,
  "height" INTEGER,
  "altText" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "News" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "summary" TEXT,
  "body" TEXT NOT NULL,
  "category" TEXT NOT NULL DEFAULT 'news',
  "status" TEXT NOT NULL DEFAULT 'draft',
  "publishedAt" DATETIME,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "coverMediaId" TEXT,
  "views" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  "deletedAt" DATETIME
);

CREATE TABLE "Startup" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "slug" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "field" TEXT NOT NULL,
  "stage" TEXT NOT NULL DEFAULT 'idea',
  "status" TEXT NOT NULL DEFAULT 'draft',
  "summary" TEXT,
  "solution" TEXT,
  "founder" TEXT,
  "website" TEXT,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "logoMediaId" TEXT,
  "coverMediaId" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  "deletedAt" DATETIME
);

CREATE TABLE "Program" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "duration" TEXT,
  "summary" TEXT,
  "outputs" TEXT,
  "registrationUrl" TEXT,
  "status" TEXT NOT NULL DEFAULT 'draft',
  "startsAt" DATETIME,
  "endsAt" DATETIME,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "coverMediaId" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  "deletedAt" DATETIME
);

CREATE TABLE "Partner" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "slug" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "website" TEXT,
  "status" TEXT NOT NULL DEFAULT 'draft',
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "logoMediaId" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  "deletedAt" DATETIME
);

CREATE TABLE "License" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "issuer" TEXT,
  "status" TEXT NOT NULL DEFAULT 'draft',
  "documentMediaId" TEXT,
  "previewMediaId" TEXT,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL,
  "deletedAt" DATETIME
);

CREATE TABLE "CollaborationRequest" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "organization" TEXT,
  "type" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT,
  "city" TEXT,
  "preferredContactTime" TEXT,
  "message" TEXT NOT NULL,
  "internalNote" TEXT,
  "status" TEXT NOT NULL DEFAULT 'new',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

CREATE TABLE "HomepageSettings" (
  "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'main',
  "heroEyebrow" TEXT,
  "heroTitle" TEXT NOT NULL,
  "heroSubtitle" TEXT,
  "heroPrimaryLabel" TEXT,
  "heroPrimaryHref" TEXT,
  "heroSecondaryLabel" TEXT,
  "heroSecondaryHref" TEXT,
  "heroMediaId" TEXT,
  "featuredNewsSlug" TEXT,
  "featuredStartupIds" TEXT,
  "updatedAt" DATETIME NOT NULL
);

CREATE TABLE "SiteSettings" (
  "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'main',
  "siteName" TEXT NOT NULL,
  "tagline" TEXT,
  "domain" TEXT,
  "phone1" TEXT,
  "phone2" TEXT,
  "email" TEXT,
  "address" TEXT,
  "defaultTitle" TEXT,
  "metaDescription" TEXT,
  "updatedAt" DATETIME NOT NULL
);

CREATE UNIQUE INDEX "AdminUser_username_key" ON "AdminUser"("username");
CREATE UNIQUE INDEX "Media_storageKey_key" ON "Media"("storageKey");
CREATE UNIQUE INDEX "News_slug_key" ON "News"("slug");
CREATE UNIQUE INDEX "Startup_slug_key" ON "Startup"("slug");
CREATE UNIQUE INDEX "Program_slug_key" ON "Program"("slug");
CREATE UNIQUE INDEX "Partner_slug_key" ON "Partner"("slug");
CREATE UNIQUE INDEX "License_slug_key" ON "License"("slug");
