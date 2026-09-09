import { readFile } from "node:fs/promises";
import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { mediaFilePath } from "../../../lib/media-storage";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!/^[a-f0-9-]+\.(png|jpg|webp)$/i.test(key)) return new NextResponse("Not found", { status: 404 });

  const media = await db.media.findUnique({ where: { storageKey: key } });
  if (!media) return new NextResponse("Not found", { status: 404 });

  try {
    const bytes = await readFile(mediaFilePath(key));
    return new NextResponse(bytes, {
      headers: {
        "Content-Type": media.mimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
