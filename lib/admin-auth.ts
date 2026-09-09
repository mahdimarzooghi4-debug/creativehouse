import { db } from "./db";
import { hashPassword } from "./password";

export async function ensureInitialAdmin() {
  const existingCount = await db.adminUser.count();
  if (existingCount > 0) return;

  const username = (process.env.ADMIN_INITIAL_USERNAME || "admin").trim().toLowerCase();
  const password = process.env.ADMIN_INITIAL_PASSWORD;
  const name = (process.env.ADMIN_INITIAL_NAME || "مدیر سایت").trim();

  if (!password || password.length < 12) {
    throw new Error("ADMIN_INITIAL_PASSWORD must be set to at least 12 characters before first login.");
  }

  const passwordHash = await hashPassword(password);
  await db.adminUser.create({
    data: { username, passwordHash, name },
  });
}
