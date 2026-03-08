"use client";

import { Suspense, memo } from "react";
import { Canvas } from "@react-three/fiber";
import type { Project } from "@/types";
import GalleryPanel from "./GalleryPanel";
import { useScrollCamera } from "@/hooks/useScrollCamera";
import { useInfiniteCorridor } from "@/hooks/useInfiniteCorridor";

// ─── Layout constants ─────────────────────────────────────────────────────────
const SPACING = 5.5;
const CAMERA_Z = 2;

function CameraController() {
  useScrollCamera(CAMERA_Z);
  return null;
}

interface GallerySceneProps {
  projects: Project[];
  onSelect: (project: Project) => void;
}

// memo — prevents the Canvas from re-rendering when selectedProject
// state changes in the parent page (projects and onSelect are both stable).
const GalleryScene = memo(function GalleryScene({
  projects,
  onSelect,
}: GallerySceneProps) {
  const positions = useInfiniteCorridor(projects.length, SPACING);

  return (
    <Canvas
      camera={{ position: [0, 0, CAMERA_Z], fov: 65, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
    >
      <fog attach="fog" args={["#050508", 10, 52]} />

      <ambientLight intensity={0.55} />
      <pointLight position={[0, 6, -4]} intensity={3.5} color="#ffffff" />
      <pointLight position={[-6, 1, 0]} intensity={0.7} color="#3344cc" />
      <pointLight position={[0, -4, -8]} intensity={0.4} color="#e8ff00" />

      <CameraController />

      {projects.map((project, i) => (
        <Suspense key={project.id} fallback={null}>
          <GalleryPanel
            project={project}
            onSelect={onSelect}
            basePosition={positions[i]}
            index={i}
            panelCount={projects.length}
            spacing={SPACING}
          />
        </Suspense>
      ))}
    </Canvas>
  );
});

export default GalleryScene;
