"use client";

import { Suspense, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import type { Project } from "@/types";
import GalleryPanel from "./GalleryPanel";
import DevEmojiField from "./DevEmojiField";
import { useScrollCamera } from "@/hooks/useScrollCamera";
import { useInfiniteCorridor } from "@/hooks/useInfiniteCorridor";

const SPACING = 5.5;
const CAMERA_Z = 2;

// Fog color matches the gradient horizon in page.module.css — panels dissolve
// seamlessly into the sky as they recede rather than hitting a hard cutoff.
const FOG_COLOR = "#d4e6ff";
const FOG_NEAR = 9;
const FOG_FAR = 40;

function CameraController({ travel }: { travel: number }) {
  useScrollCamera(CAMERA_Z, travel);
  return null;
}

interface GallerySceneProps {
  projects: Project[];
  onSelect: (project: Project) => void;
}

const GalleryScene = memo(function GalleryScene({
  projects,
  onSelect,
}: GallerySceneProps) {
  const positions = useInfiniteCorridor(projects.length, SPACING);
  // Total Z distance the camera travels: one spacing per panel
  const corridorLength = projects.length * SPACING;

  return (
    <Canvas
      camera={{ position: [0, 0, CAMERA_Z], fov: 65, near: 0.1, far: 100 }}
      // alpha: true — canvas is transparent, CSS gradient shows through
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
    >
      {/*
       * ScrollControls creates a native HTML overflow:scroll element overlaid
       * on the Canvas. The browser handles wheel, trackpad momentum, and touch
       * scroll natively — no JS listeners required. pointer-events:none +
       * touch-action:pan-y keeps Canvas pointer events working normally.
       */}
      <ScrollControls pages={projects.length} damping={0.2}>
        {/* Atmospheric depth — panels fade into the sky gradient behind them */}
        <fog attach="fog" args={[FOG_COLOR, FOG_NEAR, FOG_FAR]} />

        {/* ── Lighting ── soft, omnidirectional, no harsh shadows ─────────────── */}

        {/* Broad ambient fill — the "sky light" baseline */}
        <ambientLight intensity={2.2} color="#f8f4ff" />

        {/* Soft overhead directional — gentle top-down illumination */}
        <directionalLight
          position={[2, 8, 4]}
          intensity={1.4}
          color="#ffffff"
        />

        {/* Lavender rim from behind-left — adds glass-edge depth */}
        <directionalLight
          position={[-6, 2, -10]}
          intensity={0.7}
          color="#c4b8ff"
        />

        {/* Warm under-bounce — lifts shadow areas, keeps it airy */}
        <pointLight position={[0, -6, -5]} intensity={0.5} color="#ffeedd" />

        <CameraController travel={corridorLength} />

        {/* Background emoji cloud — rendered before panels so it sits behind them */}
        <DevEmojiField corridorLength={corridorLength} />

        {projects.map((project, i) => (
          <Suspense key={project.id} fallback={null}>
            <GalleryPanel
              project={project}
              onSelect={onSelect}
              basePosition={positions[i]}
              index={i}
            />
          </Suspense>
        ))}
      </ScrollControls>
    </Canvas>
  );
});

export default GalleryScene;
