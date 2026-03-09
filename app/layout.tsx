import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ian Bruce | Portfolio",
    template: "%s | Ian Bruce",
  },
  description: "Software and creative projects by a developer and creative technologist.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
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
