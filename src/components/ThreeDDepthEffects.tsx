
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ThreeDDepthEffects = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const layers = [
    { depth: 1, speed: 0.1, color: 'electric-cyan' },
    { depth: 2, speed: 0.2, color: 'bio-green' },
    { depth: 3, speed: 0.3, color: 'neural-purple' },
    { depth: 4, speed: 0.4, color: 'tiger-orange' }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden perspective-1000">
      {/* 3D Layered Background Elements */}
      {layers.map((layer, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 preserve-3d"
          style={{
            transform: `
              translateZ(${layer.depth * -100}px)
              translateY(${scrollY * layer.speed}px)
              rotateX(${mousePosition.y * 2}deg)
              rotateY(${mousePosition.x * 2}deg)
            `
          }}
        >
          {/* Floating 3D Cards */}
          {[...Array(6)].map((_, cardIndex) => (
            <motion.div
              key={cardIndex}
              className={`absolute w-32 h-20 bg-${layer.color}/10 backdrop-blur-sm rounded-lg floating-card-shadow`}
              style={{
                left: `${20 + cardIndex * 15}%`,
                top: `${10 + index * 20}%`,
                transform: `
                  translateZ(${layer.depth * 50}px)
                  rotateX(${15 + cardIndex * 10}deg)
                  rotateY(${cardIndex * 20}deg)
                `
              }}
              animate={{
                y: [0, -20, 0],
                rotateZ: [0, 5, -5, 0]
              }}
              transition={{
                duration: 4 + cardIndex,
                repeat: Infinity,
                delay: cardIndex * 0.5
              }}
              whileHover={{
                scale: 1.2,
                translateZ: 100,
                transition: { duration: 0.3 }
              }}
            >
              <div className={`w-full h-full border border-${layer.color}/30 rounded-lg relative overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br from-${layer.color}/20 to-transparent`}></div>
                <div className="absolute top-2 left-2 w-2 h-2 bg-current rounded-full opacity-60"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ))}

      {/* 3D Perspective Grid */}
      <div 
        className="absolute inset-0 preserve-3d"
        style={{
          transform: `
            perspective(1000px)
            rotateX(${mousePosition.y * 5}deg)
            rotateY(${mousePosition.x * 5}deg)
          `
        }}
      >
        <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid opacity-20 transform rotateX(80deg) translateZ(-200px)"></div>
      </div>

      {/* Floating 3D Navigation Elements */}
      <motion.div
        className="absolute top-1/2 left-4 transform -translate-y-1/2 preserve-3d"
        style={{
          transform: `
            translateZ(50px)
            rotateY(${mousePosition.x * 10}deg)
          `
        }}
      >
        {['AI', 'Wildlife', 'Protection'].map((item, index) => (
          <motion.div
            key={item}
            className="relative mb-8 group cursor-pointer pointer-events-auto"
            whileHover={{ 
              scale: 1.1,
              translateZ: 50,
              rotateY: 15
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div 
              className="w-16 h-16 bg-gradient-to-br from-electric-cyan/20 to-bio-green/20 rounded-xl backdrop-blur-xl floating-element-shadow flex items-center justify-center preserve-3d"
              style={{
                transform: `translateZ(${index * 20}px) rotateY(${index * 15}deg)`
              }}
            >
              <span className="text-sm font-bold text-misty-white transform translateZ(10px)">
                {item}
              </span>
            </div>
            
            {/* 3D Shadow/Reflection */}
            <div 
              className="absolute top-0 left-0 w-full h-full bg-black/20 rounded-xl blur-sm"
              style={{
                transform: `translateY(20px) translateZ(-10px) rotateX(90deg) scale(0.8)`
              }}
            ></div>
          </motion.div>
        ))}
      </motion.div>

      {/* 3D Status Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 preserve-3d">
        <div className="flex space-x-8">
          {[
            { label: 'Active', count: '24/7' },
            { label: 'Protected', count: '89K' },
            { label: 'Detected', count: '247' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative preserve-3d pointer-events-auto"
              style={{
                transform: `translateZ(${index * 30}px) rotateX(10deg)`
              }}
              whileHover={{
                translateZ: 80,
                rotateX: -10,
                scale: 1.1
              }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="bg-gradient-to-t from-forest-navy/80 to-electric-cyan/20 backdrop-blur-xl rounded-lg p-4 floating-element-shadow">
                <div className="text-2xl font-orbitron font-bold text-electric-cyan transform translateZ(10px)">
                  {stat.count}
                </div>
                <div className="text-sm text-misty-white/80 transform translateZ(5px)">
                  {stat.label}
                </div>
              </div>
              
              {/* 3D base/shadow */}
              <div 
                className="absolute inset-0 bg-black/30 rounded-lg blur-md"
                style={{
                  transform: `translateY(10px) translateZ(-20px) scale(0.9)`
                }}
              ></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreeDDepthEffects;
