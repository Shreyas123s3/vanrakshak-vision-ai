
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const CommunitySuccessStories = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentStory, setCurrentStory] = useState(0);

  const successStories = [
    {
      title: 'रामपुर में बाघ संरक्षण की सफलता',
      village: 'रामपुर, राजस्थान',
      description: 'गांव के लोगों ने AI कैमरों की मदद से शिकारियों को पकड़ा और 3 बाघों की जान बचाई।',
      impact: 'बाघों की संख्या 40% बढ़ी',
      participants: 125,
      image: '🐅',
      year: '2023'
    },
    {
      title: 'गंगापुर में हाथी गलियारा संरक्षण',
      village: 'गंगापुर, असम',
      description: 'स्थानीय समुदाय ने हाथियों के प्राकृतिक मार्ग को संरक्षित करने में सहयोग दिया।',
      impact: 'मानव-हाथी संघर्ष 70% कम',
      participants: 200,
      image: '🐘',
      year: '2023'
    },
    {
      title: 'शिवपुर में गैंडा संरक्षण पहल',
      village: 'शिवपुर, असम',
      description: 'AI निगरानी प्रणाली की मदद से अवैध शिकार को पूरी तरह रोक दिया गया।',
      impact: 'गैंडों की आबादी 25% बढ़ी',
      participants: 180,
      image: '🦏',
      year: '2024'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % successStories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [successStories.length]);

  return (
    <section ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-bio-green to-tiger-orange mb-8">
            सामुदायिक सफलता की कहानियां
          </h2>
          <p className="text-xl text-misty-white max-w-4xl mx-auto">
            Real stories of communities making a difference in wildlife conservation
          </p>
        </motion.div>

        {/* Main Story Display */}
        <motion.div
          key={currentStory}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
          className="holographic p-8 rounded-xl mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-8xl mb-6 text-center lg:text-left">
                {successStories[currentStory].image}
              </div>
              <h3 className="text-3xl font-orbitron font-bold text-electric-cyan mb-4">
                {successStories[currentStory].title}
              </h3>
              <p className="text-lg text-bio-green mb-4">
                📍 {successStories[currentStory].village}
              </p>
              <p className="text-misty-white mb-6 leading-relaxed">
                {successStories[currentStory].description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glassmorphism p-4 rounded-lg">
                  <div className="text-2xl font-orbitron font-bold text-tiger-orange mb-1">
                    {successStories[currentStory].impact}
                  </div>
                  <div className="text-sm text-misty-white/80">प्रभाव</div>
                </div>
                
                <div className="glassmorphism p-4 rounded-lg">
                  <div className="text-2xl font-orbitron font-bold text-neural-purple mb-1">
                    {successStories[currentStory].participants}+ लोग
                  </div>
                  <div className="text-sm text-misty-white/80">सहभागी</div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-6xl mb-4">🏆</div>
              <div className="text-4xl font-orbitron font-bold text-electric-cyan mb-2">
                {successStories[currentStory].year}
              </div>
              <div className="text-lg text-misty-white">सफलता का वर्ष</div>
            </div>
          </div>
        </motion.div>

        {/* Story Navigation */}
        <div className="flex justify-center space-x-4 mb-8">
          {successStories.map((_, index) => (
            <button
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                currentStory === index 
                  ? 'bg-electric-cyan' 
                  : 'bg-misty-white/30 hover:bg-misty-white/50'
              }`}
              onClick={() => setCurrentStory(index)}
              aria-label={`View story ${index + 1}`}
            />
          ))}
        </div>

        {/* Story Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {successStories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className={`glassmorphism p-6 rounded-xl cursor-pointer transition-all duration-300 hover:border-electric-cyan/50 ${
                currentStory === index ? 'ring-2 ring-electric-cyan' : ''
              }`}
              onClick={() => setCurrentStory(index)}
              role="button"
              tabIndex={0}
              aria-label={`Select ${story.title}`}
              onKeyDown={(e) => e.key === 'Enter' && setCurrentStory(index)}
            >
              <div className="text-4xl mb-3 text-center">{story.image}</div>
              <h4 className="text-lg font-orbitron font-bold text-electric-cyan mb-2">
                {story.village.split(',')[0]}
              </h4>
              <p className="text-sm text-misty-white/80 mb-3">
                {story.description.slice(0, 60)}...
              </p>
              <div className="text-sm text-bio-green font-semibold">
                {story.year} • {story.participants}+ सहभागी
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySuccessStories;
