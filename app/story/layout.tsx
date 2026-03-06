import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";

export const metadata: Metadata = {
  title: "Story",
  description: "An editorial scrollytelling journey through projects.",
};

export default function StoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav active="story" />
      {children}
    </>
  );
}
