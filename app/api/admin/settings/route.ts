import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "../../../../lib/current-admin";
import { db } from "../../../../lib/db";
import { hashPassword, verifyPassword } from "../../../../lib/password";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_MAX_AGE, createSessionToken } from "../../../../lib/session";

function text(form: FormData, key: string, max = 500) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function redirect(request: NextRequest, result: string, sessionUser?: { id: string; username: string }) {
  const url = new URL("/admin/settings", request.url);
  url.searchParams.set("result", result);
  const response = NextResponse.redirect(url, 303);
  if (sessionUser) {
    response.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken(sessionUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ADMIN_SESSION_MAX_AGE,
    });
  }
  return response;
}

export async function POST(request: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.redirect(new URL("/admin/login", request.url), 303);

  const form = await request.formData();
  const operation = text(form, "operation", 40) || "save-site";
  const currentUser = await db.adminUser.findUnique({ where: { id: admin.id } });
  if (!currentUser) return NextResponse.redirect(new URL("/admin/login", request.url), 303);

  const requestedUsername = text(form, "adminUsername", 60).toLowerCase();
  const currentPassword = text(form, "currentPassword", 128);
  const newPassword = text(form, "password", 128);

  if (operation === "change-password") {
    if (!currentPassword) return redirect(request, "current-password-required");
    if (!(await verifyPassword(currentPassword, currentUser.passwordHash))) return redirect(request, "current-password-invalid");
    if (newPassword.length < 10) return redirect(request, "password-too-short");

    const passwordHash = await hashPassword(newPassword);
    await db.adminUser.update({ where: { id: admin.id }, data: { passwordHash } });
    return redirect(request, "password-updated", { id: admin.id, username: currentUser.username });
  }

  const siteName = text(form, "siteName", 120);
  const domain = text(form, "domain", 180).replace(/^https?:\/\//i, "").replace(/\/$/, "");
  const email = text(form, "email", 180).toLowerCase();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const usernameValid = /^[a-z0-9._-]{3,60}$/.test(requestedUsername);
  if (!siteName || !domain || !emailValid || !usernameValid) return redirect(request, "validation-error");

  const usernameChanged = requestedUsername !== currentUser.username;
  if (usernameChanged) {
    if (!currentPassword) return redirect(request, "current-password-required");
    if (!(await verifyPassword(currentPassword, currentUser.passwordHash))) return redirect(request, "current-password-invalid");
    const duplicate = await db.adminUser.findUnique({ where: { username: requestedUsername } });
    if (duplicate && duplicate.id !== admin.id) return redirect(request, "username-taken");
  }

  try {
    await db.$transaction([
      db.siteSettings.upsert({
        where: { id: "main" },
        update: {
          siteName,
          tagline: text(form, "tagline", 160) || null,
          domain,
          phone1: text(form, "phone1", 30) || null,
          phone2: text(form, "phone2", 30) || null,
          email,
          address: text(form, "address", 300) || null,
          defaultTitle: text(form, "defaultTitle", 160) || siteName,
          metaDescription: text(form, "metaDescription", 320) || null,
        },
        create: {
          id: "main",
          siteName,
          tagline: text(form, "tagline", 160) || null,
          domain,
          phone1: text(form, "phone1", 30) || null,
          phone2: text(form, "phone2", 30) || null,
          email,
          address: text(form, "address", 300) || null,
          defaultTitle: text(form, "defaultTitle", 160) || siteName,
          metaDescription: text(form, "metaDescription", 320) || null,
        },
      }),
      ...(usernameChanged ? [db.adminUser.update({ where: { id: admin.id }, data: { username: requestedUsername } })] : []),
    ]);

    revalidatePath("/", "layout");
    revalidatePath("/admin/settings");
    return redirect(request, usernameChanged ? "username-updated" : "site-saved", {
      id: admin.id,
      username: usernameChanged ? requestedUsername : currentUser.username,
    });
  } catch {
    return redirect(request, "save-error");
  }
}
