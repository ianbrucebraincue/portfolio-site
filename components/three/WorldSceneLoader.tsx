"use client";

import dynamic from "next/dynamic";
import type { Project } from "@/types";
import styles from "@/app/3d/page.module.css";

const WorldScene = dynamic(() => import("./WorldScene"), {
  ssr: false,
  loading: () => (
    <div className={styles.loader} role="status" aria-live="polite">
      <span className={styles.loaderDot} />
      <span className={styles.loaderDot} />
      <span className={styles.loaderDot} />
      <span className="sr-only">Loading 3D environment…</span>
    </div>
  ),
});

export default function WorldSceneLoader({ projects }: { projects: Project[] }) {
  return <WorldScene projects={projects} />;
}
