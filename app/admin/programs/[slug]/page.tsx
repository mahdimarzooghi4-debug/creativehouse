import { notFound } from "next/navigation";
import { CmsProgramEditor } from "../../../../components/cms-program-editor";
import { db } from "../../../../lib/db";

export const dynamic = "force-dynamic";

export default async function ProgramEditorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = await db.program.findFirst({ where: { slug, deletedAt: null } });
  if (!program) notFound();
  return <CmsProgramEditor mode="edit" program={program} />;
}
