import { CmsPartnerEditor } from "../../../../components/cms-partner-editor";

export default async function EditPartnerPage({ params }: { params: Promise<{ slug: string }> }) {
  await params;
  return <CmsPartnerEditor mode="edit" />;
}
