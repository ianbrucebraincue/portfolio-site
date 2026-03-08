"use client";

import dynamic from "next/dynamic";
import type { Project } from "@/types";
import styles from "@/app/3d/page.module.css";

const GalleryScene = dynamic(() => import("./GalleryScene"), {
  ssr: false,
  loading: () => (
    <div className={styles.loader} role="status" aria-live="polite">
      <span className={styles.loaderDot} />
      <span className={styles.loaderDot} />
      <span className={styles.loaderDot} />
      <span className="sr-only">Loading gallery…</span>
    </div>
  ),
});

interface GallerySceneLoaderProps {
  projects: Project[];
  onSelect: (project: Project) => void;
}

export default function GallerySceneLoader({
  projects,
  onSelect,
}: GallerySceneLoaderProps) {
  return <GalleryScene projects={projects} onSelect={onSelect} />;
}
