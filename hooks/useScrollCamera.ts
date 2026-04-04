import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";

/**
 * Drives the camera along the -Z axis using scroll progress from Drei's
 * ScrollControls, replacing the previous wheel-event + GSAP approach.
 *
 * Why this works on mobile when the old version didn't:
 *   ScrollControls creates a native HTML overflow:scroll element overlaid on
 *   the Canvas. The browser handles wheel, trackpad momentum, and touch scroll
 *   on that element natively — no JS event listeners required. scroll.offset
 *   is the normalised [0→1] progress, updated every frame inside useFrame.
 *
 * Why pointer events (hover, click) still work:
 *   The scroll element uses pointer-events:none + touch-action:pan-y so the
 *   Canvas receives all pointer events normally. Scroll and pointer handling
 *   are separate browser mechanisms.
 *
 * @param initialZ  World Z where the camera starts (e.g. 2)
 * @param travel    Total Z units to traverse from offset 0 → 1
 *
 * Must be called from a component rendered inside <ScrollControls>.
 */
export function useScrollCamera(initialZ: number, travel: number): void {
  const { camera } = useThree();
  const scroll = useScroll();

  useFrame(() => {
    if (document.hidden) return;
    // Direct assignment each frame — no GSAP, no proxy.
    // ScrollControls handles its own damping via the `damping` prop.
    camera.position.z = initialZ - scroll.offset * travel;
  });
}
