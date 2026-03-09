"use client";

import { useRef, useState, useCallback, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture, Text } from "@react-three/drei";
import * as THREE from "three";
import type { Project } from "@/types";

// ─── Panel dimensions ────────────────────────────────────────────────────────
const PANEL_W = 3.4;
const PANEL_H = 2.1;

// ─── Floating motion — slower and wider for a dreamlike drift ────────────────
const FLOAT_SPEED = 0.38;  // oscillations per second (was 0.65)
const FLOAT_AMP   = 0.13;  // vertical travel in units  (was 0.07)

// ─── Colours — light-palette glass aesthetic ─────────────────────────────────
// Edge frame: soft sky-blue default → bright white on hover
const COLOR_BORDER_DEFAULT = new THREE.Color("#b0c8e8");
const COLOR_BORDER_HOVER   = new THREE.Color("#ffffff");

// ─── Types ───────────────────────────────────────────────────────────────────
interface GalleryPanelProps {
  project: Project;
  onSelect: (project: Project) => void;
  basePosition: [number, number, number];
  index: number;
}

export default function GalleryPanel({
  project,
  onSelect,
  basePosition,
  index,
}: GalleryPanelProps) {
  const groupRef  = useRef<THREE.Group>(null!);
  const glowRef   = useRef<THREE.Mesh>(null!);
  const borderRef = useRef<THREE.LineSegments>(null!);

  const [hovered, setHovered] = useState(false);
  const { pointer } = useThree();

  const posRef = useRef(new THREE.Vector3(...basePosition));

  const texture = useTexture(project.images[0]?.src ?? "", (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
  });

  // Memoised border geometry — created once
  const borderGeom = useMemo(
    () =>
      new THREE.EdgesGeometry(
        new THREE.PlaneGeometry(PANEL_W + 0.1, PANEL_H + 0.1)
      ),
    []
  );

  const handleClick = useCallback(() => {
    onSelect(project);
  }, [onSelect, project]);

  // ── Per-frame ─────────────────────────────────────────────────────────────
  useFrame(() => {
    const group = groupRef.current;
    const pos   = posRef.current;
    if (!group) return;

    const t = performance.now() * 0.001;

    // Gentle multi-axis drift — different frequencies per axis for organic feel
    const floatY    = Math.sin(t * FLOAT_SPEED + index * 1.4)  * FLOAT_AMP;
    const floatX    = Math.sin(t * 0.22        + index * 2.1)  * 0.04;
    const floatRotZ = Math.sin(t * 0.28        + index * 0.85) * 0.010;

    group.position.set(pos.x + floatX, pos.y + floatY, pos.z);

    // Hover tilt — panel leans toward the pointer like a pane of glass catching light
    const targetRotY = hovered ? pointer.x * 0.26 : 0;
    const targetRotX = hovered ? -pointer.y * 0.16 : 0;

    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetRotY, 0.08);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetRotX, 0.08);
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, floatRotZ,  0.05);

    // Glow halo — additive blend brightens the area behind, simulating light emission
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.lerp(
        mat.opacity,
        hovered ? 0.38 : 0.10,
        0.07
      );
    }

    // Edge frame fades to pure white on hover — glass catching light
    if (borderRef.current) {
      const mat = borderRef.current.material as THREE.LineBasicMaterial;
      mat.color.lerp(hovered ? COLOR_BORDER_HOVER : COLOR_BORDER_DEFAULT, 0.08);
    }

  });

  return (
    <group ref={groupRef}>
      {/*
       * Glow halo — AdditiveBlending means it adds luminance to everything
       * behind it rather than alpha-compositing, creating a real light-spill
       * effect without postprocessing bloom.
       */}
      <mesh ref={glowRef} position={[0, 0, -0.06]}>
        <planeGeometry args={[PANEL_W + 0.9, PANEL_H + 0.9]} />
        <meshBasicMaterial
          color="#c8dcff"
          transparent
          opacity={0.10}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/*
       * Frosted backing — white at very low opacity, roughness=1 so it
       * scatters light diffusely rather than reflecting it sharply.
       * Gives the panel the milky depth of real frosted glass.
       */}
      <mesh position={[0, 0, -0.015]}>
        <planeGeometry args={[PANEL_W + 0.04, PANEL_H + 0.04]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.18}
          roughness={1}
          metalness={0}
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
          opacity={0.88}
          roughness={0.05}
          metalness={0}
        />
      </mesh>

      {/*
       * Glass sheen overlay — a very faint cool highlight that sits on top
       * of the image, giving the impression of a glass surface.
       * Additive blending keeps it from darkening the image underneath.
       */}
      <mesh position={[0, 0, 0.002]}>
        <planeGeometry args={[PANEL_W, PANEL_H]} />
        <meshStandardMaterial
          color="#ddeeff"
          transparent
          opacity={0.10}
          roughness={0}
          metalness={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Edge frame — sky blue default, white on hover */}
      <lineSegments ref={borderRef} geometry={borderGeom}>
        <lineBasicMaterial color="#b0c8e8" />
      </lineSegments>

      {/* Title — dark navy for readability against the light sky */}
      <Text
        position={[0, -(PANEL_H / 2) - 0.1, 0.01]}
        fontSize={0.16}
        color="#1e3060"
        anchorX="center"
        anchorY="top"
        maxWidth={PANEL_W}
        letterSpacing={0.025}
        
      >
        {project.title}
      </Text>
    </group>
  );
}
