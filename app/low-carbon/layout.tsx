import type { Metadata } from "next";
import "./low-carbon.css";

export const metadata: Metadata = {
  title: "Lite",
  description: "Low-carbon, text-only portfolio. No images, no videos, minimal bandwidth.",
};

export default function LiteLayout({ children }: { children: React.ReactNode }) {
  return <div className="low-carbon-page">{children}</div>;
}
