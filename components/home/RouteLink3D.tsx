"use client";

import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { ThreeBlobScene } from "@/components/ThreeBlob";
import cardStyles from "./RouteCard.module.css";
import styles from "./RouteLink3D.module.css";

export default function RouteLink3D() {
  // Ref-based hover avoids React re-renders inside the RAF loop
  const hoveredRef = useRef(false);

  return (
    <Link
      href="/3d"
      className={`${cardStyles.card} ${styles.card}`}
      onMouseEnter={() => (hoveredRef.current = true)}
      onMouseLeave={() => (hoveredRef.current = false)}
      aria-label="Explore 3D World portfolio"
    >
      {/* ── Layer 1: Three.js canvas (z-index: 0) ──────────────────────────
          position: absolute so it bleeds to the card edge with no padding.
          alpha: true → transparent canvas background, showing the CSS card
          surface through areas the blob doesn't cover.                    */}
      <div className={styles.scene} aria-hidden>
        <Canvas
          camera={{ position: [0, 0, 3.2], fov: 40 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 1.5]}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <ThreeBlobScene hoveredRef={hoveredRef} />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Layer 2: gradient overlay (z-index: 1) ──────────────────────────
          Fades the glass blob into the card background colour at the bottom
          so the text below always reads cleanly. Uses --color-surface so it
          adapts automatically between the light and dark themes.           */}
      <div className={styles.overlay} aria-hidden />

      {/* ── Layer 3: text (z-index: 2) ──────────────────────────────────────
          position: relative + z-index lifts above the canvas and overlay.
          margin-top: auto anchors it to the card bottom via the flex column.*/}
      <div className={styles.textZone}>
        <span className={styles.index} aria-hidden>
          02
        </span>
        <h2 className={styles.label}>3D</h2>
        <p className={styles.desc}>Navigate projects in three.js</p>
      </div>
    </Link>
  );
}
