
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ParallaxForest = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate parallax offsets
  const backgroundOffset = scrollY * 0.1;
  const midgroundOffset = scrollY * 0.3;
  const foregroundOffset = scrollY * 0.5;
  
  // Mouse parallax effect (subtle)
  const mouseOffsetX = (mousePos.x - window.innerWidth / 2) * 0.01;
  const mouseOffsetY = (mousePos.y - window.innerHeight / 2) * 0.01;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Mountains/Hills */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          transform: `translateY(${backgroundOffset + mouseOffsetY}px) translateX(${mouseOffsetX}px)`,
        }}
      >
        <svg
          className="absolute bottom-0 w-full h-96"
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#1a2332', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#0B1426', stopOpacity: 0.9 }} />
            </linearGradient>
          </defs>
          <path
            d="M0,400 L0,200 Q200,150 400,180 Q600,120 800,160 Q1000,100 1200,140 L1200,400 Z"
            fill="url(#mountainGradient)"
          />
        </svg>
      </motion.div>

      {/* Midground Trees */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          transform: `translateY(${midgroundOffset + mouseOffsetY * 0.5}px) translateX(${mouseOffsetX * 0.5}px)`,
        }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`midtree-${i}`}
            className="absolute bottom-0"
            style={{
              left: `${i * 15 + 5}%`,
              height: `${200 + Math.sin(i) * 50}px`,
            }}
            animate={{
              transform: `rotate(${Math.sin(Date.now() * 0.001 + i) * 2}deg)`,
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Tree trunk */}
            <div
              className="absolute bottom-0 bg-gradient-to-t from-amber-900 to-amber-700"
              style={{
                width: '8px',
                height: '60%',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />
            {/* Tree canopy */}
            <div
              className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-green-800 to-green-900 rounded-full"
              style={{
                width: `${40 + Math.sin(i) * 20}px`,
                height: `${60 + Math.sin(i) * 30}px`,
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Foreground Trees */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          transform: `translateY(${foregroundOffset + mouseOffsetY * 0.3}px) translateX(${mouseOffsetX * 0.3}px)`,
        }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`foretree-${i}`}
            className="absolute bottom-0"
            style={{
              left: `${i * 25 + 10}%`,
              height: `${300 + Math.sin(i + 1) * 80}px`,
            }}
            animate={{
              transform: `rotate(${Math.sin(Date.now() * 0.0015 + i) * 3}deg)`,
            }}
            transition={{
              duration: 6 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Tree trunk */}
            <div
              className="absolute bottom-0 bg-gradient-to-t from-amber-800 to-amber-600"
              style={{
                width: '12px',
                height: '50%',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />
            {/* Tree canopy */}
            <div
              className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-green-700 to-green-800 rounded-full"
              style={{
                width: `${60 + Math.sin(i + 1) * 30}px`,
                height: `${80 + Math.sin(i + 1) * 40}px`,
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ParallaxForest;
