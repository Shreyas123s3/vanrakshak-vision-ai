
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const WildlifeKnowledgeHub = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedCategory, setSelectedCategory] = useState('mammals');

  const knowledgeCategories = {
    mammals: {
      title: 'स्तनधारी जीव',
      icon: '🐅',
      items: [
        { name: 'बंगाल टाइगर', local: 'बाघ', habitat: 'घने जंगल', behavior: 'एकाकी शिकारी' },
        { name: 'एशियाई हाथी', local: 'हाथी', habitat: 'वन और घास के मैदान', behavior: 'झुंड में रहते हैं' },
        { name: 'इंडियन राइनो', local: 'गैंडा', habitat: 'दलदली क्षेत्र', behavior: 'अकेले रहते हैं' },
        { name: 'लेपर्ड', local: 'तेंदुआ', habitat: 'चट्टानी पहाड़ी', behavior: 'पेड़ों पर चढ़ते हैं' }
      ]
    },
    birds: {
      title: 'पक्षी',
      icon: '🦅',
      items: [
        { name: 'गोल्डन ईगल', local: 'सुनहरा चील', habitat: 'पहाड़ी क्षेत्र', behavior: 'ऊंची उड़ान' },
        { name: 'पीकॉक', local: 'मोर', habitat: 'खुले जंगल', behavior: 'जमीन पर चलते हैं' },
        { name: 'हॉर्नबिल', local: 'धनेश', habitat: 'घने वन', behavior: 'फलों को खाते हैं' },
        { name: 'किंगफिशर', local: 'राजमछली', habitat: 'नदी किनारे', behavior: 'मछली पकड़ते हैं' }
      ]
    },
    reptiles: {
      title: 'सरीसृप',
      icon: '🐍',
      items: [
        { name: 'किंग कोबरा', local: 'नागराज', habitat: 'घने जंगल', behavior: 'जहरीला सांप' },
        { name: 'इंडियन पाइथन', local: 'अजगर', habitat: 'चट्टानी क्षेत्र', behavior: 'शिकार को निगल जाते हैं' },
        { name: 'मॉनिटर लिजर्ड', local: 'गोह', habitat: 'नदी किनारे', behavior: 'तैराकी करते हैं' },
        { name: 'गेको', local: 'छिपकली', habitat: 'पेड़ों पर', behavior: 'रात में सक्रिय' }
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
            स्थानीय वन्यजीव ज्ञान केंद्र
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
                  <div className="text-xs text-neural-purple font-semibold mb-1">आवास</div>
                  <div className="text-sm text-misty-white">{animal.habitat}</div>
                </div>
                
                <div className="glassmorphism p-3 rounded-lg">
                  <div className="text-xs text-tiger-orange font-semibold mb-1">व्यवहार</div>
                  <div className="text-sm text-misty-white">{animal.behavior}</div>
                </div>
              </div>
              
              <button className="w-full mt-4 glassmorphism py-2 rounded-lg text-electric-cyan hover:bg-electric-cyan/10 transition-colors text-sm">
                और जानें
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
            पारंपरिक ज्ञान + आधुनिक AI
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">👴</div>
              <h4 className="text-lg font-semibold text-electric-cyan mb-2">पुराने शिकारी ज्ञान</h4>
              <p className="text-misty-white/80 text-sm">
                पीढ़ियों से चले आ रहे वन्यजीव व्यवहार के पैटर्न
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🤖</div>
              <h4 className="text-lg font-semibold text-bio-green mb-2">AI विश्लेषण</h4>
              <p className="text-misty-white/80 text-sm">
                डेटा-आधारित पैटर्न पहचान और भविष्यवाणी
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="text-lg font-semibold text-neural-purple mb-2">संयुक्त दृष्टिकोण</h4>
              <p className="text-misty-white/80 text-sm">
                बेहतर संरक्षण रणनीति के लिए दोनों का मेल
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WildlifeKnowledgeHub;
