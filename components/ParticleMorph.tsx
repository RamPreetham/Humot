"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type ParticleMorphProps = {
  count?: number;
  radius?: number;
};

const TEXT = "HUMOT AI";

function generateSpherePositions(count: number, radius: number) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    // fibonacci sphere for nicer distribution
    const i2 = i + 0.5;
    const phi = Math.acos(1 - (2 * i2) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i2;

    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(theta) * Math.sin(phi);

    const idx = i * 3;
    positions[idx] = x;
    positions[idx + 1] = y;
    positions[idx + 2] = z;
  }

  return positions;
}

function generateTextPositions(count: number) {
  const canvas = document.createElement("canvas");
  const width = 600;
  const height = 200;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    // Fallback: flat plane of zeroes
    return new Float32Array(count * 3);
  }

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 96px Arial";

  // Draw HUMOT AI in the center
  ctx.fillText(TEXT, width / 2, height / 2);

  const imageData = ctx.getImageData(0, 0, width, height).data;
  const sampleStep = 4; // bigger = fewer points
  const points: { x: number; y: number; z: number }[] = [];

  for (let y = 0; y < height; y += sampleStep) {
    for (let x = 0; x < width; x += sampleStep) {
      const idx = (y * width + x) * 4 + 3; // alpha channel
      const alpha = imageData[idx];
      if (alpha > 128) {
        // Normalize to a nicer size and center
        const nx = (x - width / 2) / 35; // scale down
        const ny = -(y - height / 2) / 35;
        const nz = 0;
        points.push({ x: nx, y: ny, z: nz });
      }
    }
  }

  // Now fill an array of size count * 3 by repeating these points
  const positions = new Float32Array(count * 3);
  const len = points.length || 1;

  for (let i = 0; i < count; i++) {
    const p = points[i % len];
    const idx = i * 3;
    positions[idx] = p.x;
    positions[idx + 1] = p.y;
    positions[idx + 2] = p.z;
  }

  return positions;
}

export function ParticleMorph({ count = 4000, radius = 4 }: ParticleMorphProps) {
  const pointsRef = useRef<THREE.Points | null>(null);

  // Precompute sphere & text targets
  const { spherePositions, textPositions, basePositions } = useMemo(() => {
    const spherePositions = generateSpherePositions(count, radius);

    // text positions use browser canvas; guard for non-DOM environments
    let textPositions: Float32Array;
    if (typeof window !== "undefined") {
      textPositions = generateTextPositions(count);
    } else {
      textPositions = new Float32Array(count * 3);
    }

    // Start at sphere
    const basePositions = new Float32Array(spherePositions);

    return { spherePositions, textPositions, basePositions };
  }, [count, radius]);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;

    const geom = points.geometry;
    const positionAttr = geom.getAttribute("position") as THREE.BufferAttribute;
    const arr = positionAttr.array as Float32Array;

    const elapsed = state.clock.getElapsedTime();

    // 0–4s: globe -> text
    // 4–8s: hold text
    // 8–12s: text -> globe
    // 12–16s: hold globe
    // repeat
    const cycleDuration = 16;
    const t = elapsed % cycleDuration;

    let alpha = 0; // 0 = globe, 1 = text

    if (t < 4) {
      alpha = t / 4; // 0 -> 1
    } else if (t < 8) {
      alpha = 1;
    } else if (t < 12) {
      alpha = 1 - (t - 8) / 4; // 1 -> 0
    } else {
      alpha = 0;
    }

    const smoothAlpha = THREE.MathUtils.smoothstep(alpha, 0, 1);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      const sx = spherePositions[idx];
      const sy = spherePositions[idx + 1];
      const sz = spherePositions[idx + 2];

      const tx = textPositions[idx];
      const ty = textPositions[idx + 1];
      const tz = textPositions[idx + 2];

      arr[idx] = THREE.MathUtils.lerp(sx, tx, smoothAlpha);
      arr[idx + 1] = THREE.MathUtils.lerp(sy, ty, smoothAlpha);
      arr[idx + 2] = THREE.MathUtils.lerp(sz, tz, smoothAlpha);
    }

    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={basePositions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#38bdf8"
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={0.9}
      />
    </points>
  );
}

export default ParticleMorph;
