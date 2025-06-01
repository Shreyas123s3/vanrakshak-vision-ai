
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const WildlifeKnowledgeHub = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedCategory, setSelectedCategory] = useState('mammals');

  const knowledgeCategories = {
    mammals: {
      title: 'Mammals',
      icon: '🐅',
      items: [
        { name: 'Bengal Tiger', local: 'Bagh', habitat: 'Dense forests', behavior: 'Solitary hunter' },
        { name: 'Asian Elephant', local: 'Hathi', habitat: 'Forests and grasslands', behavior: 'Lives in herds' },
        { name: 'Indian Rhino', local: 'Gainda', habitat: 'Marshy areas', behavior: 'Lives alone' },
        { name: 'Leopard', local: 'Tendua', habitat: 'Rocky hills', behavior: 'Climbs trees' }
      ]
    },
    birds: {
      title: 'Birds',
      icon: '🦅',
      items: [
        { name: 'Golden Eagle', local: 'Sunhara Cheel', habitat: 'Mountain regions', behavior: 'High altitude flight' },
        { name: 'Peacock', local: 'Mor', habitat: 'Open forests', behavior: 'Ground dwelling' },
        { name: 'Hornbill', local: 'Dhanesh', habitat: 'Dense forests', behavior: 'Fruit eating' },
        { name: 'Kingfisher', local: 'Rajmachli', habitat: 'Riverside', behavior: 'Fish catching' }
      ]
    },
    reptiles: {
      title: 'Reptiles',
      icon: '🐍',
      items: [
        { name: 'King Cobra', local: 'Nagaraj', habitat: 'Dense forests', behavior: 'Venomous snake' },
        { name: 'Indian Python', local: 'Ajgar', habitat: 'Rocky areas', behavior: 'Swallows prey' },
        { name: 'Monitor Lizard', local: 'Goh', habitat: 'Riverside', behavior: 'Swimming' },
        { name: 'Gecko', local: 'Chipkali', habitat: 'On trees', behavior: 'Active at night' }
      ]
    }
  };

  return (
    <section ref={ref} className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neural-purple to-bio-green mb-8">
            Local Wildlife Knowledge Hub
          </h2>
          <p className="text-xl text-misty-white max-w-4xl mx-auto">
            Traditional wildlife knowledge combined with modern AI insights
          </p>
        </motion.div>

        {/* Category Selection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center space-x-4 mb-12"
        >
          {Object.entries(knowledgeCategories).map(([key, category]) => (
            <button
              key={key}
              className={`glassmorphism px-6 py-3 rounded-xl transition-all duration-300 ${
                selectedCategory === key 
                  ? 'ring-2 ring-electric-cyan bg-electric-cyan/10' 
                  : 'hover:bg-electric-cyan/5'
              }`}
              onClick={() => setSelectedCategory(key)}
              aria-label={`Select ${category.title}`}
            >
              <div className="text-2xl mb-1">{category.icon}</div>
              <div className="text-sm font-orbitron text-electric-cyan">{category.title}</div>
            </button>
          ))}
        </motion.div>

        {/* Knowledge Cards */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {knowledgeCategories[selectedCategory].items.map((animal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="holographic p-6 rounded-xl hover:scale-105 transition-all duration-300"
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{knowledgeCategories[selectedCategory].icon}</div>
                <h3 className="text-lg font-orbitron font-bold text-electric-cyan mb-1">
                  {animal.name}
                </h3>
                <p className="text-bio-green font-medium">{animal.local}</p>
              </div>
              
              <div className="space-y-3">
                <div className="glassmorphism p-3 rounded-lg">
                  <div className="text-xs text-neural-purple font-semibold mb-1">Habitat</div>
                  <div className="text-sm text-misty-white">{animal.habitat}</div>
                </div>
                
                <div className="glassmorphism p-3 rounded-lg">
                  <div className="text-xs text-tiger-orange font-semibold mb-1">Behavior</div>
                  <div className="text-sm text-misty-white">{animal.behavior}</div>
                </div>
              </div>
              
              <button className="w-full mt-4 glassmorphism py-2 rounded-lg text-electric-cyan hover:bg-electric-cyan/10 transition-colors text-sm">
                Learn More
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Traditional Knowledge Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 holographic p-8 rounded-xl"
        >
          <h3 className="text-3xl font-orbitron font-bold text-tiger-orange mb-6 text-center">
            Traditional Knowledge + Modern AI
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">👴</div>
              <h4 className="text-lg font-semibold text-electric-cyan mb-2">Ancient Hunter Knowledge</h4>
              <p className="text-misty-white/80 text-sm">
                Wildlife behavior patterns passed down through generations
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🤖</div>
              <h4 className="text-lg font-semibold text-bio-green mb-2">AI Analysis</h4>
              <p className="text-misty-white/80 text-sm">
                Data-driven pattern recognition and prediction
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="text-lg font-semibold text-neural-purple mb-2">Combined Approach</h4>
              <p className="text-misty-white/80 text-sm">
                Better conservation strategies through unified insights
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WildlifeKnowledgeHub;
