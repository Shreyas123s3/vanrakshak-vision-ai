
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// 3D Terrain Component
const Terrain = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
      const positionAttribute = geometry.getAttribute('position');
      
      // Create realistic terrain with noise
      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        
        // Generate height using multiple noise layers
        let height = 0;
        height += Math.sin(x * 0.1) * Math.cos(y * 0.1) * 0.5;
        height += Math.sin(x * 0.05) * Math.cos(y * 0.05) * 1;
        height += Math.random() * 0.1;
        
        positionAttribute.setZ(i, height);
      }
      
      positionAttribute.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  }, []);

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[20, 20, 32, 32]} />
      <meshStandardMaterial 
        color="#2D5016" 
        wireframe={false}
        transparent
        opacity={0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Wildlife Marker Component
const WildlifeMarker = ({ 
  position, 
  species, 
  data, 
  onClick 
}: { 
  position: [number, number, number];
  species: string;
  data: any;
  onClick: () => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime();
      meshRef.current.scale.setScalar(hovered ? 1.3 : 1);
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
    }
  });

  const getSpeciesColor = (species: string) => {
    switch (species) {
      case 'tiger': return '#FF6B35';
      case 'elephant': return '#8B5FFF';
      case 'leopard': return '#FFD700';
      case 'deer': return '#39FF6A';
      case 'bird': return '#00D4FF';
      default: return '#FFFFFF';
    }
  };

  const getSpeciesIcon = (species: string) => {
    switch (species) {
      case 'tiger': return '🐅';
      case 'elephant': return '🐘';
      case 'leopard': return '🐆';
      case 'deer': return '🦌';
      case 'bird': return '🐦';
      default: return '🐾';
    }
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <cylinderGeometry args={[0.1, 0.3, 0.6, 8]} />
        <meshStandardMaterial 
          color={getSpeciesColor(species)} 
          emissive={getSpeciesColor(species)} 
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Floating Icon */}
      <Html
        position={[0, 0.8, 0]}
        center
        transform
        occlude
        style={{
          fontSize: hovered ? '24px' : '20px',
          transition: 'font-size 0.2s',
          textAlign: 'center',
          pointerEvents: 'none'
        }}
      >
        <div style={{ 
          background: 'rgba(0, 0, 0, 0.7)', 
          padding: '4px 8px', 
          borderRadius: '8px',
          border: `2px solid ${getSpeciesColor(species)}`
        }}>
          {getSpeciesIcon(species)}
        </div>
      </Html>

      {hovered && (
        <Html
          position={[0, 1.2, 0]}
          center
          transform
          occlude
          style={{
            pointerEvents: 'none',
            color: 'white',
            fontSize: '12px',
            textAlign: 'center'
          }}
        >
          <div style={{ 
            background: 'rgba(0, 0, 0, 0.8)', 
            padding: '8px', 
            borderRadius: '8px',
            minWidth: '120px'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
              {species.toUpperCase()}
            </div>
            <div>Population: {data.population}</div>
            <div>Health: {data.health}</div>
            <div>Last Seen: {data.lastSeen}</div>
          </div>
        </Html>
      )}
    </group>
  );
};

// Conservation Zone Component
const ConservationZone = ({ 
  center, 
  radius, 
  name, 
  type 
}: { 
  center: [number, number, number];
  radius: number;
  name: string;
  type: 'national_park' | 'wildlife_sanctuary' | 'tiger_reserve';
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    }
  });

  const getZoneColor = (type: string) => {
    switch (type) {
      case 'national_park': return '#39FF6A';
      case 'wildlife_sanctuary': return '#00D4FF';
      case 'tiger_reserve': return '#FF6B35';
      default: return '#FFFFFF';
    }
  };

  return (
    <group position={center}>
      <mesh ref={meshRef}>
        <ringGeometry args={[radius * 0.8, radius, 32]} />
        <meshBasicMaterial 
          color={getZoneColor(type)} 
          transparent 
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      <Text
        position={[0, 0.1, 0]}
        fontSize={0.3}
        color={getZoneColor(type)}
        anchorX="center"
        anchorY="middle"
        rotation={[-Math.PI / 2, 0, 0]}
      >
        {name}
      </Text>
    </group>
  );
};

