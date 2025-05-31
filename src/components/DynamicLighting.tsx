
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DynamicLighting = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [timeOfDay, setTimeOfDay] = useState(new Date().getHours());
  const [lightIntensity, setLightIntensity] = useState(1);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Update time every minute
    const timeInterval = setInterval(() => {
      setTimeOfDay(new Date().getHours());
    }, 60000);

    // Dynamic light intensity based on scroll
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setLightIntensity(0.5 + (Math.sin(scrollPercent * Math.PI) * 0.5));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timeInterval);
    };
  }, []);

  const getSunPosition = () => {
    const sunAngle = ((timeOfDay - 6) / 12) * 180; // 6am to 6pm = 0 to 180 degrees
    return {
      x: 50 + Math.cos((sunAngle * Math.PI) / 180) * 40,
      y: 80 - Math.sin((sunAngle * Math.PI) / 180) * 60
    };
  };

  const sunPos = getSunPosition();
  const isNight = timeOfDay < 6 || timeOfDay > 18;

  return (
    <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
      {/* Cursor Following Light */}
      <motion.div
        className="absolute w-96 h-96 pointer-events-none"
        style={{
          left: mousePosition.x + '%',
          top: mousePosition.y + '%',
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full bg-gradient-radial from-electric-cyan/30 via-electric-cyan/10 to-transparent rounded-full blur-2xl"></div>
      </motion.div>

      {/* Dynamic Sun/Moon Light Source */}
      <motion.div
        className="absolute w-64 h-64"
        style={{
          left: sunPos.x + '%',
          top: sunPos.y + '%',
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          opacity: [lightIntensity * 0.8, lightIntensity, lightIntensity * 0.8]
        }}
        transition={{
          duration: 4,
          repeat: Infinity
        }}
      >
        <div className={`w-full h-full bg-gradient-radial ${
          isNight 
            ? 'from-neural-purple/40 via-neural-purple/20 to-transparent' 
            : 'from-tiger-orange/50 via-tiger-orange/25 to-transparent'
        } rounded-full blur-3xl`}></div>
      </motion.div>

      {/* Interactive Element Glows */}
      <div className="absolute inset-0">
        {/* Navigation glow */}
        <div 
          className="absolute top-4 left-1/2 transform -translate-x-1/2 w-96 h-16 bg-gradient-to-r from-transparent via-electric-cyan/20 to-transparent blur-xl"
          style={{
            opacity: Math.max(0.3, 1 - Math.abs(mousePosition.y - 10) / 50)
          }}
        ></div>

        {/* Hero section ambient glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-bio-green/20 via-electric-cyan/10 to-transparent blur-3xl"></div>

        {/* Bottom navigation glow */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[600px] h-20 bg-gradient-to-r from-transparent via-bio-green/20 to-transparent blur-xl"
          style={{
            opacity: Math.max(0.3, 1 - Math.abs(mousePosition.y - 90) / 20)
          }}
        ></div>
      </div>

      {/* Bioluminescent Effects */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-4 h-4 rounded-full"
            style={{
              left: `${10 + index * 7}%`,
              top: `${20 + (index % 3) * 25}%`,
              background: `radial-gradient(circle, ${
                ['#00D4FF', '#39FF6A', '#8B5FFF'][index % 3]
              }80 0%, transparent 70%)`
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.5, 0.5],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 3 + (index % 3),
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Realistic Shadow Casting */}
      <div className="absolute inset-0">
        {/* Main content shadow */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/30 blur-lg"
          style={{
            transform: `rotate(${(sunPos.x - 50) * 0.5}deg) skewX(${(sunPos.y - 50) * 0.3}deg)`
          }}
        ></div>

        {/* Dynamic element shadows */}
        <div className="absolute top-1/4 left-1/4 w-32 h-8 bg-black/20 blur-md transform rotate-12 skew-x-12"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-6 bg-black/15 blur-md transform -rotate-6 skew-x-6"></div>
        <div className="absolute bottom-1/3 left-1/3 w-40 h-10 bg-black/25 blur-lg transform rotate-6 skew-x-3"></div>
      </div>

      {/* Glowing Interactive Outlines */}
      <div className="absolute inset-0">
        {/* Hover-triggered glows for interactive areas */}
        <div 
          className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-electric-cyan/0 to-electric-cyan/20 blur-sm"
          style={{
            opacity: mousePosition.y < 20 ? 0.8 : 0
          }}
        ></div>
        
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bio-green/0 to-bio-green/20 blur-sm"
          style={{
            opacity: mousePosition.y > 80 ? 0.8 : 0
          }}
        ></div>
        
        <div 
          className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-neural-purple/0 to-neural-purple/20 blur-sm"
          style={{
            opacity: mousePosition.x < 20 ? 0.8 : 0
          }}
        ></div>
        
        <div 
          className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-tiger-orange/0 to-tiger-orange/20 blur-sm"
          style={{
            opacity: mousePosition.x > 80 ? 0.8 : 0
          }}
        ></div>
      </div>
    </div>
  );
};

export default DynamicLighting;
