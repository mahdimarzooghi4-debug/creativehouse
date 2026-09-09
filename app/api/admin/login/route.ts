import { NextRequest, NextResponse } from "next/server";
import { ensureInitialAdmin } from "../../../../lib/admin-auth";
import { db } from "../../../../lib/db";
import { verifyPassword } from "../../../../lib/password";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_MAX_AGE, createSessionToken } from "../../../../lib/session";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

type Attempt = { count: number; resetAt: number };
const attempts = new Map<string, Attempt>();

function clientKey(request: NextRequest) {
  return request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isBlocked(key: string) {
  const now = Date.now();
  const item = attempts.get(key);
  if (!item || item.resetAt <= now) {
    attempts.delete(key);
    return false;
  }
  return item.count >= MAX_ATTEMPTS;
}

function recordFailure(key: string) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }
  current.count += 1;
  attempts.set(key, current);
}

function loginRedirect(request: NextRequest, error?: string) {
  const url = new URL("/admin/login", request.url);
  if (error) url.searchParams.set("error", error);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: NextRequest) {
  const key = clientKey(request);
  if (isBlocked(key)) return loginRedirect(request, "locked");

  const formData = await request.formData();
  const username = String(formData.get("username") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!username || !password) {
    recordFailure(key);
    return loginRedirect(request, "invalid");
  }

  try {
    await ensureInitialAdmin();
  } catch {
    return loginRedirect(request, "setup");
  }

  const user = await db.adminUser.findUnique({ where: { username } });
  if (!user || !user.active || !(await verifyPassword(password, user.passwordHash))) {
    recordFailure(key);
    return loginRedirect(request, "invalid");
  }

  attempts.delete(key);
  await db.adminUser.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });

  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });
  return response;
}