// Camera Controller
const CameraController = ({ selectedLocation }: { selectedLocation: any }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    if (selectedLocation) {
      camera.position.set(
        selectedLocation.position[0] + 2,
        selectedLocation.position[1] + 3,
        selectedLocation.position[2] + 2
      );
      camera.lookAt(selectedLocation.position[0], selectedLocation.position[1], selectedLocation.position[2]);
    }
  }, [selectedLocation, camera]);

  return null;
};

// Main 3D Map Component
const Interactive3DMap = () => {
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'satellite' | 'terrain' | 'wildlife'>('terrain');

  // Wildlife data for Indian conservation areas
  const wildlifeData = [
    {
      id: 1,
      position: [2, 0.5, 1] as [number, number, number],
      species: 'tiger',
      data: {
        population: 48,
        health: 'Good',
        lastSeen: '2 hours ago',
        location: 'Ranthambore National Park'
      }
    },
    {
      id: 2,
      position: [-3, 0.3, -2] as [number, number, number],
      species: 'elephant',
      data: {
        population: 156,
        health: 'Excellent',
        lastSeen: '30 minutes ago',
        location: 'Bandipur National Park'
      }
    },
    {
      id: 3,
      position: [4, 0.7, -1] as [number, number, number],
      species: 'leopard',
      data: {
        population: 23,
        health: 'Fair',
        lastSeen: '1 day ago',
        location: 'Sariska Tiger Reserve'
      }
    },
    {
      id: 4,
      position: [-1, 0.4, 3] as [number, number, number],
      species: 'deer',
      data: {
        population: 340,
        health: 'Good',
        lastSeen: '15 minutes ago',
        location: 'Kanha National Park'
      }
    },
    {
      id: 5,
      position: [0, 0.6, -4] as [number, number, number],
      species: 'bird',
      data: {
        population: 1250,
        health: 'Excellent',
        lastSeen: '5 minutes ago',
        location: 'Bharatpur Bird Sanctuary'
      }
    }
  ];

  const conservationZones = [
    {
      center: [2, 0, 1] as [number, number, number],
      radius: 1.5,
      name: 'Ranthambore',
      type: 'tiger_reserve' as const
    },
    {
      center: [-3, 0, -2] as [number, number, number],
      radius: 2,
      name: 'Bandipur',
      type: 'national_park' as const
    },
    {
      center: [0, 0, -4] as [number, number, number],
      radius: 1.2,
      name: 'Bharatpur',
      type: 'wildlife_sanctuary' as const
    }
  ];

  const handleMarkerClick = (marker: any) => {
    setSelectedMarker(marker);
    setSelectedLocation(marker);
  };

  const resetView = () => {
    setSelectedMarker(null);
    setSelectedLocation(null);
  };

  return (
    <div className="w-full h-screen relative bg-gradient-to-b from-sky-900 to-forest-navy">
      {/* Control Panel */}
      <div className="absolute top-4 left-4 z-10 space-y-4">
        <div className="glassmorphism p-4 rounded-xl">
          <h3 className="text-lg font-orbitron font-bold text-electric-cyan mb-3">
            🗺️ 3D Conservation Map
          </h3>
          
          <div className="space-y-2">
            <button
              onClick={() => setViewMode('terrain')}
              className={`w-full px-3 py-2 rounded-lg text-sm transition-all ${
                viewMode === 'terrain' 
                  ? 'bg-electric-cyan text-forest-navy' 
                  : 'glassmorphism text-misty-white hover:bg-misty-white/10'
              }`}
            >
              🏔️ Terrain View
            </button>
            <button
              onClick={() => setViewMode('satellite')}
              className={`w-full px-3 py-2 rounded-lg text-sm transition-all ${
                viewMode === 'satellite' 
                  ? 'bg-electric-cyan text-forest-navy' 
                  : 'glassmorphism text-misty-white hover:bg-misty-white/10'
              }`}
            >
              🛰️ Satellite View
            </button>
            <button
              onClick={() => setViewMode('wildlife')}
              className={`w-full px-3 py-2 rounded-lg text-sm transition-all ${
                viewMode === 'wildlife' 
                  ? 'bg-electric-cyan text-forest-navy' 
                  : 'glassmorphism text-misty-white hover:bg-misty-white/10'
              }`}
            >
              🐾 Wildlife View
            </button>
          </div>
          
          <button
            onClick={resetView}
            className="w-full mt-3 px-3 py-2 bg-bio-green/20 text-bio-green rounded-lg text-sm hover:bg-bio-green/30 transition-colors"
          >
            🏠 Reset View
          </button>
        </div>

        {/* Wildlife Statistics */}
        <div className="glassmorphism p-4 rounded-xl">
          <h4 className="text-md font-semibold text-bio-green mb-2">Wildlife Stats</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-misty-white/60">Tigers:</span>
              <span className="text-tiger-orange font-bold">71</span>
            </div>
            <div className="flex justify-between">
              <span className="text-misty-white/60">Elephants:</span>
              <span className="text-neural-purple font-bold">156</span>
            </div>
            <div className="flex justify-between">
              <span className="text-misty-white/60">Protected Areas:</span>
              <span className="text-electric-cyan font-bold">3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Marker Info */}
      {selectedMarker && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 md:right-auto md:w-80 z-10"
        >
          <div className="glassmorphism p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-orbitron font-bold text-electric-cyan">
                Wildlife Details
              </h3>
              <button
                onClick={() => setSelectedMarker(null)}
                className="text-misty-white hover:text-electric-cyan text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">
                  {selectedMarker.species === 'tiger' ? '🐅' :
                   selectedMarker.species === 'elephant' ? '🐘' :
                   selectedMarker.species === 'leopard' ? '🐆' :
                   selectedMarker.species === 'deer' ? '🦌' :
                   selectedMarker.species === 'bird' ? '🐦' : '🐾'}
                </span>
                <div>
                  <div className="font-semibold text-misty-white capitalize text-lg">
                    {selectedMarker.species}
                  </div>
                  <div className="text-misty-white/60 text-sm">
                    {selectedMarker.data.location}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-misty-white/60">Population:</span>
                  <div className="text-bio-green font-bold text-lg">{selectedMarker.data.population}</div>
                </div>
                <div>
                  <span className="text-misty-white/60">Health Status:</span>
                  <div className={`font-bold text-lg ${
                    selectedMarker.data.health === 'Excellent' ? 'text-green-400' :
                    selectedMarker.data.health === 'Good' ? 'text-yellow-400' : 'text-orange-400'
                  }`}>
                    {selectedMarker.data.health}
                  </div>
                </div>
              </div>
              
              <div>
                <span className="text-misty-white/60 text-sm">Last Sighting:</span>
                <div className="text-electric-cyan font-mono">{selectedMarker.data.lastSeen}</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 3D Scene */}
      <Canvas
        camera={{ position: [5, 8, 5], fov: 60 }}
        style={{ background: 'linear-gradient(to bottom, #1e3a8a, #2D5016)' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          color="#FFE5B4"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="#00D4FF" />
        
        {/* 3D Terrain */}
        <Terrain />
        
        {/* Conservation Zones */}
        {conservationZones.map((zone, index) => (
          <ConservationZone key={index} {...zone} />
        ))}
        
        {/* Wildlife Markers */}
        {wildlifeData.map((marker) => (
          <WildlifeMarker
            key={marker.id}
            position={marker.position}
            species={marker.species}
            data={marker.data}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}
        
        {/* Camera Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={!selectedLocation}
          autoRotateSpeed={0.5}
          maxDistance={15}
          minDistance={3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 6}
        />
        
        <CameraController selectedLocation={selectedLocation} />
      </Canvas>
    </div>
  );
};

export default Interactive3DMap;
