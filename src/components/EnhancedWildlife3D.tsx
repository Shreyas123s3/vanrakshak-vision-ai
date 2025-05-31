
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const EnhancedWildlife3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const tigerRef = useRef<THREE.Group>(null);
  const elephantRef = useRef<THREE.Group>(null);
  const birdRefs = useRef<THREE.Group[]>([]);
  const treesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Main group gentle rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.2;
    }
    
    // Tiger walking animation
    if (tigerRef.current) {
      tigerRef.current.position.x = Math.sin(time * 0.5) * 3;
      tigerRef.current.position.z = Math.cos(time * 0.3) * 2;
      tigerRef.current.rotation.y = Math.atan2(
        Math.cos(time * 0.5) * 3, 
        -Math.sin(time * 0.3) * 2
      );
      tigerRef.current.position.y = Math.abs(Math.sin(time * 4)) * 0.1;
    }
    
    // Elephant swaying
    if (elephantRef.current) {
      elephantRef.current.rotation.z = Math.sin(time * 0.8) * 0.1;
      elephantRef.current.position.y = Math.sin(time * 1.2) * 0.05;
    }
    
    // Birds flying in formation
    birdRefs.current.forEach((bird, index) => {
      if (bird) {
        const offset = index * 0.5;
        bird.position.x = Math.sin(time * 0.8 + offset) * 4 + index * 0.5;
        bird.position.y = 3 + Math.sin(time * 2 + offset) * 0.3;
        bird.position.z = Math.cos(time * 0.6 + offset) * 2;
        bird.rotation.z = Math.sin(time * 3 + offset) * 0.2;
      }
    });

    // Trees swaying
    if (treesRef.current) {
      treesRef.current.children.forEach((tree, index) => {
        tree.rotation.z = Math.sin(time * 0.5 + index * 0.3) * 0.05;
      });
    }
  });

  // Create multiple birds
  const createBird = (index: number) => (
    <group 
      key={index} 
      ref={(el) => { if (el) birdRefs.current[index] = el; }}
      position={[index * 0.5, 3, 0]}
    >
      {/* Bird body */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 8, 6]} />
        <meshStandardMaterial color="#39FF6A" />
      </mesh>
      
      {/* Bird head */}
      <mesh position={[0.15, 0.1, 0]}>
        <sphereGeometry args={[0.1, 6, 4]} />
        <meshStandardMaterial color="#32CD32" />
      </mesh>
      
      {/* Wings */}
      <mesh position={[-0.3, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.4, 0.05, 0.2]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[-0.3, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.4, 0.05, 0.2]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  );

  // Create forest trees
  const createTree = (position: [number, number, number], scale: number) => (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1 * scale, 0.15 * scale, 1 * scale]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Foliage */}
      <mesh position={[0, 0.8 * scale, 0]}>
        <sphereGeometry args={[0.6 * scale, 8, 6]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[0, 1.2 * scale, 0]}>
        <sphereGeometry args={[0.4 * scale, 8, 6]} />
        <meshStandardMaterial color="#32CD32" />
      </mesh>
    </group>
  );

  return (
    <group ref={groupRef}>
      {/* Enhanced Tiger */}
      <group ref={tigerRef} position={[-2, 0, 0]}>
        {/* Main body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 0.8, 0.6]} />
          <meshStandardMaterial color="#FF6B35" />
        </mesh>
        
        {/* Head */}
        <mesh position={[0.8, 0.3, 0]}>
          <sphereGeometry args={[0.4]} />
          <meshStandardMaterial color="#FF8C69" />
        </mesh>
        
        {/* Eyes */}
        <mesh position={[1.1, 0.4, 0.15]}>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[1.1, 0.4, -0.15]}>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Legs */}
        {[-0.4, -0.4, 0.4, 0.4].map((x, i) => (
          <mesh key={i} position={[x, -0.6, i < 2 ? 0.2 : -0.2]}>
            <cylinderGeometry args={[0.08, 0.08, 0.4]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
        ))}
        
        {/* Tail */}
        <mesh position={[-0.8, 0.2, 0]} rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.05, 0.1, 0.8]} />
          <meshStandardMaterial color="#FF6B35" />
        </mesh>
      </group>

      {/* Enhanced Elephant */}
      <group ref={elephantRef} position={[2, 0, 0]}>
        {/* Main body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 1.2, 1]} />
          <meshStandardMaterial color="#696969" />
        </mesh>
        
        {/* Head */}
        <mesh position={[1.2, 0.2, 0]}>
          <sphereGeometry args={[0.6]} />
          <meshStandardMaterial color="#696969" />
        </mesh>
        
        {/* Trunk */}
        <mesh position={[1.8, -0.2, 0]} rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.15, 0.25, 1.2]} />
          <meshStandardMaterial color="#696969" />
        </mesh>
        
        {/* Ears */}
        <mesh position={[1, 0.6, 0.4]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[0.6, 0.8, 0.05]} />
          <meshStandardMaterial color="#696969" />
        </mesh>
        <mesh position={[1, 0.6, -0.4]} rotation={[0, -Math.PI / 4, 0]}>
          <boxGeometry args={[0.6, 0.8, 0.05]} />
          <meshStandardMaterial color="#696969" />
        </mesh>
        
        {/* Legs */}
        {[-0.6, -0.6, 0.6, 0.6].map((x, i) => (
          <mesh key={i} position={[x, -0.9, i < 2 ? 0.3 : -0.3]}>
            <cylinderGeometry args={[0.2, 0.2, 0.6]} />
            <meshStandardMaterial color="#696969" />
          </mesh>
        ))}
      </group>

      {/* Flying Birds */}
      {[...Array(5)].map((_, index) => createBird(index))}

      {/* Forest Background */}
      <group ref={treesRef}>
        {createTree([-4, -0.5, -3], 0.8)}
        {createTree([4, -0.5, -4], 1.2)}
        {createTree([-3, -0.5, 3], 1.0)}
        {createTree([3, -0.5, 4], 0.9)}
        {createTree([0, -0.5, -5], 1.1)}
        {createTree([-5, -0.5, 0], 0.7)}
        {createTree([5, -0.5, -1], 1.3)}
      </group>

      {/* Floating particles/fireflies */}
      {[...Array(15)].map((_, index) => (
        <mesh
          key={`particle-${index}`}
          position={[
            (Math.random() - 0.5) * 10,
            Math.random() * 3 + 1,
            (Math.random() - 0.5) * 10
          ]}
        >
          <sphereGeometry args={[0.02]} />
          <meshBasicMaterial color="#FFD700" />
        </mesh>
      ))}
    </group>
  );
};

export default EnhancedWildlife3D;
