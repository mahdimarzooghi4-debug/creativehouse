import { notFound } from "next/navigation";
import { CmsPartnerEditor } from "../../../../components/cms-partner-editor";
import { db } from "../../../../lib/db";

export const dynamic = "force-dynamic";

export default async function EditPartnerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const partner = await db.partner.findFirst({ where: { slug, deletedAt: null } });
  if (!partner) notFound();
  return <CmsPartnerEditor mode="edit" partner={partner} />;
}
