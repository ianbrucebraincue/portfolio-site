import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";

const SCROLL_SPEED = 0.04;

/**
 * Captures wheel events and drives the R3F camera forward along the Z axis.
 * Uses GSAP for smooth easing instead of frame-by-frame lerp.
 * Must be called from a component mounted inside a <Canvas>.
 */
export function useScrollCamera(initialZ = 0) {
  const { camera } = useThree();

  // GSAP tweens this proxy; useFrame copies it to the camera each tick
  const proxy = useRef({ z: initialZ });
  const targetZ = useRef(initialZ);

  useEffect(() => {
    proxy.current.z = camera.position.z;
    targetZ.current = camera.position.z;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZ.current -= e.deltaY * SCROLL_SPEED;

      gsap.to(proxy.current, {
        z: targetZ.current,
        duration: 0.9,
        ease: "power3.out",
        overwrite: true,
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      gsap.killTweensOf(proxy.current);
    };
  }, [camera]);

  useFrame(() => {
    camera.position.z = proxy.current.z;
  });
}
