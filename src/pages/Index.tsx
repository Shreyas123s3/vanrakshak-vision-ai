
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import ProblemStatement from '@/components/ProblemStatement';
import SolutionOverview from '@/components/SolutionOverview';
import TechnologyShowcase from '@/components/TechnologyShowcase';
import ImpactMetrics from '@/components/ImpactMetrics';
import ImplementationRoadmap from '@/components/ImplementationRoadmap';
import TeamSection from '@/components/TeamSection';
import CallToAction from '@/components/CallToAction';
import ParticleBackground from '@/components/ParticleBackground';
import Navigation from '@/components/Navigation';

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for 3D assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-forest-navy flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-20 h-20 border-4 border-electric-cyan border-t-transparent rounded-full animate-spin mx-auto mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.h1
            className="text-4xl font-orbitron font-bold text-electric-cyan mb-4 text-glow"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            VanRakshak AI
          </motion.h1>
          <motion.p
            className="text-lg text-misty-white typing-animation"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, delay: 0.5 }}
          >
            Initializing Wildlife Protection Systems...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-forest-navy relative overflow-x-hidden">
      <ParticleBackground />
      <Navigation />
      
      <main className="relative z-10">
        <HeroSection />
        <ProblemStatement />
        <SolutionOverview />
        <TechnologyShowcase />
        <ImpactMetrics />
        <ImplementationRoadmap />
        <TeamSection />
        <CallToAction />
      </main>
    </div>
  );
};

export default Index;
