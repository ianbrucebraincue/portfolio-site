"use client";

import { useState, useRef, Suspense, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Environment } from "@react-three/drei";
import type { Project } from "@/types";
import ProjectCard3D from "./ProjectCard3D";
import ProjectDetail from "./ProjectDetail";
import styles from "./WorldScene.module.css";

interface WorldSceneProps {
  projects: Project[];
}

const CIRCLE_RADIUS = 8;
const VERTICAL_VARIATION = 1.2;

// Arrange projects in a circular arc in 3D space
function getProjectPosition(index: number, total: number): [number, number, number] {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const x = Math.cos(angle) * CIRCLE_RADIUS;
  const z = Math.sin(angle) * CIRCLE_RADIUS;
  const y = Math.sin(index * 1.3) * VERTICAL_VARIATION;
  return [x, y, z];
}

export default function WorldScene({ projects }: WorldSceneProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const controlsRef = useRef(null);

  const toggleProject = useCallback((project: Project) => {
    setActiveProject((prev) => (prev?.id === project.id ? null : project));
  }, []);

  return (
    <div className={styles.wrapper}>
      <Canvas
        camera={{ position: [0, 3, 16], fov: 55, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        aria-label="3D project portfolio world"
        role="img"
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-10, -5, -10]} intensity={0.6} color="#4040ff" />
        <pointLight position={[0, 8, 0]} intensity={0.8} color="#e8ff00" />

        {/* Background */}
        <Stars radius={80} depth={40} count={3000} factor={4} fade speed={0.5} />
        <Environment preset="night" />

        {/* Project cards in circular layout */}
        <Suspense fallback={null}>
          {projects.map((project, index) => (
            <ProjectCard3D
              key={project.id}
              project={project}
              position={getProjectPosition(index, projects.length)}
              isActive={activeProject?.id === project.id}
              onClick={() => toggleProject(project)}
            />
          ))}
        </Suspense>

        {/* Ground grid */}
        {/* GridHelper doesn't support rgba — use solid hex colors */}
        <gridHelper
          args={[40, 40, "#1a1a1a", "#141414"]}
          position={[0, -3.5, 0]}
        />

        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.08}
          minDistance={5}
          maxDistance={30}
          maxPolarAngle={Math.PI * 0.75}
          makeDefault
        />
      </Canvas>

      {/* 2D overlay panel for active project detail */}
      {activeProject && (
        <ProjectDetail
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}

      {/* Project list overlay */}
      <nav className={styles.projectList} aria-label="Project list">
        {projects.map((project) => (
          <button
            key={project.id}
            className={`${styles.projectBtn} ${activeProject?.id === project.id ? styles.active : ""}`}
            onClick={() => toggleProject(project)}
            aria-pressed={activeProject?.id === project.id}
          >
            {project.title}
          </button>
        ))}
      </nav>
    </div>
  );
}
