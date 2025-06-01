
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const InteractiveWildlife = () => {
  const [birdsFlyingAway, setBirdsFlyingAway] = useState(false);
  const [deerAlert, setDeerAlert] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Birds fly away when cursor is near them
    if (x > 20 && x < 80 && y > 10 && y < 40) {
      setBirdsFlyingAway(true);
      setTimeout(() => setBirdsFlyingAway(false), 3000);
    }
    
    // Deer becomes alert when cursor approaches
    if (x > 60 && x < 90 && y > 60 && y < 80) {
      setDeerAlert(true);
      setTimeout(() => setDeerAlert(false), 2000);
    }
  };

  const birds = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    initialX: 30 + i * 8,
    initialY: 20 + (i % 2) * 5,
  }));

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-3"
      onMouseMove={handleMouseMove}
      style={{ pointerEvents: 'auto' }}
    >
      {/* Flying Birds */}
      <div className="absolute inset-0">
        {birds.map((bird) => (
          <motion.div
            key={`bird-${bird.id}`}
            className="absolute text-2xl"
            initial={{ x: `${bird.initialX}vw`, y: `${bird.initialY}vh` }}
            animate={birdsFlyingAway ? {
              x: `${bird.initialX + 150}vw`,
              y: `${bird.initialY - 50}vh`,
              scale: [1, 1.2, 0.8],
            } : {
              x: [`${bird.initialX}vw`, `${bird.initialX + 10}vw`, `${bird.initialX}vw`],
              y: [`${bird.initialY}vh`, `${bird.initialY - 3}vh`, `${bird.initialY}vh`],
            }}
            transition={{
              duration: birdsFlyingAway ? 2 : 4 + bird.id * 0.5,
              repeat: birdsFlyingAway ? 0 : Infinity,
              ease: birdsFlyingAway ? "easeOut" : "easeInOut",
            }}
          >
            🐦
          </motion.div>
        ))}
      </div>

      {/* Grazing Deer */}
      <motion.div
        className="absolute bottom-20 right-20 text-4xl"
        animate={deerAlert ? {
          rotateY: [0, 90, 0],
          scale: [1, 1.1, 1],
        } : {
          y: [0, -5, 0],
        }}
        transition={{
          duration: deerAlert ? 1 : 3,
          repeat: deerAlert ? 1 : Infinity,
          ease: "easeInOut",
        }}
      >
        🦌
      </motion.div>

      {/* Butterflies */}
      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={`butterfly-${i}`}
          className="absolute text-xl"
          style={{
            left: `${20 + i * 30}%`,
            top: `${40 + i * 10}%`,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 15, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        >
          🦋
        </motion.div>
      ))}

      {/* Rabbits */}
      <motion.div
        className="absolute bottom-32 left-1/4 text-2xl"
        animate={{
          x: [0, 20, 0],
          scaleX: [1, -1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🐰
      </motion.div>

      {/* Squirrel climbing */}
      <motion.div
        className="absolute left-16 text-xl"
        animate={{
          y: ["80vh", "60vh", "40vh", "60vh", "80vh"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🐿️
      </motion.div>
    </div>
  );
};

export default InteractiveWildlife;
