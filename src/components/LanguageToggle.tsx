
import { useState } from 'react';
import { motion } from 'framer-motion';

const LanguageToggle = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' }
  ];

  return (
    <div className="relative inline-block">
      <motion.button
        className="glassmorphism px-4 py-2 rounded-lg flex items-center space-x-2 text-electric-cyan hover:bg-electric-cyan/10 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Select language"
      >
        <span className="text-lg">🌐</span>
        <span className="font-medium">
          {languages.find(lang => lang.code === selectedLanguage)?.native}
        </span>
      </motion.button>
      
      <motion.div
        className="absolute top-full left-0 mt-2 bg-forest-navy/95 backdrop-blur-lg border border-electric-cyan/20 rounded-lg shadow-lg min-w-40 z-50"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        {languages.map((language) => (
          <button
            key={language.code}
            className={`w-full px-4 py-3 text-left hover:bg-electric-cyan/10 transition-colors first:rounded-t-lg last:rounded-b-lg ${
              selectedLanguage === language.code ? 'bg-electric-cyan/20 text-electric-cyan' : 'text-misty-white'
            }`}
            onClick={() => setSelectedLanguage(language.code)}
            aria-label={`Switch to ${language.name}`}
          >
            <div className="font-medium">{language.native}</div>
            <div className="text-sm opacity-60">{language.name}</div>
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default LanguageToggle;
