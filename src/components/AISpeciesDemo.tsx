
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const AISpeciesDemo = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sampleImages = [
    {
      src: '/api/placeholder/300/200',
      alt: 'Bengal Tiger',
      species: 'Bengal Tiger',
      confidence: 97.8,
      behavior: 'Hunting patrol',
      location: 'Sundarbans National Park'
    },
    {
      src: '/api/placeholder/300/200',
      alt: 'Asian Elephant',
      species: 'Asian Elephant',
      confidence: 94.2,
      behavior: 'Feeding',
      location: 'Kaziranga National Park'
    },
    {
      src: '/api/placeholder/300/200',
      alt: 'Snow Leopard',
      species: 'Snow Leopard',
      confidence: 91.5,
      behavior: 'Territory marking',
      location: 'Hemis National Park'
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSampleImage = (image: any) => {
    setSelectedImage(image.src);
    setResults(image);
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    setResults(null);
    
    // Simulate AI analysis
    setTimeout(() => {
      setResults({
        species: 'Identified Species',
        confidence: Math.floor(Math.random() * 20) + 80,
        behavior: 'Detected Behavior',
        location: 'Estimated Location'
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="holographic p-8 rounded-2xl">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-orbitron font-bold text-electric-cyan mb-4">
          AI Species Recognition Demo
        </h3>
        <p className="text-lg text-misty-white">
          Upload an image or select a sample to see our AI in action
        </p>
      </div>

      {/* Upload Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Upload Interface */}
        <div className="space-y-6">
          <motion.div
            className="border-2 border-dashed border-electric-cyan/50 rounded-xl p-8 text-center cursor-pointer hover:border-electric-cyan transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="text-6xl text-electric-cyan mb-4">📷</div>
            <p className="text-lg text-misty-white mb-2">Upload Wildlife Image</p>
            <p className="text-sm text-misty-white/60">Click to select or drag & drop</p>
          </motion.div>

          {/* Sample Images */}
          <div className="space-y-4">
            <h4 className="text-xl font-orbitron font-bold text-bio-green">Try Sample Images:</h4>
            <div className="grid grid-cols-3 gap-4">
              {sampleImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="cursor-pointer rounded-lg overflow-hidden border-2 border-transparent hover:border-electric-cyan transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleSampleImage(image)}
                >
                  <div className="w-full h-20 bg-gradient-to-br from-electric-cyan/20 to-bio-green/20 flex items-center justify-center">
                    <span className="text-2xl">{image.alt === 'Bengal Tiger' ? '🐅' : image.alt === 'Asian Elephant' ? '🐘' : '🐆'}</span>
                  </div>
                  <div className="p-2 text-center">
                    <p className="text-xs text-misty-white">{image.species}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Results Display */}
        <div className="space-y-6">
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glassmorphism p-6 rounded-xl"
            >
              <div className="w-full h-48 bg-gradient-to-br from-electric-cyan/10 to-bio-green/10 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl">📸</span>
              </div>
              
              {isAnalyzing && (
                <motion.div
                  className="text-center"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="text-electric-cyan font-mono text-lg mb-2">
                    ANALYZING IMAGE...
                  </div>
                  <div className="w-full bg-forest-navy rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-electric-cyan to-bio-green h-2 rounded-full"
                      animate={{ width: ['0%', '100%'] }}
                      transition={{ duration: 2, ease: 'easeInOut' }}
                    />
                  </div>
                </motion.div>
              )}

              {results && !isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-bio-green font-semibold">Species:</span>
                    <span className="text-electric-cyan font-mono">{results.species}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-bio-green font-semibold">Confidence:</span>
                    <span className="text-neural-purple font-mono">{results.confidence}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-bio-green font-semibold">Behavior:</span>
                    <span className="text-tiger-orange font-mono">{results.behavior}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-bio-green font-semibold">Location:</span>
                    <span className="text-misty-white font-mono text-sm">{results.location}</span>
                  </div>

                  {/* Confidence Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-misty-white/60 mb-1">
                      <span>Confidence Level</span>
                      <span>{results.confidence}%</span>
                    </div>
                    <div className="w-full bg-forest-navy rounded-full h-3">
                      <motion.div
                        className="bg-gradient-to-r from-electric-cyan to-bio-green h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${results.confidence}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* AI Capabilities Info */}
          <div className="glassmorphism p-6 rounded-xl">
            <h4 className="text-xl font-orbitron font-bold text-neural-purple mb-4">
              AI Capabilities
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-bio-green rounded-full animate-pulse"></div>
                <span className="text-sm text-misty-white">50+ Indian wildlife species recognition</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-electric-cyan rounded-full animate-pulse"></div>
                <span className="text-sm text-misty-white">Behavioral pattern analysis</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-neural-purple rounded-full animate-pulse"></div>
                <span className="text-sm text-misty-white">Real-time threat assessment</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-tiger-orange rounded-full animate-pulse"></div>
                <span className="text-sm text-misty-white">Location and habitat mapping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISpeciesDemo;
