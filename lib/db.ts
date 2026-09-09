import { PrismaClient } from "@prisma/client";

declare global {
  var __creativeHousePrisma: PrismaClient | undefined;
}

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./prisma/dev.db";
}

export const db = globalThis.__creativeHousePrisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__creativeHousePrisma = db;
}
