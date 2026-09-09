import { notFound } from "next/navigation";
import { CmsStartupEditor } from "../../../../components/cms-startup-editor";
import { db } from "../../../../lib/db";

export const dynamic = "force-dynamic";

export default async function EditStartupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const startup = await db.startup.findFirst({ where: { slug, deletedAt: null } });
  if (!startup) notFound();
  return <CmsStartupEditor mode="edit" startup={startup} />;
}
