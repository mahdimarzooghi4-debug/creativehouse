import { CmsLicenseEditor } from "../../../../components/cms-license-editor";

export default async function EditLicensePage({ params }: { params: Promise<{ slug: string }> }) {
  await params;
  return <CmsLicenseEditor mode="edit" />;
}
