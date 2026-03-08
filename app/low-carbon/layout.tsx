import type { Metadata } from "next";
import "./low-carbon.css";

export const metadata: Metadata = {
  title: "Low Carbon",
  description: "Text-only portfolio. No images, no videos, minimal bandwidth.",
};

export default function LiteLayout({ children }: { children: React.ReactNode }) {
  return <div className="low-carbon-page">{children}</div>;
}
