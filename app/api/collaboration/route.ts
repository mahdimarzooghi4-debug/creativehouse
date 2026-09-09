import { NextRequest, NextResponse } from "next/server";
import { allowedCollaborationTypes } from "../../../lib/collaboration-utils";
import { db } from "../../../lib/db";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_SUBMISSIONS = 5;
type Attempt = { count: number; resetAt: number };
const attempts = new Map<string, Attempt>();

function clientKey(request: NextRequest) {
  return request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function consumeSubmission(key: string) {
  const now = Date.now();
  if (attempts.size > 1000) {
    for (const [entryKey, entry] of attempts) if (entry.resetAt <= now) attempts.delete(entryKey);
  }
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (current.count >= MAX_SUBMISSIONS) return false;
  current.count += 1;
  attempts.set(key, current);
  return true;
}

function redirect(request: NextRequest, result: string) {
  const url = new URL("/collaboration", request.url);
  url.searchParams.set("result", result);
  url.hash = "collaboration-form";
  return NextResponse.redirect(url, 303);
}

function text(form: FormData, key: string, max = 5000) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: NextRequest) {
  const form = await request.formData();
  if (text(form, "companyWebsite", 200)) return redirect(request, "sent");

  const name = text(form, "fullName", 120);
  const organization = text(form, "teamName", 160);
  const phone = text(form, "phone", 30);
  const email = text(form, "email", 180).toLowerCase();
  const type = text(form, "type", 40);
  const subject = text(form, "subject", 180);
  const message = text(form, "description", 3000);

  const emailValid = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid = /^[0-9۰-۹+()\-\s]{7,30}$/.test(phone);
  if (!name || !phone || !phoneValid || !allowedCollaborationTypes.has(type) || !subject || message.length < 10 || !emailValid) {
    return redirect(request, "invalid");
  }

  if (!consumeSubmission(clientKey(request))) return redirect(request, "limited");

  try {
    await db.collaborationRequest.create({
      data: {
        name,
        organization: organization || null,
        type,
        phone,
        email: email || null,
        subject,
        message,
        status: "new",
      },
    });
    return redirect(request, "sent");
  } catch {
    return redirect(request, "error");
  }
}
