"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ParticleMorph from "./ParticleMorph";

export function GalaxyBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* You can keep your Tailwind gradient or custom class here if you want */}
      {/* <div className="absolute inset-0 cosmic-gradient" /> */}

      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#8a2be2" />

        {/* The morphing globe -> HUMOT AI -> globe */}
        <ParticleMorph count={4000} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 1.4}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}

export default GalaxyBackground;
