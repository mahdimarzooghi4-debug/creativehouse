import type { Metadata } from "next";
import "./cms.css";
import "./figma-admin.css";

export const metadata: Metadata = {
  title: "پنل مدیریت | خانه خلاق و نوآوری آینه",
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
