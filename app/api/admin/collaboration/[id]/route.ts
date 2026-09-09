import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { allowedCollaborationStatuses } from "../../../../../lib/collaboration-utils";
import { getCurrentAdmin } from "../../../../../lib/current-admin";
import { db } from "../../../../../lib/db";

function redirectToList(request: NextRequest, result: string) {
  const url = new URL("/admin/collaboration", request.url);
  url.searchParams.set("result", result);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.redirect(new URL("/admin/login", request.url), 303);

  const { id } = await params;
  const existing = await db.collaborationRequest.findUnique({ where: { id } });
  if (!existing) return redirectToList(request, "not-found");

  const form = await request.formData();
  const operation = String(form.get("operation") || "draft");
  const status = String(form.get("status") || existing.status);
  const internalNote = String(form.get("internalNote") || "").trim().slice(0, 3000);

  await db.collaborationRequest.update({
    where: { id },
    data: {
      internalNote: internalNote || null,
      ...(operation === "update" && allowedCollaborationStatuses.has(status) ? { status } : {}),
    },
  });

  revalidatePath("/admin/collaboration");
  revalidatePath(`/admin/collaboration/${id}`);
  return redirectToList(request, operation === "update" ? "updated" : "draft-saved");
}
