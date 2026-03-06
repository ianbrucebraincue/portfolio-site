import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";

export const metadata: Metadata = {
  title: "3D World",
  description: "Explore projects in an interactive 3D environment.",
};

export default function ThreeDLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav active="3d" />
      {children}
    </>
  );
}
