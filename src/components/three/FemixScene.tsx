import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Torus } from '@react-three/drei';
import { useRef } from 'react';
import type { Group, Mesh } from 'three';

function FemixCore() {
  const groupRef = useRef<Group>(null);
  const ringRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current || !ringRef.current) return;

    groupRef.current.rotation.y += delta * 0.18;
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.45) * 0.08;

    ringRef.current.rotation.z += delta * 0.45;
    ringRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
  });

  return (
    <Float
      speed={1.1}
      rotationIntensity={0.18}
      floatIntensity={0.5}
    >
      <group ref={groupRef}>
        <mesh>
          <boxGeometry args={[1.65, 1.65, 0.34]} />
          <meshStandardMaterial
            color="#8065ff"
            metalness={0.85}
            roughness={0.18}
            emissive="#26175c"
            emissiveIntensity={0.35}
          />
        </mesh>

        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[1.05, 1.05, 0.48]} />
          <meshStandardMaterial
            color="#111420"
            metalness={0.7}
            roughness={0.22}
            emissive="#8065ff"
            emissiveIntensity={0.12}
          />
        </mesh>

        <Text
          position={[0, 0, 0.29]}
          fontSize={0.47}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          fontWeight={800}
        >
          FX
        </Text>

        <Torus
          ref={ringRef}
          args={[1.42, 0.018, 12, 96]}
          rotation={[Math.PI / 2.4, 0.15, 0]}
        >
          <meshStandardMaterial
            color="#27ddff"
            emissive="#27ddff"
            emissiveIntensity={1.8}
            metalness={0.4}
            roughness={0.2}
          />
        </Torus>

        <mesh position={[0.92, 0.72, 0.32]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#27ddff"
            emissiveIntensity={2}
          />
        </mesh>

        <mesh position={[-0.82, -0.72, 0.32]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial
            color="#8065ff"
            emissive="#8065ff"
            emissiveIntensity={2}
          />
        </mesh>
      </group>
    </Float>
  );
}

function OrbitingMark() {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z -= delta * 0.22;
  });

  return (
    <group ref={groupRef}>
      <Torus args={[2.15, 0.008, 8, 96]} rotation={[1.1, 0.2, 0]}>
        <meshStandardMaterial
          color="#596174"
          transparent
          opacity={0.45}
          metalness={0.5}
          roughness={0.5}
        />
      </Torus>

      <mesh position={[1.42, 0.8, 0]}>
        <octahedronGeometry args={[0.075, 0]} />
        <meshStandardMaterial
          color="#27ddff"
          emissive="#27ddff"
          emissiveIntensity={1.5}
        />
      </mesh>
    </group>
  );
}

export default function FemixScene() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.45} />

        <directionalLight
          position={[4, 5, 6]}
          intensity={2.2}
        />

        <pointLight
          position={[-4, -2, 3]}
          intensity={8}
          color="#8065ff"
        />

        <pointLight
          position={[3, 1, 2]}
          intensity={6}
          color="#27ddff"
        />

        <FemixCore />
        <OrbitingMark />
      </Canvas>
    </div>
  );
}
