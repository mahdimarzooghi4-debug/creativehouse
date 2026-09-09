import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { db } from "./db";

const IMAGE_EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

function uploadRoot() {
  if (process.env.UPLOAD_DIR) return process.env.UPLOAD_DIR;
  return process.env.NODE_ENV === "production" ? "/data/uploads" : join(process.cwd(), "uploads");
}

function hasValidSignature(bytes: Uint8Array, mime: string) {
  if (mime === "image/png") return bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  if (mime === "image/jpeg") return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (mime === "image/webp") {
    const text = new TextDecoder().decode(bytes.slice(0, 12));
    return text.startsWith("RIFF") && text.endsWith("WEBP");
  }
  if (mime === "application/pdf") return new TextDecoder().decode(bytes.slice(0, 5)) === "%PDF-";
  return false;
}

async function persistUpload(entry: File, extension: string, altText?: string) {
  const buffer = new Uint8Array(await entry.arrayBuffer());
  if (!hasValidSignature(buffer, entry.type)) throw new Error(entry.type === "application/pdf" ? "invalid-document" : "invalid-image");

  const storageKey = `${randomUUID()}.${extension}`;
  const root = uploadRoot();
  await mkdir(root, { recursive: true });
  await writeFile(join(root, storageKey), buffer, { flag: "wx" });

  return db.media.create({
    data: {
      storageKey,
      originalName: entry.name || storageKey,
      mimeType: entry.type,
      sizeBytes: entry.size,
      altText: altText?.trim() || null,
    },
  });
}

export async function saveImageUpload(entry: FormDataEntryValue | null, altText?: string, maxBytes = 5 * 1024 * 1024) {
  if (!(entry instanceof File) || entry.size === 0) return null;
  const extension = IMAGE_EXTENSIONS[entry.type];
  if (!extension) throw new Error("unsupported-image");
  if (entry.size > maxBytes) throw new Error("image-too-large");
  return persistUpload(entry, extension, altText);
}

export async function saveDocumentUpload(entry: FormDataEntryValue | null, altText?: string, maxBytes = 10 * 1024 * 1024) {
  if (!(entry instanceof File) || entry.size === 0) return null;
  const extension = entry.type === "application/pdf" ? "pdf" : IMAGE_EXTENSIONS[entry.type];
  if (!extension) throw new Error("unsupported-document");
  if (entry.size > maxBytes) throw new Error("document-too-large");
  return persistUpload(entry, extension, altText);
}

export function mediaFilePath(storageKey: string) {
  return join(uploadRoot(), storageKey);
}
