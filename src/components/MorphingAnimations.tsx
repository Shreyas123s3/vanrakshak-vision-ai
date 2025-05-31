
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MorphingAnimations = () => {
  const [currentShape, setCurrentShape] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(0);

  const shapes = [
    'circle',
    'hexagon',
    'triangle',
    'square'
  ];

  const wildlifeIcons = [
    { 
      path: 'M10,5 Q15,8 20,5 Q25,10 20,15 Q15,12 10,15 Q5,10 10,5', 
      name: 'Tiger' 
    },
    { 
      path: 'M5,15 Q10,5 15,10 Q20,8 25,12 Q20,20 15,18 Q10,25 5,15', 
      name: 'Elephant' 
    },
    { 
      path: 'M12,8 Q8,12 12,16 Q16,12 12,8 M8,10 Q12,6 16,10', 
      name: 'Bird' 
    },
    { 
      path: 'M10,10 Q15,5 20,10 Q15,15 10,10 M12,8 L18,8 M12,12 L18,12', 
      name: 'Leopard' 
    }
  ];

  useEffect(() => {
    const shapeInterval = setInterval(() => {
      setCurrentShape((prev) => (prev + 1) % shapes.length);
    }, 3000);

    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % wildlifeIcons.length);
    }, 4000);

    return () => {
      clearInterval(shapeInterval);
      clearInterval(iconInterval);
    };
  }, []);

  const getShapePath = (shape: string) => {
    switch (shape) {
      case 'circle':
        return 'M50,20 A30,30 0 1,1 50,80 A30,30 0 1,1 50,20';
      case 'hexagon':
        return 'M50,20 L70,35 L70,65 L50,80 L30,65 L30,35 Z';
      case 'triangle':
        return 'M50,20 L80,70 L20,70 Z';
      case 'square':
        return 'M25,25 L75,25 L75,75 L25,75 Z';
      default:
        return 'M50,20 A30,30 0 1,1 50,80 A30,30 0 1,1 50,20';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Morphing Logo */}
      <motion.div
        className="absolute top-8 left-8"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          className="text-electric-cyan"
        >
          <motion.path
            d={getShapePath(shapes[currentShape])}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          {/* Circuit pattern overlay */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: currentShape % 2 === 0 ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <line x1="30" y1="40" x2="70" y2="40" stroke="currentColor" strokeWidth="1" />
            <line x1="30" y1="60" x2="70" y2="60" stroke="currentColor" strokeWidth="1" />
            <circle cx="35" cy="40" r="2" fill="currentColor" />
            <circle cx="65" cy="60" r="2" fill="currentColor" />
          </motion.g>
        </motion.svg>
      </motion.div>

      {/* Morphing Action Buttons */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-6">
        {['Demo', 'Tech', 'Impact'].map((label, index) => (
          <motion.button
            key={label}
            className="relative pointer-events-auto overflow-hidden rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-16 h-16 border-2 border-electric-cyan flex items-center justify-center text-electric-cyan font-bold"
              animate={{
                borderRadius: [
                  '50%', // circle
                  '25%', // rounded square
                  '0%',  // square
                  '25%', // rounded square
                  '50%'  // circle
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.5
              }}
            >
              <span className="text-sm">{label}</span>
            </motion.div>
            
            {/* Morphing background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-electric-cyan/20 to-bio-green/20"
              animate={{
                borderRadius: [
                  '50%',
                  '25%',
                  '0%',
                  '25%',
                  '50%'
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.5
              }}
            />
          </motion.button>
        ))}
      </div>

      {/* Morphing Wildlife Icons */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIcon}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
            transition={{ duration: 1, ease: "backOut" }}
            className="relative"
          >
            <svg width="60" height="60" viewBox="0 0 30 30" className="text-bio-green">
              <motion.path
                d={wildlifeIcons[currentIcon].path}
                fill="currentColor"
                stroke="rgba(57, 255, 106, 0.5)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            
            <motion.div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-misty-white font-semibold"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {wildlifeIcons[currentIcon].name}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Liquid Text Transition */}
      <motion.div
        className="absolute top-1/3 left-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="text-2xl font-orbitron font-bold text-misty-white liquid-text">
          VANRAKSHAK
        </div>
      </motion.div>
    </div>
  );
};

export default MorphingAnimations;
