import { notFound } from "next/navigation";
import { CmsLicenseEditor } from "../../../../components/cms-license-editor";
import { db } from "../../../../lib/db";

export const dynamic = "force-dynamic";

export default async function EditLicensePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const license = await db.license.findFirst({ where: { slug, deletedAt: null } });
  if (!license) notFound();
  return <CmsLicenseEditor mode="edit" license={license} />;
}
