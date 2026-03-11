"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import type { Mesh, Group } from "three";
import type { Project } from "@/types";

// Card dimensions
const CARD_W = 2.8;
const CARD_H = 1.8;

// Animation speeds
const SCALE_HOVER = 1.08;
const SCALE_LERP = 5;
const BILLBOARD_LERP = 2;
const FLOAT_SPEED = 0.001;
const FLOAT_AMP = 0.002;

// Glow ring (diagonal of card, offset inward/outward)
const CARD_DIAGONAL = Math.sqrt(CARD_W * CARD_W + CARD_H * CARD_H);
const GLOW_RING_INNER = CARD_DIAGONAL / 2 + 0.05;
const GLOW_RING_OUTER = CARD_DIAGONAL / 2 + 0.12;

const DESC_MAX_LENGTH = 90;

function getAccentColor(isActive: boolean, hovered: boolean): string {
  if (isActive) return "#e8ff00";
  if (hovered) return "#ffffff";
  return "#888888";
}

function truncateDescription(text: string): string {
  if (text.length <= DESC_MAX_LENGTH) return text;
  return text.slice(0, DESC_MAX_LENGTH) + "…";
}

interface ProjectCard3DProps {
  project: Project;
  position: [number, number, number];
  isActive: boolean;
  onClick: () => void;
}

export default function ProjectCard3D({
  project,
  position,
  isActive,
  onClick,
}: ProjectCard3DProps) {
  const groupRef = useRef<Group>(null);
  const cardRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const targetScale = hovered || isActive ? SCALE_HOVER : 1;

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    // Float animation
    group.position.y += Math.sin(Date.now() * FLOAT_SPEED + position[0]) * FLOAT_AMP;

    // Smooth scale
    const scaleDelta = delta * SCALE_LERP;
    group.scale.x += (targetScale - group.scale.x) * scaleDelta;
    group.scale.y += (targetScale - group.scale.y) * scaleDelta;
    group.scale.z += (targetScale - group.scale.z) * scaleDelta;

    // Face camera softly (billboard on Y axis only)
    const billboardTarget = Math.atan2(-group.position.x, -group.position.z);
    group.rotation.y += (billboardTarget - group.rotation.y) * delta * BILLBOARD_LERP;
  });

  const accentColor = getAccentColor(isActive, hovered);
  const bgColor = isActive ? "#1a1a10" : "#111111";

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {/* Card body */}
      <RoundedBox
        ref={cardRef}
        args={[CARD_W, CARD_H, 0.06]}
        radius={0.08}
        smoothness={4}
      >
        <meshStandardMaterial
          color={bgColor}
          metalness={0.1}
          roughness={0.8}
          emissive={isActive ? "#3d3d00" : "#000000"}
          emissiveIntensity={isActive ? 0.4 : 0}
        />
      </RoundedBox>

      {/* Accent border top */}
      <mesh position={[0, CARD_H / 2 - 0.02, 0.035]}>
        <planeGeometry args={[CARD_W * 0.85, 0.025]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>

      {/* Project title */}
      <Text
        position={[0, 0.3, 0.04]}
        fontSize={0.28}
        color={isActive ? "#e8ff00" : "#f0f0f0"}
        anchorX="center"
        anchorY="middle"
        maxWidth={CARD_W - 0.4}
        font={undefined}
      >
        {project.title}
      </Text>

      {/* Description snippet */}
      <Text
        position={[0, -0.15, 0.04]}
        fontSize={0.13}
        color="#888888"
        anchorX="center"
        anchorY="middle"
        maxWidth={CARD_W - 0.5}
        lineHeight={1.5}
        font={undefined}
      >
        {truncateDescription(project.description)}
      </Text>

      {/* Year badge */}
      <Text
        position={[CARD_W / 2 - 0.3, -CARD_H / 2 + 0.2, 0.04]}
        fontSize={0.11}
        color="#555555"
        anchorX="right"
        anchorY="middle"
        font={undefined}
      >
        {String(project.year)}
      </Text>

      {/* Glow ring when active */}
      {isActive && (
        <mesh position={[0, 0, -0.01]}>
          <ringGeometry args={[GLOW_RING_INNER, GLOW_RING_OUTER, 64]} />
          <meshBasicMaterial color="#e8ff00" transparent opacity={0.25} />
        </mesh>
      )}
    </group>
  );
}
