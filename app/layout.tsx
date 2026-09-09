import type { Metadata } from "next";
import "@fontsource-variable/vazirmatn/wght.css";
import "@fontsource-variable/estedad/wght.css";
import "./globals.css";
import "./pages.css";
import "./news-art.css";

export const metadata: Metadata = {
  title: "خانه خلاق و نوآوری آینه",
  description: "خانه خلاق و نوآوری آینه؛ از ایده تا ساختن اثر واقعی.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
