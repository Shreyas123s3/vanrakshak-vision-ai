
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import ProblemStatement from '@/components/ProblemStatement';
import SolutionOverview from '@/components/SolutionOverview';
import TechnologyShowcase from '@/components/TechnologyShowcase';
import ConservationMetrics from '@/components/ConservationMetrics';
import GovernmentPartnerships from '@/components/GovernmentPartnerships';
import ExpertTestimonials from '@/components/ExpertTestimonials';
import ImpactMetrics from '@/components/ImpactMetrics';
import ImplementationRoadmap from '@/components/ImplementationRoadmap';
import TeamSection from '@/components/TeamSection';
import CallToAction from '@/components/CallToAction';
import ParticleBackground from '@/components/ParticleBackground';
import Navigation from '@/components/Navigation';
import WildlifeSilhouettes from '@/components/WildlifeSilhouettes';
import PawPrintTrail from '@/components/PawPrintTrail';
import ForestCanopy from '@/components/ForestCanopy';
import BirdFlight from '@/components/BirdFlight';
import DayNightCycle from '@/components/DayNightCycle';
import VanRakshakAvatar from '@/components/VanRakshakAvatar';
import VillageParticipationDashboard from '@/components/VillageParticipationDashboard';
import ConservationRewards from '@/components/ConservationRewards';
import CommunitySuccessStories from '@/components/CommunitySuccessStories';
import WildlifeKnowledgeHub from '@/components/WildlifeKnowledgeHub';
import EmergencyReporting from '@/components/EmergencyReporting';
import AccessibilityEnhancements from '@/components/AccessibilityEnhancements';
import MobileOptimizations from '@/components/MobileOptimizations';

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for 3D assets with mobile optimization
    const isMobile = window.innerWidth <= 768;
    const loadTime = isMobile ? 1000 : 2000; // Faster loading on mobile
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, loadTime);

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
      {/* Accessibility Enhancements */}
      <AccessibilityEnhancements />
      
      {/* Mobile Optimizations */}
      <MobileOptimizations />
      
      {/* Background Effects */}
      <ParticleBackground />
      <WildlifeSilhouettes />
      <PawPrintTrail />
      <ForestCanopy />
      <BirdFlight />
      <DayNightCycle />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main id="main-content" className="relative z-10">
        <HeroSection />
        <ProblemStatement />
        <SolutionOverview />
        <TechnologyShowcase />
        <ConservationMetrics />
        <GovernmentPartnerships />
        <ExpertTestimonials />
        <ImpactMetrics />
        
        {/* Community Engagement Features */}
        <VanRakshakAvatar />
        <VillageParticipationDashboard />
        <ConservationRewards />
        <CommunitySuccessStories />
        <WildlifeKnowledgeHub />
        <EmergencyReporting />
        
        <ImplementationRoadmap />
        <TeamSection />
        <CallToAction />
      </main>
    </div>
  );
};

export default Index;
