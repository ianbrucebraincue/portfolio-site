"use client";

import { useRef, useState, useCallback, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture, Text } from "@react-three/drei";
import * as THREE from "three";
import type { Project } from "@/types";
import { RECYCLE_BUFFER } from "@/hooks/useInfiniteCorridor";

// ─── Panel dimensions ────────────────────────────────────────────────────────
const PANEL_W = 3.4;
const PANEL_H = 2.1;

// ─── Animation constants ─────────────────────────────────────────────────────
const FLOAT_SPEED = 0.65;
const FLOAT_AMP = 0.07;

// ─── Cached colors (created once, reused every frame) ────────────────────────
const COLOR_ACCENT = new THREE.Color("#e8ff00");
const COLOR_BORDER = new THREE.Color("#222222");

// ─── Types ────────────────────────────────────────────────────────────────────
interface GalleryPanelProps {
  project: Project;
  onSelect: (project: Project) => void;
  basePosition: [number, number, number];
  index: number;
  panelCount: number;
  spacing: number;
}

export default function GalleryPanel({
  project,
  onSelect,
  basePosition,
  index,
  panelCount,
  spacing,
}: GalleryPanelProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const borderRef = useRef<THREE.LineSegments>(null!);

  const [hovered, setHovered] = useState(false);

  const { camera, pointer } = useThree();

  // Mutable position — recycled in useFrame without triggering re-renders
  const posRef = useRef(new THREE.Vector3(...basePosition));

  // Load image texture; callback sets correct color space once on load
  const texture = useTexture(project.images[0]?.src ?? "", (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
  });

  // Border geometry — memoised so it's never recreated
  const borderGeom = useMemo(
    () =>
      new THREE.EdgesGeometry(
        new THREE.PlaneGeometry(PANEL_W + 0.08, PANEL_H + 0.08)
      ),
    []
  );

  const handleClick = useCallback(() => {
    onSelect(project);
  }, [onSelect, project]);

  // ── Per-frame updates ──────────────────────────────────────────────────────
  useFrame(() => {
    const group = groupRef.current;
    const pos = posRef.current;
    if (!group) return;

    const t = performance.now() * 0.001;

    // Floating motion
    const floatY = Math.sin(t * FLOAT_SPEED + index * 1.3) * FLOAT_AMP;
    const floatRotZ = Math.sin(t * 0.35 + index * 0.8) * 0.007;

    // Drive position from posRef (allows recycling without re-renders)
    group.position.set(pos.x, pos.y + floatY, pos.z);

    // Hover tilt toward pointer
    const targetRotY = hovered ? pointer.x * 0.28 : 0;
    const targetRotX = hovered ? -pointer.y * 0.18 : 0;

    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetRotY, 0.08);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetRotX, 0.08);
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, floatRotZ, 0.05);

    // Glow opacity
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.lerp(
        mat.opacity,
        hovered ? 0.22 : 0.05,
        0.08
      );
    }

    // Border colour
    if (borderRef.current) {
      const mat = borderRef.current.material as THREE.LineBasicMaterial;
      mat.color.lerp(hovered ? COLOR_ACCENT : COLOR_BORDER, 0.1);
    }

    // ── Infinite recycling ─────────────────────────────────────────────────
    if (pos.z > camera.position.z + RECYCLE_BUFFER) {
      pos.z -= panelCount * spacing;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glow halo */}
      <mesh ref={glowRef} position={[0, 0, -0.04]}>
        <planeGeometry args={[PANEL_W + 0.5, PANEL_H + 0.5]} />
        <meshBasicMaterial
          color="#e8ff00"
          transparent
          opacity={0.05}
          depthWrite={false}
        />
      </mesh>

      {/* Card backing */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[PANEL_W, PANEL_H]} />
        <meshStandardMaterial
          color="#06060e"
          transparent
          opacity={0.75}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>

      {/* Main image plane */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={handleClick}
      >
        <planeGeometry args={[PANEL_W, PANEL_H]} />
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={0.93}
          roughness={0.08}
          metalness={0.12}
        />
      </mesh>

      {/* Glass sheen */}
      <mesh position={[0, 0, 0.002]}>
        <planeGeometry args={[PANEL_W, PANEL_H]} />
        <meshStandardMaterial
          color="#aaccff"
          transparent
          opacity={0.04}
          roughness={0}
          metalness={0}
          depthWrite={false}
        />
      </mesh>

      {/* Edge frame */}
      <lineSegments ref={borderRef} geometry={borderGeom}>
        <lineBasicMaterial color="#222222" />
      </lineSegments>

      {/* Project title */}
      <Text
        position={[0, -(PANEL_H / 2 + 0.24), 0]}
        fontSize={0.16}
        color="#e0e0e0"
        anchorX="center"
        anchorY="top"
        maxWidth={PANEL_W}
        letterSpacing={0.02}
      >
        {project.title}
      </Text>
    </group>
  );
}
