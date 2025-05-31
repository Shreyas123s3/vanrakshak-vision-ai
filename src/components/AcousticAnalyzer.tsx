
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AcousticAnalyzer = () => {
  const [isListening, setIsListening] = useState(false);
  const [audioData, setAudioData] = useState<number[]>([]);
  const [detectedSounds, setDetectedSounds] = useState<any[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const soundTypes = [
    { type: 'Tiger Roar', frequency: '50-100 Hz', threat: 'Low', color: '#FF6B35' },
    { type: 'Elephant Call', frequency: '10-30 Hz', threat: 'Low', color: '#8B5FFF' },
    { type: 'Gunshot', frequency: '500-2000 Hz', threat: 'Critical', color: '#FF4444' },
    { type: 'Chainsaw', frequency: '2000-4000 Hz', threat: 'High', color: '#FF8800' },
    { type: 'Vehicle Engine', frequency: '100-500 Hz', threat: 'Medium', color: '#FFAA00' },
    { type: 'Forest Ambience', frequency: '20-20000 Hz', threat: 'Normal', color: '#39FF6A' }
  ];

  useEffect(() => {
    // Simulate audio data
    const interval = setInterval(() => {
      const newData = Array.from({ length: 64 }, () => Math.random() * 100);
      setAudioData(newData);
      
      // Simulate sound detection
      if (isListening && Math.random() > 0.7) {
        const randomSound = soundTypes[Math.floor(Math.random() * soundTypes.length)];
        const newDetection = {
          ...randomSound,
          timestamp: new Date().toLocaleTimeString(),
          confidence: Math.floor(Math.random() * 30) + 70,
          id: Date.now()
        };
        
        setDetectedSounds(prev => [newDetection, ...prev.slice(0, 4)]);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isListening]);

  const startListening = () => {
    setIsListening(true);
    setDetectedSounds([]);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  return (
    <div className="holographic p-8 rounded-2xl">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-orbitron font-bold text-electric-cyan mb-4">
          Acoustic Monitoring System
        </h3>
        <p className="text-lg text-misty-white">
          Real-time forest sound analysis for threat detection
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Audio Visualizer */}
        <div className="space-y-6">
          {/* Control Panel */}
          <div className="glassmorphism p-6 rounded-xl text-center">
            <motion.button
              onClick={isListening ? stopListening : startListening}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-300 ${
                isListening 
                  ? 'bg-gradient-to-r from-tiger-orange to-red-500 animate-pulse' 
                  : 'bg-gradient-to-r from-electric-cyan to-bio-green hover:scale-110'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isListening ? '⏹️' : '🎙️'}
            </motion.button>
            
            <p className="mt-4 text-lg font-semibold text-misty-white">
              {isListening ? 'Monitoring Active' : 'Click to Start Monitoring'}
            </p>
            
            {isListening && (
              <motion.div
                className="mt-2 text-electric-cyan font-mono"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                SCANNING FREQUENCIES...
              </motion.div>
            )}
          </div>

          {/* Waveform Visualizer */}
          <div className="glassmorphism p-6 rounded-xl">
            <h4 className="text-xl font-orbitron font-bold text-bio-green mb-4">
              Audio Waveform
            </h4>
            
            <div className="h-32 bg-forest-navy rounded-lg p-4 flex items-end justify-center space-x-1">
              {audioData.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-t from-electric-cyan to-bio-green w-2 rounded-t"
                  style={{ height: `${isListening ? value : 0}%` }}
                  animate={{ 
                    height: `${isListening ? value : 0}%`,
                    opacity: isListening ? 1 : 0.3
                  }}
                  transition={{ duration: 0.1 }}
                />
              ))}
            </div>
            
            {/* Frequency Spectrum */}
            <div className="mt-4 grid grid-cols-4 gap-2 text-xs text-misty-white/60">
              <div>Low (20-200Hz)</div>
              <div>Mid (200-2kHz)</div>
              <div>High (2-8kHz)</div>
              <div>Ultra (8-20kHz)</div>
            </div>
          </div>
        </div>

        {/* Right: Detection Results */}
        <div className="space-y-6">
          <div className="glassmorphism p-6 rounded-xl">
            <h4 className="text-xl font-orbitron font-bold text-neural-purple mb-4">
              Real-Time Detections
            </h4>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {detectedSounds.length === 0 ? (
                <div className="text-center text-misty-white/50 py-8">
                  {isListening ? 'Listening for sounds...' : 'Start monitoring to see detections'}
                </div>
              ) : (
                detectedSounds.map((sound) => (
                  <motion.div
                    key={sound.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-lg border-l-4 glassmorphism ${
                      sound.threat === 'Critical' ? 'border-red-500' :
                      sound.threat === 'High' ? 'border-orange-500' :
                      sound.threat === 'Medium' ? 'border-yellow-500' :
                      'border-green-500'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-semibold text-misty-white">{sound.type}</div>
                      <div className="text-xs text-misty-white/60">{sound.timestamp}</div>
                    </div>
                    
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-misty-white/80">Frequency:</span>
                        <span className="font-mono text-electric-cyan">{sound.frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-misty-white/80">Confidence:</span>
                        <span className="font-mono text-bio-green">{sound.confidence}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-misty-white/80">Threat Level:</span>
                        <span 
                          className={`font-bold ${
                            sound.threat === 'Critical' ? 'text-red-500' :
                            sound.threat === 'High' ? 'text-orange-500' :
                            sound.threat === 'Medium' ? 'text-yellow-500' :
                            'text-green-500'
                          }`}
                        >
                          {sound.threat}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Sound Profile Database */}
          <div className="glassmorphism p-6 rounded-xl">
            <h4 className="text-xl font-orbitron font-bold text-tiger-orange mb-4">
              Sound Profile Database
            </h4>
            
            <div className="space-y-3">
              {soundTypes.map((sound, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-3 bg-forest-navy/50 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: sound.color }}
                    />
                    <span className="text-misty-white font-medium">{sound.type}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-electric-cyan font-mono">{sound.frequency}</div>
                    <div className={`text-xs font-bold ${
                      sound.threat === 'Critical' ? 'text-red-500' :
                      sound.threat === 'High' ? 'text-orange-500' :
                      sound.threat === 'Medium' ? 'text-yellow-500' :
                      'text-green-500'
                    }`}>
                      {sound.threat}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcousticAnalyzer;
