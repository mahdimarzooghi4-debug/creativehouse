import { notFound } from "next/navigation";
import { CmsNewsEditor } from "../../../../components/cms-news-editor";
import { db } from "../../../../lib/db";

export const dynamic = "force-dynamic";

export default async function EditNewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const news = await db.news.findFirst({ where: { slug, deletedAt: null } });
  if (!news) notFound();
  return <CmsNewsEditor mode="edit" news={news} />;
}
