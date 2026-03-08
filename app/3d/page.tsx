"use client";

import { useState, useCallback } from "react";
import { projects } from "@/data/projects";
import type { Project } from "@/types";
import GallerySceneLoader from "@/components/3d/GallerySceneLoader";
import ProjectDetail from "@/components/portfolio/ProjectDetail";
import styles from "./page.module.css";

export default function ThreeDPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // useCallback keeps the reference stable so GalleryScene's memo never fires
  const handleSelect = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <div className={styles.page}>
      {/* Layer 1 — 3D corridor (stays mounted and animating at all times) */}
      <GallerySceneLoader projects={projects} onSelect={handleSelect} />

      {/* Layer 2 — side panel (conditionally rendered over the corridor) */}
      {selectedProject && (
        <ProjectDetail project={selectedProject} onClose={handleClose} />
      )}

      <div className={styles.hint} aria-hidden>
        <kbd>Scroll</kbd> to fly · <kbd>Hover</kbd> to inspect · <kbd>Click</kbd> to open
      </div>
    </div>
  );
}
