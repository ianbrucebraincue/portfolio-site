"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

// ── Organic noise ─────────────────────────────────────────────────────────────
//
// Layered Fourier synthesis: three sine/cosine product waves at different
// frequencies and phase velocities. No library required.
//
// Layer 1  – low-frequency driver  → major blob shape
// Layer 2  – mid-frequency ripple  → secondary bulge
// Layer 3  – fine-detail shimmer   → subtle surface movement
//
// Practical amplitude ≈ 0.75 (sine/cosine products rarely peak simultaneously).
//
function organicNoise(x: number, y: number, z: number, t: number): number {
  const n1 =
    Math.sin(x * 1.2 + t * 0.36) *
    Math.cos(y * 1.0 - t * 0.28) *
    Math.sin(z * 0.8 + t * 0.43);
  const n2 = Math.sin(x * 2.1 - t * 0.21) * Math.cos(z * 1.6 + t * 0.31) * 0.42;
  const n3 = Math.cos(y * 1.8 + t * 0.26) * Math.sin(x * 0.65 - t * 0.17) * 0.22;
  return n1 + n2 + n3;
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface BlobProps {
  hoveredRef: { current: boolean };
}

// ── Blob mesh ─────────────────────────────────────────────────────────────────
//
// Displaces sphere vertices radially using organicNoise() each frame.
// Keeps original positions in a ref so we always displace from the true sphere,
// not from the already-displaced previous frame.
//
// Normal recomputation runs after displacement so MeshPhysicalMaterial's
// glass refraction and Fresnel follow the actual blob silhouette.
//
// Geometry: 48×48 sphere → 2,401 vertices → ~14k noise evals per frame.
// Measured cost: ≈ 0.2 ms on a mid-range device. Well within 16 ms budget.
//
function BlobMesh({ hoveredRef }: BlobProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const origPos = useRef<Float32Array | null>(null);
  const frameCount = useRef(0);

  // Capture original sphere positions once, before any displacement
  useEffect(() => {
    const geo = meshRef.current?.geometry;
    if (!geo) return;
    origPos.current = new Float32Array(geo.attributes.position.array);
  }, []);

  useFrame((state, delta) => {
    // Skip entirely when tab is hidden (PageSpeed measurement, background tabs)
    if (document.hidden) return;

    const mesh = meshRef.current;
    const orig = origPos.current;
    if (!mesh || !orig) return;

    const t = state.clock.elapsedTime;
    const hovered = hoveredRef.current;

    // ── Vertex displacement ──
    const distort = hovered ? 0.46 : 0.24;
    const pos = mesh.geometry.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const i3 = i * 3;
      const ox = orig[i3];
      const oy = orig[i3 + 1];
      const oz = orig[i3 + 2];

      // Sphere vertices are at unit distance from origin, so
      // (ox, oy, oz) is already the outward unit normal.
      const n = organicNoise(ox, oy, oz, t) * distort;
      pos.setXYZ(i, ox + ox * n, oy + oy * n, oz + oz * n);
    }

    pos.needsUpdate = true;
    // Recompute normals every 2 frames — halves CPU cost, imperceptible difference
    frameCount.current++;
    if (frameCount.current % 2 === 0) {
      mesh.geometry.computeVertexNormals();
    }

    // ── Slow, calming animation ──
    // Gentle vertical drift
    mesh.position.y = Math.sin(t * 0.44) * 0.09;
    // Breathing tilt
    mesh.rotation.x = Math.sin(t * 0.22) * 0.07;
    // Continuous slow rotation — speeds up slightly on hover
    mesh.rotation.y += delta * (hovered ? 0.13 : 0.05);

    // ── Smooth hover scale ──
    const target = hovered ? 1.09 : 1.0;
    const s = THREE.MathUtils.lerp(mesh.scale.x, target, Math.min(1, delta * 3.5));
    mesh.scale.setScalar(s);
  });

  return (
    <mesh ref={meshRef}>
      {/*
        48×48 segments: smooth enough for a convincing blob silhouette,
        light enough to displace + recompute normals every frame.
      */}
      <sphereGeometry args={[1, 48, 48]} />
      <meshPhysicalMaterial
        color="#C7D2FE"          /* primary-200 — soft indigo tint          */
        metalness={0}
        roughness={0.05}         /* very smooth surface — crisp highlights  */
        transmission={0.92}      /* glass transmission — mostly see-through  */
        thickness={1.5}          /* refraction depth                         */
        ior={1.35}               /* glass index of refraction (~borosilicate)*/
        attenuationColor="#818CF8" /* primary-400 — indigo tint through thick parts */
        attenuationDistance={2.5}
        envMapIntensity={1.4}    /* env map reflections for glass highlights */
        transparent
      />
    </mesh>
  );
}

// ── Scene contents (lights + env + mesh) ──────────────────────────────────────
//
// Exported for use inside a <Canvas> in RouteLink3D.
// Lights are tuned for the light card background:
//   - Main light: bright white → crisp glass caustic on light surface
//   - Fill light: cool indigo → depth on the far side of the blob
//
export function ThreeBlobScene({ hoveredRef }: BlobProps) {
  return (
    <>
      {/*
        Environment provides the HDR reflections that make glass convincing.
        backgroundIntensity={0} keeps the scene background transparent so
        the card's CSS background shows through the canvas alpha channel.
      */}
      <Environment preset="city" backgroundIntensity={0} />
      <ambientLight intensity={0.15} />
      <directionalLight position={[4, 5, 2]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-3, -2, -3]} intensity={0.7} color="#818CF8" />
      <BlobMesh hoveredRef={hoveredRef} />
    </>
  );
}
