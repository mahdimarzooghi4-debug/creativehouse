import type { Metadata } from "next";
import "@fontsource-variable/vazirmatn/wght.css";
import "@fontsource-variable/estedad/wght.css";
import "./globals.css";
import "./pages.css";
import "./news-art.css";
import "./qa-fixes.css";
import { getSiteSettings } from "../lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: settings.defaultTitle || settings.siteName,
    description: settings.metaDescription || "خانه خلاق و نوآوری آینه؛ از ایده تا ساختن اثر واقعی.",
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
