import { CmsStartupEditor } from "../../../../components/cms-startup-editor";

export default async function EditStartupPage({ params }: { params: Promise<{ slug: string }> }) {
  await params;
  return <CmsStartupEditor mode="edit" />;
}
