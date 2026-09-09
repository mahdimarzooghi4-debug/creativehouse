import type { Metadata } from "next";
import "./globals.css";

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
