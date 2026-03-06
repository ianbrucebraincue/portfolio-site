"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import type { Mesh, Group } from "three";
import type { Project } from "@/types";

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

  const targetScale = hovered || isActive ? 1.08 : 1;

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    // Float animation
    group.position.y += Math.sin(Date.now() * 0.001 + position[0]) * 0.002;

    // Smooth scale
    group.scale.x += (targetScale - group.scale.x) * delta * 5;
    group.scale.y += (targetScale - group.scale.y) * delta * 5;
    group.scale.z += (targetScale - group.scale.z) * delta * 5;

    // Face camera softly (billboard on Y axis only)
    group.rotation.y += (Math.atan2(
      -group.position.x,
      -group.position.z
    ) - group.rotation.y) * delta * 2;
  });

  // Card dimensions
  const W = 2.8;
  const H = 1.8;

  const accentColor = isActive ? "#e8ff00" : hovered ? "#ffffff" : "#888888";
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
        args={[W, H, 0.06]}
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
      <mesh position={[0, H / 2 - 0.02, 0.035]}>
        <planeGeometry args={[W * 0.85, 0.025]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>

      {/* Project title */}
      <Text
        position={[0, 0.3, 0.04]}
        fontSize={0.28}
        color={isActive ? "#e8ff00" : "#f0f0f0"}
        anchorX="center"
        anchorY="middle"
        maxWidth={W - 0.4}
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
        maxWidth={W - 0.5}
        lineHeight={1.5}
        font={undefined}
      >
        {project.description.slice(0, 90) + (project.description.length > 90 ? "…" : "")}
      </Text>

      {/* Year badge */}
      <Text
        position={[W / 2 - 0.3, -H / 2 + 0.2, 0.04]}
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
          <ringGeometry args={[Math.sqrt(W * W + H * H) / 2 + 0.05, Math.sqrt(W * W + H * H) / 2 + 0.12, 64]} />
          <meshBasicMaterial color="#e8ff00" transparent opacity={0.25} />
        </mesh>
      )}
    </group>
  );
}
