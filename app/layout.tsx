import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ian Bruce | Portfolio",
    template: "%s | Ian Bruce",
  },
  description: "Software and creative projects by a developer and creative technologist.",
  openGraph: {
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
