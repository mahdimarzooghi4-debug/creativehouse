import { randomBytes, scrypt as scryptCallback } from "node:crypto";
import { promisify } from "node:util";
import { PrismaClient } from "@prisma/client";

process.env.DATABASE_URL ||= "file:./prisma/dev.db";

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;
const prisma = new PrismaClient();

async function hashPassword(password) {
  const salt = randomBytes(16).toString("base64url");
  const derived = await scrypt(password, salt, KEY_LENGTH);
  return `scrypt$${salt}$${Buffer.from(derived).toString("base64url")}`;
}

async function main() {
  const password = process.argv[2];
  const username = (process.argv[3] || "admin").trim().toLowerCase();

  if (!password || password.length < 12) {
    console.error("Usage: npm run admin:reset-password -- <password-min-12-chars> [username]");
    process.exitCode = 1;
    return;
  }

  if (process.env.NODE_ENV === "production") {
    console.error("Refusing to reset an admin password while NODE_ENV=production.");
    process.exitCode = 1;
    return;
  }

  const passwordHash = await hashPassword(password);
  const existing = await prisma.adminUser.findUnique({ where: { username } });

  if (existing) {
    await prisma.adminUser.update({
      where: { id: existing.id },
      data: { passwordHash, active: true },
    });
    console.log(`Local admin password reset for: ${username}`);
    return;
  }

  await prisma.adminUser.create({
    data: {
      username,
      passwordHash,
      name: "مدیر سایت",
      active: true,
    },
  });
  console.log(`Local admin created: ${username}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
