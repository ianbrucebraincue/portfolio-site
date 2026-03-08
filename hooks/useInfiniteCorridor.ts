import { useMemo } from "react";

/**
 * Units behind the camera at which a panel is considered "passed"
 * and should be recycled to the front of the corridor.
 */
export const RECYCLE_BUFFER = 4;

// Lateral (X) offsets — panels alternate sides for a dynamic corridor feel
const X_OFFSETS = [-2.0, 2.0, -0.7, 0.7, -1.6, 1.6];

// Vertical (Y) offsets — subtle height variation to avoid a flat grid
const Y_OFFSETS = [0, 0.28, -0.18, 0.35, -0.1, 0.22];

/**
 * Generates the initial [x, y, z] world positions for each panel.
 * Panels are spaced `spacing` units apart along the -Z axis.
 *
 * Recycling is handled per-panel in useFrame:
 *   if (panel.z > camera.z + RECYCLE_BUFFER) panel.z -= count * spacing
 */
export function useInfiniteCorridor(
  count: number,
  spacing: number
): [number, number, number][] {
  return useMemo(
    () =>
      Array.from(
        { length: count },
        (_, i): [number, number, number] => [
          X_OFFSETS[i % X_OFFSETS.length],
          Y_OFFSETS[i % Y_OFFSETS.length],
          -(i * spacing) - spacing, // first panel at -spacing, then -2*spacing, …
        ]
      ),
    [count, spacing]
  );
}
