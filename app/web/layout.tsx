import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";

export const metadata: Metadata = {
  title: "Web",
  description: "An editorial scrollytelling journey through projects.",
};

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="web-theme">
      <Nav active="web" />
      {children}
    </div>
  );
}
