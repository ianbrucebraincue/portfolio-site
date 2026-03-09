"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Emoji set ────────────────────────────────────────────────────────────────
const EMOJIS = [
  "💻",
  "⌨️",
  "⚙️",
  "🔧",
  "🧩",
  "📦",
  "🧱",
  "🌐",
  "🔗"
];

const COUNT = 35;
const TEXTURE_SIZE = 128;

// ─── Deterministic seeded PRNG (mulberry32) ───────────────────────────────────
// Keeps positions identical across re-renders without needing a stable ref.
function makePrng(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── Canvas → THREE.CanvasTexture ─────────────────────────────────────────────
function makeEmojiTexture(emoji: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = TEXTURE_SIZE;
  canvas.height = TEXTURE_SIZE;
  const ctx = canvas.getContext("2d")!;
  // Draw with a subtle soft shadow so the emoji pops from any background
  ctx.shadowColor = "rgba(100,120,200,0.4)";
  ctx.shadowBlur = 10;
  ctx.font = `${Math.floor(TEXTURE_SIZE * 0.68)}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, TEXTURE_SIZE / 2, TEXTURE_SIZE / 2 + 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// ─── Per-sprite data ──────────────────────────────────────────────────────────
interface EmojiDatum {
  emoji: string;
  position: [number, number, number];
  phase: number;       // sine phase offset (radians)
  driftFreq: number;   // oscillations per second
  driftAmp: number;    // vertical travel (world units)
  rotSpeed: number;    // sprite rotation Δ per frame (radians)
  size: number;        // sprite scale (world units)
  opacity: number;     // base transparency
}

// ─── Single sprite + animation ────────────────────────────────────────────────
function EmojiSprite({
  texture,
  datum,
}: {
  texture: THREE.CanvasTexture;
  datum: EmojiDatum;
}) {
  const ref = useRef<THREE.Sprite>(null!);
  const { position, phase, driftFreq, driftAmp, rotSpeed, size, opacity } = datum;

  useFrame(() => {
    const sprite = ref.current;
    if (!sprite) return;
    const t = performance.now() * 0.001;

    // Vertical sine drift
    sprite.position.y = position[1] + Math.sin(t * driftFreq + phase) * driftAmp;
    // Subtle lateral sway at a slightly different frequency so it never loops
    sprite.position.x = position[0] + Math.sin(t * 0.13 + phase * 1.73) * 0.12;

    // Slow billboard rotation
    (sprite.material as THREE.SpriteMaterial).rotation += rotSpeed;
  });

  return (
    <sprite ref={ref} position={position} scale={[size, size, 1]}>
      <spriteMaterial
        map={texture}
        transparent
        opacity={opacity}
        depthWrite={false}
        // sizeAttenuation is true by default on SpriteMaterial —
        // sprites scale naturally with distance, reinforcing depth.
      />
    </sprite>
  );
}

// ─── Field ────────────────────────────────────────────────────────────────────
interface DevEmojiFieldProps {
  /**
   * Total Z length of the corridor so emojis are spread across the full
   * scroll distance.  Defaults to 50 for a standalone scene.
   */
  corridorLength?: number;
}

export default function DevEmojiField({ corridorLength = 50 }: DevEmojiFieldProps) {
  // Build per-unique-emoji textures once; shared by sprites with the same emoji.
  const textureMap = useMemo(() => {
    const map = new Map<string, THREE.CanvasTexture>();
    for (const e of EMOJIS) map.set(e, makeEmojiTexture(e));
    return map;
  }, []);

  // Generate stable, randomised per-sprite data.
  const data = useMemo<EmojiDatum[]>(() => {
    const rand = makePrng(0xbeef42);
    const X_SPREAD = 24
    const Y_SPREAD = 11 
    return Array.from({ length: COUNT }, () => {
      const emoji = EMOJIS[Math.floor(rand() * EMOJIS.length)];
      return {
        emoji,
        position: [
          rand() * (X_SPREAD * 2) - X_SPREAD,
          rand() * (Y_SPREAD * 2) - Y_SPREAD,
          -(rand() * corridorLength + 4),
        ] as [number, number, number],
        phase:     rand() * Math.PI * 2,
        driftFreq: 0.12 + rand() * 0.22,  // 0.12–0.34 Hz  → calm
        driftAmp:  0.18 + rand() * 0.38,  // 0.18–0.56 units
        rotSpeed:  (rand() - 0.5) * 0.0015, // tiny CW / CCW rotation
        size:      1 + rand() * 5,  // 1-6 units → background-scale
        opacity:   0.22 + rand() * 0.24,  // 0.22–0.46 → subtle
      };
    });
  }, [corridorLength]);

  return (
    <>
      {data.map((datum, i) => (
        <EmojiSprite
          key={i}
          texture={textureMap.get(datum.emoji)!}
          datum={datum}
        />
      ))}
    </>
  );
}
