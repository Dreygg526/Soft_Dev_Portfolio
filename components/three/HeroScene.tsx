"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Icosahedron,
  OrbitControls,
  Points,
  PointMaterial,
} from "@react-three/drei";
import * as THREE from "three";

/* ============================================================================
 *  HeroScene — the interactive 3D centerpiece.
 *  - A glowing wireframe "core" (icosahedron) you can DRAG to orbit.
 *  - A slowly-rotating particle field around it.
 *  - Auto-rotates on its own; grabbing it hands control to the visitor.
 *
 *  Performance: this only mounts on capable devices (see HeroCanvas guard in
 *  components/HeroCanvas.tsx) and respects prefers-reduced-motion.
 * ==========================================================================*/

function ParticleField({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  // Generate points on a rough sphere shell once.
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
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03;
      ref.current.rotation.x += delta * 0.01;
    }
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

function Core() {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15;
      ref.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {/* Solid inner glow */}
      <Icosahedron args={[1.15, 1]}>
        <meshStandardMaterial
          color="#0b1220"
          emissive="#3b1a6b"
          emissiveIntensity={0.6}
          roughness={0.3}
          metalness={0.8}
        />
      </Icosahedron>
      {/* Neon wireframe shell */}
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
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "auto" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 6, 6]} intensity={80} color="#22d3ee" />
      <pointLight position={[-6, -4, -4]} intensity={60} color="#a855f7" />

      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
          <Core />
        </Float>
        <ParticleField />
      </Suspense>

      {/* Drag to orbit. Zoom/pan off so it doesn't hijack page scroll. */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        rotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.6}
      />
    </Canvas>
  );
}
