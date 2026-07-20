"use client";

import { Suspense, useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ============================================================================
 *  HeroScene — interactive 3D centerpiece.
 *  Behaviour: it rotates on its own continuously, but SWAYS toward the user's
 *  cursor (or finger swipe) as they move — the object leans in the direction
 *  the pointer goes, then eases back to its auto-spin. No dragging needed.
 * ==========================================================================*/

type PointerRef = MutableRefObject<{ x: number; y: number }>;

function ParticleField({
  pointer,
  count = 1400,
}: {
  pointer: PointerRef;
  count?: number;
}) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.2 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    // gentle auto drift
    ref.current.rotation.y += delta * 0.03;
    // subtle parallax toward the pointer (depth feel)
    const targetX = pointer.current.y * 0.15;
    const targetZ = pointer.current.x * 0.15;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * delta * 1.5;
    ref.current.rotation.z += (targetZ - ref.current.rotation.z) * delta * 1.5;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#22d3ee"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  );
}

function Core({ pointer }: { pointer: PointerRef }) {
  const ref = useRef<THREE.Group>(null);
  const autoY = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;

    // 1) continuous base rotation (auto-move)
    autoY.current += delta * 0.28;

    // 2) sway toward the pointer: cursor to the right/up leans the object that way
    const swayY = autoY.current + pointer.current.x * 0.9; // horizontal follow
    const swayX = pointer.current.y * 0.6; // vertical follow

    // 3) ease current rotation toward the target for a smooth, springy sway
    const k = Math.min(1, delta * 3.2);
    ref.current.rotation.y += (swayY - ref.current.rotation.y) * k;
    ref.current.rotation.x += (swayX - ref.current.rotation.x) * k;
    ref.current.rotation.z += delta * 0.04; // slow constant roll for life
  });

  return (
    <group ref={ref}>
      <Icosahedron args={[1.15, 1]}>
        <meshStandardMaterial
          color="#0b1220"
          emissive="#3b1a6b"
          emissiveIntensity={0.6}
          roughness={0.3}
          metalness={0.8}
        />
      </Icosahedron>
      <Icosahedron args={[1.55, 1]}>
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.55} />
      </Icosahedron>
      <Icosahedron args={[1.85, 0]}>
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.28} />
      </Icosahedron>
    </group>
  );
}

export default function HeroScene() {
  // Shared, normalized pointer position (-1..1) updated from the whole window,
  // so the object reacts to the cursor even when it's over the hero text.
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const set = (clientX: number, clientY: number) => {
      pointer.current.x = (clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((clientY / window.innerHeight) * 2 - 1);
    };
    const onPointer = (e: PointerEvent) => set(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) set(e.touches[0].clientX, e.touches[0].clientY);
    };
    window.addEventListener("pointermove", onPointer);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 6, 6]} intensity={80} color="#22d3ee" />
      <pointLight position={[-6, -4, -4]} intensity={60} color="#a855f7" />

      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0} floatIntensity={0.7}>
          <Core pointer={pointer} />
        </Float>
        <ParticleField pointer={pointer} />
      </Suspense>
    </Canvas>
  );
}
