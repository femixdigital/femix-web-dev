import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import { useRef } from 'react';
import type { Mesh } from 'three';

function CoreObject() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.x += delta * 0.18;
    meshRef.current.rotation.y += delta * 0.32;
  });

  return (
    <Float
      speed={1.4}
      rotationIntensity={0.35}
      floatIntensity={0.8}
    >
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.35, 2]} />
        <meshStandardMaterial
          color="#7c5cff"
          metalness={0.8}
          roughness={0.2}
          emissive="#24135c"
          emissiveIntensity={0.35}
        />
      </mesh>

      <Text
        position={[0, 0, 1.45]}
        fontSize={0.32}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        FEMIX
      </Text>
    </Float>
  );
}

export default function FemixScene() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />

        <directionalLight
          position={[3, 4, 5]}
          intensity={2}
        />

        <pointLight
          position={[-3, -2, 2]}
          intensity={12}
          color="#22d3ee"
        />

        <CoreObject />
      </Canvas>
    </div>
  );
}
