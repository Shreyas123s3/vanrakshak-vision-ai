
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const EnhancedDayNightCycle = () => {
  const [timeOfDay, setTimeOfDay] = useState<'dawn' | 'day' | 'dusk' | 'night'>('day');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update based on real time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now);
      const hour = now.getHours();
      
      if (hour >= 5 && hour < 8) {
        setTimeOfDay('dawn');
      } else if (hour >= 8 && hour < 17) {
        setTimeOfDay('day');
      } else if (hour >= 17 && hour < 20) {
        setTimeOfDay('dusk');
      } else {
        setTimeOfDay('night');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getBackgroundGradient = () => {
    switch (timeOfDay) {
      case 'dawn':
        return 'linear-gradient(to bottom, #FF6B35 0%, #FF8C69 20%, #FFE4B5 40%, rgba(11, 20, 38, 0.3) 100%)';
      case 'day':
        return 'linear-gradient(to bottom, #87CEEB 0%, #98D8E8 30%, rgba(240, 248, 255, 0.1) 60%, rgba(11, 20, 38, 0.2) 100%)';
      case 'dusk':
        return 'linear-gradient(to bottom, #8B5FFF 0%, #FF6B35 25%, #FF8C69 50%, rgba(11, 20, 38, 0.4) 100%)';
      case 'night':
        return 'linear-gradient(to bottom, #0B1426 0%, #1a2332 40%, #0B1426 100%)';
      default:
        return 'linear-gradient(to bottom, #0B1426 0%, #1a2332 50%, #0B1426 100%)';
    }
  };

  const getSunMoonPosition = () => {
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const totalMinutes = hour * 60 + minute;
    
    // Sun rises at 6 AM (360 minutes) and sets at 6 PM (1080 minutes)
    // Moon is visible from 8 PM to 5 AM
    if (hour >= 6 && hour < 18) {
      // Daytime - show sun
      const dayProgress = (totalMinutes - 360) / (1080 - 360); // 0 to 1
      const sunAngle = dayProgress * Math.PI; // 0 to π
      return {
        type: 'sun',
        x: 50 + Math.cos(sunAngle + Math.PI) * 30,
        y: 20 + Math.sin(sunAngle) * 20,
      };
    } else {
      // Nighttime - show moon
      const nightStart = hour >= 18 ? hour : hour + 24;
      const nightProgress = ((nightStart * 60 + minute) - 1080) / (1440 - 1080 + 300); // 6 PM to 5 AM
      const moonAngle = nightProgress * Math.PI;
      return {
        type: 'moon',
        x: 50 + Math.cos(moonAngle + Math.PI) * 35,
        y: 15 + Math.sin(moonAngle) * 25,
      };
    }
  };

  const celestialBody = getSunMoonPosition();

  return (
    <div className="fixed inset-0 pointer-events-none z-1">
      {/* Dynamic Sky Background */}
      <motion.div
        className="absolute inset-0"
        style={{ background: getBackgroundGradient() }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      {/* Sun/Moon */}
      <motion.div
        className="absolute w-16 h-16 rounded-full"
        style={{
          left: `${celestialBody.x}%`,
          top: `${celestialBody.y}%`,
          background: celestialBody.type === 'sun' 
            ? 'radial-gradient(circle, #FFD700 20%, #FFA500 70%, transparent 100%)'
            : 'radial-gradient(circle, #F5F5DC 30%, #C0C0C0 80%, transparent 100%)',
          boxShadow: celestialBody.type === 'sun'
            ? '0 0 40px rgba(255, 215, 0, 0.6)'
            : '0 0 30px rgba(245, 245, 220, 0.4)',
        }}
        animate={{
          scale: celestialBody.type === 'sun' ? [1, 1.1, 1] : [1, 1.05, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: celestialBody.type === 'sun' ? 4 : 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Stars (only at night) */}
      {timeOfDay === 'night' && (
        <div className="absolute inset-0">
          {Array.from({ length: 30 }, (_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      )}

      {/* Clouds with dynamic colors */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute opacity-30"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 2) * 15}%`,
            }}
            animate={{
              x: [0, 100, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 60 + i * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg width="80" height="40" viewBox="0 0 100 60">
              <path
                d="M20,40 Q10,25 25,25 Q30,10 50,15 Q70,5 75,20 Q90,15 85,35 Q90,50 75,45 Q50,55 25,50 Q10,55 20,40"
                fill={
                  timeOfDay === 'dawn' ? 'rgba(255, 140, 105, 0.6)' :
                  timeOfDay === 'day' ? 'rgba(255, 255, 255, 0.7)' :
                  timeOfDay === 'dusk' ? 'rgba(139, 95, 255, 0.5)' :
                  'rgba(105, 105, 105, 0.4)'
                }
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Time of Day Indicator */}
      <div className="absolute top-4 right-20 z-10">
        <motion.div
          className="glassmorphism p-4 rounded-lg text-center"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="text-2xl mb-1">
            {timeOfDay === 'dawn' && '🌅'}
            {timeOfDay === 'day' && '☀️'}
            {timeOfDay === 'dusk' && '🌇'}
            {timeOfDay === 'night' && '🌙'}
          </div>
          <div className="text-sm text-misty-white font-orbitron">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-xs text-misty-white/70 capitalize mt-1">
            {timeOfDay}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedDayNightCycle;
