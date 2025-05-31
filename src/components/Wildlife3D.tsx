
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Cone } from '@react-three/drei';
import * as THREE from 'three';

const Wildlife3D = () => {
  const tigerRef = useRef<THREE.Mesh>(null);
  const elephantRef = useRef<THREE.Mesh>(null);
  const leopardRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (tigerRef.current) {
      tigerRef.current.rotation.y += delta * 0.3;
      tigerRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
    if (elephantRef.current) {
      elephantRef.current.rotation.y -= delta * 0.2;
      elephantRef.current.position.y = Math.sin(state.clock.elapsedTime + 2) * 0.3;
    }
    if (leopardRef.current) {
      leopardRef.current.rotation.y += delta * 0.4;
      leopardRef.current.position.y = Math.sin(state.clock.elapsedTime + 4) * 0.25;
    }
  });

  return (
    <group>
      {/* Tiger representation */}
      <group ref={tigerRef} position={[-3, 0, 0]}>
        <Sphere args={[0.8]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#FF6B35" 
            emissive="#FF6B35" 
            emissiveIntensity={0.2}
            transparent
            opacity={0.8}
          />
        </Sphere>
        <Box args={[1.5, 0.3, 0.8]} position={[0, -0.5, 0]}>
          <meshStandardMaterial 
            color="#FF6B35" 
            emissive="#FF6B35" 
            emissiveIntensity={0.1}
            transparent
            opacity={0.7}
          />
        </Box>
      </group>

      {/* Elephant representation */}
      <group ref={elephantRef} position={[3, 0, 0]}>
        <Sphere args={[1]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#8B5FFF" 
            emissive="#8B5FFF" 
            emissiveIntensity={0.2}
            transparent
            opacity={0.8}
          />
        </Sphere>
        <Cone args={[0.3, 1.2]} position={[0, -0.8, 0.5]} rotation={[Math.PI / 6, 0, 0]}>
          <meshStandardMaterial 
            color="#8B5FFF" 
            emissive="#8B5FFF" 
            emissiveIntensity={0.1}
            transparent
            opacity={0.7}
          />
        </Cone>
      </group>

      {/* Leopard representation */}
      <group ref={leopardRef} position={[0, 2, -2]}>
        <Sphere args={[0.6]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#39FF6A" 
            emissive="#39FF6A" 
            emissiveIntensity={0.2}
            transparent
            opacity={0.8}
          />
        </Sphere>
        <Box args={[1.2, 0.25, 0.6]} position={[0, -0.4, 0]}>
          <meshStandardMaterial 
            color="#39FF6A" 
            emissive="#39FF6A" 
            emissiveIntensity={0.1}
            transparent
            opacity={0.7}
          />
        </Box>
      </group>

      {/* Floating particles around animals */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Sphere
          key={i}
          args={[0.02]}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6
          ]}
        >
          <meshStandardMaterial 
            color="#00D4FF" 
            emissive="#00D4FF" 
            emissiveIntensity={0.5}
          />
        </Sphere>
      ))}
    </group>
  );
};

export default Wildlife3D;
