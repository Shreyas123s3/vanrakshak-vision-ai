
import { motion } from 'framer-motion';

const ParticleEffects = () => {
  const leaves = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    emoji: ['🍃', '🍂', '🌿'][Math.floor(Math.random() * 3)],
    size: 16 + Math.random() * 8,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 4,
    drift: 20 + Math.random() * 40,
  }));

  const pollen = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 2,
  }));

  const fireflies = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: 50 + Math.random() * 40,
    delay: Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-2">
      {/* Falling Leaves */}
      <div className="absolute inset-0 overflow-hidden">
        {leaves.map((leaf) => (
          <motion.div
            key={`leaf-${leaf.id}`}
            className="absolute"
            style={{
              fontSize: `${leaf.size}px`,
              left: `${leaf.left}%`,
            }}
            initial={{ y: -50, x: 0, rotate: 0 }}
            animate={{
              y: window.innerHeight + 50,
              x: [0, leaf.drift, -leaf.drift/2, leaf.drift/3, 0],
              rotate: [0, 180, 360, 180, 0],
            }}
            transition={{
              duration: leaf.duration,
              delay: leaf.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {leaf.emoji}
          </motion.div>
        ))}
      </div>

      {/* Floating Pollen */}
      <div className="absolute inset-0">
        {pollen.map((particle) => (
          <motion.div
            key={`pollen-${particle.id}`}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-60"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 10, -20, 0],
              x: [0, 15, -10, 20, 0],
              scale: [0.8, 1.2, 0.9, 1.1, 0.8],
              opacity: [0.4, 0.8, 0.6, 0.9, 0.4],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Fireflies (evening/night effect) */}
      <div className="absolute inset-0">
        {fireflies.map((firefly) => (
          <motion.div
            key={`firefly-${firefly.id}`}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${firefly.left}%`,
              top: `${firefly.top}%`,
              background: 'radial-gradient(circle, rgba(255,255,100,0.8) 0%, rgba(255,255,100,0.3) 40%, transparent 70%)',
              boxShadow: '0 0 8px rgba(255,255,100,0.6)',
            }}
            animate={{
              x: [0, 40, -30, 20, 0],
              y: [0, -25, 15, -10, 0],
              opacity: [0.3, 1, 0.5, 0.8, 0.3],
              scale: [0.8, 1.2, 1, 1.1, 0.8],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              delay: firefly.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Dandelion Seeds */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={`seed-${i}`}
          className="absolute text-sm opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${60 + Math.random() * 30}%`,
          }}
          initial={{ y: 0, x: 0, rotate: 0 }}
          animate={{
            y: -200,
            x: [0, 30, -20, 40, 0],
            rotate: [0, 360, 180, 270, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            delay: Math.random() * 3,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          🌬️
        </motion.div>
      ))}
    </div>
  );
};

export default ParticleEffects;
