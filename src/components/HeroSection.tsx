
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import EnhancedWildlife3D from './EnhancedWildlife3D';

const HeroSection = () => {
  const [currentText, setCurrentText] = useState(0);
  const heroTexts = [
    "Protecting India's Wildlife with Artificial Intelligence",
    "7% of World's Fauna Under AI Guardian",
    "Bridging 30% Forest Staff Deficit with Technology",
    "Real-Time Poaching Prevention Systems"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scrollToDemo = () => {
    document.getElementById('ai-demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTechnology = () => {
    document.getElementById('technology')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 2, 8], fov: 75 }}>
          <Environment preset="forest" />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#00D4FF" />
          <pointLight position={[-10, 5, -5]} intensity={0.8} color="#39FF6A" />
          <pointLight position={[0, -5, 5]} intensity={0.6} color="#8B5FFF" />
          
          <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
            <EnhancedWildlife3D />
          </Float>
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </div>

      {/* Dynamic overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-navy/60 via-transparent to-forest-navy/80 z-1"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-bio-green to-neural-purple mb-6 hero-gradient-text">
            VanRakshak AI
          </h1>
          
          <motion.div
            className="h-20 flex items-center justify-center"
            key={currentText}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-2xl md:text-4xl font-inter font-light text-misty-white subtle-text-glow">
              {heroTexts[currentText]}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            className="cyber-border holographic px-8 py-4 rounded-xl text-xl font-semibold text-electric-cyan hover:text-forest-navy hover:bg-electric-cyan transition-all duration-500 elegant-hover-glow"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToDemo}
          >
            Experience AI Demo
          </motion.button>
          
          <motion.button
            className="glassmorphism px-8 py-4 rounded-xl text-xl font-semibold text-bio-green border-2 border-bio-green hover:bg-bio-green hover:text-forest-navy transition-all duration-500"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTechnology}
          >
            View Technology
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex justify-center space-x-12 text-misty-white/60"
        >
          <div className="text-center">
            <div className="text-3xl font-orbitron font-bold text-electric-cyan">7%</div>
            <div className="text-sm">World's Fauna</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-orbitron font-bold text-bio-green">30%</div>
            <div className="text-sm">Staff Deficit</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-orbitron font-bold text-neural-purple">24/7</div>
            <div className="text-sm">AI Monitoring</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-electric-cyan"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-electric-cyan rounded-full flex justify-center">
          <div className="w-1 h-3 bg-electric-cyan rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
