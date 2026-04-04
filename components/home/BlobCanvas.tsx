"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ThreeBlobScene } from "@/components/ThreeBlob";

export default function BlobCanvas({ hoveredRef }: { hoveredRef: React.MutableRefObject<boolean> }) {
  return (
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
  );
}
