
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GlassmorphismEffects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const glassCards = [
    {
      id: 1,
      x: '10%',
      y: '20%',
      content: 'AI Wildlife Detection',
      color: 'from-electric-cyan/20 to-bio-green/20'
    },
    {
      id: 2,
      x: '70%',
      y: '15%',
      content: 'Real-time Monitoring',
      color: 'from-neural-purple/20 to-tiger-orange/20'
    },
    {
      id: 3,
      x: '20%',
      y: '70%',
      content: 'Forest Protection',
      color: 'from-bio-green/20 to-electric-cyan/20'
    },
    {
      id: 4,
      x: '80%',
      y: '60%',
      content: 'Community Alerts',
      color: 'from-tiger-orange/20 to-neural-purple/20'
    }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {/* Floating Glass Cards */}
      {glassCards.map((card) => (
        <motion.div
          key={card.id}
          className="absolute pointer-events-auto"
          style={{ left: card.x, top: card.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: card.id * 0.5, duration: 1 }}
          whileHover={{ scale: 1.1, z: 50 }}
        >
          <div className="premium-glass p-6 rounded-2xl max-w-xs backdrop-blur-xl">
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} rounded-2xl`}></div>
            <div className="relative z-10">
              <h3 className="text-sm font-orbitron font-bold text-misty-white mb-2">
                {card.content}
              </h3>
              <div className="w-full h-1 bg-gradient-to-r from-electric-cyan to-bio-green rounded opacity-60"></div>
            </div>
            
            {/* Glass reflection effect */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-2xl"></div>
          </div>
        </motion.div>
      ))}

      {/* Dynamic Glass Navigation Overlay */}
      <motion.div
        className="absolute top-4 left-1/2 transform -translate-x-1/2 premium-glass p-4 rounded-full backdrop-blur-2xl"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="flex space-x-4">
          {['AI', 'Tech', 'Impact'].map((item, index) => (
            <motion.button
              key={item}
              className="px-4 py-2 rounded-full text-misty-white font-semibold relative overflow-hidden group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/20 to-bio-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">{item}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Frosted Glass Status Panels */}
      <div className="absolute bottom-8 right-8 space-y-4">
        {[
          { label: 'Wildlife Detected', value: '247' },
          { label: 'Areas Protected', value: '89' },
          { label: 'Communities Active', value: '156' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="premium-glass p-4 rounded-xl backdrop-blur-xl min-w-[200px]"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 2 + index * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05, x: -10 }}
          >
            <div className="text-electric-cyan font-orbitron font-bold text-2xl">
              {stat.value}
            </div>
            <div className="text-misty-white/80 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GlassmorphismEffects;
