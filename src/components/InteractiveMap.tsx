
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

const InteractiveMap = () => {
  const [selectedSanctuary, setSelectedSanctuary] = useState<any>(null);
  const mapRef = useRef<THREE.Group>(null);

  const sanctuaries = [
    {
      name: 'Sundarbans National Park',
      position: [2, 0, 1],
      species: 'Bengal Tiger',
      threat: 'Medium',
      cameras: 45,
      area: '1,330 km²',
      color: '#FF6B35'
    },
    {
      name: 'Kaziranga National Park',
      position: [-1, 0.5, 0],
      species: 'One-horned Rhinoceros',
      threat: 'High',
      cameras: 32,
      area: '860 km²',
      color: '#8B5FFF'
    },
    {
      name: 'Hemis National Park',
      position: [0, 1, -2],
      species: 'Snow Leopard',
      threat: 'Low',
      cameras: 18,
      area: '4,400 km²',
      color: '#39FF6A'
    },
    {
      name: 'Bandhavgarh National Park',
      position: [-2, -0.5, 1],
      species: 'Bengal Tiger',
      threat: 'Medium',
      cameras: 28,
      area: '448 km²',
      color: '#00D4FF'
    }
  ];

  const MapVisualization = () => {
    return (
      <group ref={mapRef}>
        {/* India outline (simplified) */}
        <mesh position={[0, 0, -1]}>
          <planeGeometry args={[6, 4]} />
          <meshStandardMaterial 
            color="#0B1426" 
            transparent 
            opacity={0.3}
            wireframe
          />
        </mesh>

        {/* Sanctuary markers */}
        {sanctuaries.map((sanctuary, index) => (
          <group key={index} position={sanctuary.position}>
            {/* Pulsing marker */}
            <mesh
              onClick={() => setSelectedSanctuary(sanctuary)}
              onPointerEnter={() => document.body.style.cursor = 'pointer'}
              onPointerLeave={() => document.body.style.cursor = 'default'}
            >
              <sphereGeometry args={[0.1]} />
              <meshStandardMaterial 
                color={sanctuary.color}
                emissive={sanctuary.color}
                emissiveIntensity={0.5}
              />
            </mesh>

            {/* Ripple effect */}
            <mesh>
              <ringGeometry args={[0.2, 0.3]} />
              <meshStandardMaterial 
                color={sanctuary.color}
                transparent
                opacity={0.3}
              />
            </mesh>

            {/* Floating text */}
            <Text
              position={[0, 0.3, 0]}
              fontSize={0.1}
              color={sanctuary.color}
              anchorX="center"
              anchorY="middle"
            >
              {sanctuary.name.split(' ')[0]}
            </Text>
          </group>
        ))}

        {/* Connection lines between sanctuaries */}
        {sanctuaries.map((sanctuary, index) => {
          if (index === 0) return null;
          const prevSanctuary = sanctuaries[index - 1];
          
          return (
            <line key={`line-${index}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([
                    ...prevSanctuary.position,
                    ...sanctuary.position
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#00D4FF" transparent opacity={0.3} />
            </line>
          );
        })}
      </group>
    );
  };

  return (
    <div className="holographic p-8 rounded-2xl">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-orbitron font-bold text-electric-cyan mb-4">
          3D Conservation Network Map
        </h3>
        <p className="text-lg text-misty-white">
          Interactive visualization of India's protected wildlife sanctuaries
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: 3D Map */}
        <div className="h-96 glassmorphism rounded-xl overflow-hidden">
          <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[5, 5, 5]} intensity={1} color="#00D4FF" />
            <pointLight position={[-5, -5, -5]} intensity={0.5} color="#39FF6A" />
            
            <MapVisualization />
            
            <OrbitControls 
              enableZoom={true} 
              enablePan={true} 
              autoRotate={!selectedSanctuary}
              autoRotateSpeed={1}
            />
          </Canvas>
        </div>

        {/* Right: Sanctuary Details */}
        <div className="space-y-6">
          {selectedSanctuary ? (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="glassmorphism p-6 rounded-xl"
            >
              <h4 className="text-2xl font-orbitron font-bold text-electric-cyan mb-4">
                {selectedSanctuary.name}
              </h4>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-bio-green font-semibold">Primary Species:</span>
                  <span className="text-misty-white">{selectedSanctuary.species}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-bio-green font-semibold">Area:</span>
                  <span className="text-misty-white font-mono">{selectedSanctuary.area}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-bio-green font-semibold">AI Cameras:</span>
                  <span className="text-neural-purple font-mono">{selectedSanctuary.cameras}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-bio-green font-semibold">Threat Level:</span>
                  <span className={`font-bold ${
                    selectedSanctuary.threat === 'High' ? 'text-red-500' :
                    selectedSanctuary.threat === 'Medium' ? 'text-yellow-500' :
                    'text-green-500'
                  }`}>
                    {selectedSanctuary.threat}
                  </span>
                </div>
              </div>

              {/* Live Status Indicators */}
              <div className="mt-6 pt-4 border-t border-electric-cyan/20">
                <h5 className="text-lg font-semibold text-neural-purple mb-3">Live Status</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-orbitron font-bold text-bio-green">
                      {Math.floor(Math.random() * 20) + 10}
                    </div>
                    <div className="text-xs text-misty-white/60">Animals Detected</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-orbitron font-bold text-electric-cyan">
                      {Math.floor(Math.random() * 5) + 1}
                    </div>
                    <div className="text-xs text-misty-white/60">Active Alerts</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="glassmorphism p-6 rounded-xl text-center">
              <div className="text-6xl text-electric-cyan mb-4">🗺️</div>
              <p className="text-lg text-misty-white">
                Click on a sanctuary marker to view details
              </p>
            </div>
          )}

          {/* Network Statistics */}
          <div className="glassmorphism p-6 rounded-xl">
            <h4 className="text-xl font-orbitron font-bold text-tiger-orange mb-4">
              Network Overview
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-orbitron font-bold text-bio-green">123</div>
                <div className="text-sm text-misty-white/80">Total Cameras</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-orbitron font-bold text-electric-cyan">4</div>
                <div className="text-sm text-misty-white/80">Protected Areas</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-orbitron font-bold text-neural-purple">98%</div>
                <div className="text-sm text-misty-white/80">System Uptime</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-orbitron font-bold text-tiger-orange">24/7</div>
                <div className="text-sm text-misty-white/80">Monitoring</div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glassmorphism p-6 rounded-xl">
            <h4 className="text-xl font-orbitron font-bold text-bio-green mb-4">
              Recent Activity
            </h4>
            
            <div className="space-y-3">
              {[
                { time: '2m ago', event: 'Tiger detected in Sundarbans', type: 'detection' },
                { time: '15m ago', event: 'Camera 23 maintenance completed', type: 'system' },
                { time: '1h ago', event: 'Rhino family spotted in Kaziranga', type: 'detection' },
                { time: '3h ago', event: 'Poaching alert resolved', type: 'alert' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'detection' ? 'bg-bio-green' :
                      activity.type === 'alert' ? 'bg-tiger-orange' :
                      'bg-electric-cyan'
                    } animate-pulse`} />
                    <span className="text-misty-white">{activity.event}</span>
                  </div>
                  <span className="text-misty-white/60">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
