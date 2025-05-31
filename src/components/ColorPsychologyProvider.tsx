
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ColorTheme = 'endangered' | 'thriving' | 'ai-processing' | 'success' | 'neutral';
type ColorTemperature = 'warm' | 'cool' | 'neutral';

interface ColorPsychologyContextType {
  currentTheme: ColorTheme;
  currentTemperature: ColorTemperature;
  isDarkMode: boolean;
  setTheme: (theme: ColorTheme) => void;
  setTemperature: (temperature: ColorTemperature) => void;
  toggleDarkMode: () => void;
  getContextualColors: (context: string) => string;
}

const ColorPsychologyContext = createContext<ColorPsychologyContextType | undefined>(undefined);

interface ColorPsychologyProviderProps {
  children: ReactNode;
}

export const ColorPsychologyProvider: React.FC<ColorPsychologyProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>('neutral');
  const [currentTemperature, setCurrentTemperature] = useState<ColorTemperature>('neutral');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Auto dark mode based on time
  useEffect(() => {
    const checkTimeBasedTheme = () => {
      const hour = new Date().getHours();
      const shouldBeDark = hour < 6 || hour >= 20;
      
      if (shouldBeDark !== isDarkMode) {
        setIsDarkMode(shouldBeDark);
        document.documentElement.classList.toggle('dark', shouldBeDark);
      }
    };

    checkTimeBasedTheme();
    const interval = setInterval(checkTimeBasedTheme, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [isDarkMode]);

  // Apply theme to document
  useEffect(() => {
    document.body.className = `${document.body.className} theme-transition temp-${currentTemperature}`;
    
    // Add contextual theme classes
    const themeClasses = {
      'endangered': 'color-endangered',
      'thriving': 'color-thriving',
      'ai-processing': 'color-ai-processing',
      'success': 'color-success',
      'neutral': ''
    };

    Object.values(themeClasses).forEach(cls => {
      if (cls) document.body.classList.remove(cls);
    });

    if (themeClasses[currentTheme]) {
      document.body.classList.add(themeClasses[currentTheme]);
    }
  }, [currentTheme, currentTemperature]);

  const setTheme = (theme: ColorTheme) => {
    setCurrentTheme(theme);
    
    // Auto-adjust temperature based on theme
    if (theme === 'endangered') {
      setCurrentTemperature('warm');
    } else if (theme === 'ai-processing') {
      setCurrentTemperature('cool');
    } else if (theme === 'thriving' || theme === 'success') {
      setCurrentTemperature('neutral');
    }
  };

  const setTemperature = (temperature: ColorTemperature) => {
    setCurrentTemperature(temperature);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const getContextualColors = (context: string): string => {
    const colorMap: Record<string, string> = {
      'tiger': 'color-endangered',
      'elephant': 'color-thriving',
      'rhino': 'color-endangered',
      'leopard': 'color-endangered',
      'deer': 'color-thriving',
      'bird': 'color-thriving',
      'ai': 'color-ai-processing',
      'detection': 'color-ai-processing',
      'alert': 'color-endangered',
      'success': 'color-success',
      'conservation': 'color-thriving'
    };

    return colorMap[context.toLowerCase()] || '';
  };

  return (
    <ColorPsychologyContext.Provider
      value={{
        currentTheme,
        currentTemperature,
        isDarkMode,
        setTheme,
        setTemperature,
        toggleDarkMode,
        getContextualColors
      }}
    >
      {children}
    </ColorPsychologyContext.Provider>
  );
};

export const useColorPsychology = () => {
  const context = useContext(ColorPsychologyContext);
  if (context === undefined) {
    throw new Error('useColorPsychology must be used within a ColorPsychologyProvider');
  }
  return context;
};
