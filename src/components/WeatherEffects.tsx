
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const WeatherEffects = () => {
  const [currentWeather, setCurrentWeather] = useState<'clear' | 'rain' | 'mist'>('clear');

  useEffect(() => {
    // Cycle through weather every 20 seconds
    const weatherCycle = setInterval(() => {
      setCurrentWeather(prev => {
        const weather = ['clear', 'rain', 'mist'] as const;
        const currentIndex = weather.indexOf(prev);
        return weather[(currentIndex + 1) % weather.length];
      });
    }, 20000);

    return () => clearInterval(weatherCycle);
  }, []);

  const rainDrops = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 1 + Math.random() * 0.5,
  }));

  const sunRays = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: (i * 45) - 22.5,
    opacity: 0.1 + Math.random() * 0.1,
    delay: i * 0.2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-2">
      {/* Gentle Rain */}
      {currentWeather === 'rain' && (
        <div className="absolute inset-0">
          {rainDrops.map((drop) => (
            <motion.div
              key={`rain-${drop.id}`}
              className="absolute w-0.5 h-8 bg-gradient-to-b from-transparent via-electric-cyan/30 to-transparent"
              style={{ left: `${drop.left}%` }}
              initial={{ y: -100, opacity: 0 }}
              animate={{
                y: window.innerHeight + 100,
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: drop.duration,
                delay: drop.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* Sunlight Rays */}
      {currentWeather === 'clear' && (
        <div className="absolute inset-0 overflow-hidden">
          {sunRays.map((ray) => (
            <motion.div
              key={`ray-${ray.id}`}
              className="absolute top-0 left-1/2 origin-top"
              style={{
                transform: `translateX(-50%) rotate(${ray.angle}deg)`,
                width: '2px',
                height: '40vh',
                background: `linear-gradient(to bottom, rgba(255, 215, 0, ${ray.opacity}) 0%, transparent 70%)`,
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{
                opacity: [0, ray.opacity, 0],
                scaleY: [0, 1, 0],
              }}
              transition={{
                duration: 6,
                delay: ray.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Morning Mist */}
      {currentWeather === 'mist' && (
        <div className="absolute inset-0">
          {Array.from({ length: 12 }, (_, i) => (
            <motion.div
              key={`mist-${i}`}
              className="absolute rounded-full bg-gradient-radial from-misty-white/10 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${60 + Math.random() * 30}%`,
                width: `${100 + Math.random() * 200}px`,
                height: `${50 + Math.random() * 100}px`,
              }}
              animate={{
                x: [0, 50, 0],
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      )}

      {/* Weather Indicator */}
      <div className="absolute top-20 left-4 z-10">
        <motion.div
          className="glassmorphism p-3 rounded-lg text-misty-white text-sm"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="flex items-center space-x-2">
            <span>
              {currentWeather === 'clear' && '☀️'}
              {currentWeather === 'rain' && '🌧️'}
              {currentWeather === 'mist' && '🌫️'}
            </span>
            <span className="capitalize">{currentWeather}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WeatherEffects;
