import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ColorPsychologyProvider } from '@/components/ColorPsychologyProvider';
import { EnhancedTypography } from '@/components/EnhancedTypography';
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
import WildlifeHeatmap from '@/components/WildlifeHeatmap';
import AIDetectionDemo from '@/components/AIDetectionDemo';
import ParallaxForest from '@/components/ParallaxForest';
import DynamicSky from '@/components/DynamicSky';
import FloatingWildlife from '@/components/FloatingWildlife';
import FallingLeaves from '@/components/FallingLeaves';

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Index component mounting...');
    // Simulate loading time for 3D assets with mobile optimization
    const isMobile = window.innerWidth <= 768;
    const loadTime = isMobile ? 1000 : 2000; // Faster loading on mobile
    
    const timer = setTimeout(() => {
      console.log('Loading complete, setting loading to false');
      setLoading(false);
    }, loadTime);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-forest-navy flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-20 h-20 border-4 border-ai-electric border-t-transparent rounded-full animate-spin mx-auto mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <EnhancedTypography
            variant="hero"
            animation="flourish"
            context="ai"
            className="mb-4"
          >
            VanRakshak AI
          </EnhancedTypography>
          <EnhancedTypography
            variant="body"
            animation="reveal"
            className="typing-animation"
          >
            Initializing Epic Wildlife Environment...
          </EnhancedTypography>
        </div>
      </div>
    );
  }

  return (
    <ColorPsychologyProvider>
      <div className="min-h-screen bg-forest-navy relative overflow-x-hidden theme-transition">
        {/* Accessibility Enhancements */}
        <AccessibilityEnhancements />
        
        {/* Mobile Optimizations */}
        <MobileOptimizations />
        
        {/* KILLER BACKGROUND EFFECTS - Multi-layered atmosphere */}
        <DynamicSky />
        <ParallaxForest />
        <ParticleBackground />
        <FloatingWildlife />
        <FallingLeaves />
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
          
          {/* Enhanced Wildlife Heatmap with Color Psychology */}
          <section className="py-20 temp-warm">
            <div className="container mx-auto px-6">
              <EnhancedTypography
                variant="heading"
                animation="fade"
                context="ai"
                className="text-center mb-16"
              >
                Wildlife Activity Heatmap
              </EnhancedTypography>
              <WildlifeHeatmap />
            </div>
          </section>
          
          {/* Enhanced AI Detection Demo */}
          <section className="py-20 temp-cool">
            <div className="container mx-auto px-6">
              <EnhancedTypography
                variant="heading"
                animation="grow"
                context="detection"
                className="text-center mb-8"
              >
                Live AI Species Detection
              </EnhancedTypography>
              <EnhancedTypography
                variant="body"
                animation="fade"
                tooltip="Our AI can identify over 500 species with 95% accuracy"
                interactive
                className="text-center mb-16 max-w-3xl mx-auto"
              >
                Experience real-time wildlife identification powered by advanced machine learning
              </EnhancedTypography>
              <AIDetectionDemo />
            </div>
          </section>
          
          <ConservationMetrics />
          <GovernmentPartnerships />
          <ExpertTestimonials />
          <ImpactMetrics />
          
          {/* Community Engagement Features with Enhanced Typography */}
          <section className="py-20 temp-warm">
            <div className="container mx-auto px-6">
              <EnhancedTypography
                variant="hero"
                animation="flourish"
                context="conservation"
                className="text-center mb-16"
              >
                Community Conservation Heroes
              </EnhancedTypography>
              <VanRakshakAvatar />
              <VillageParticipationDashboard />
              <ConservationRewards />
              <CommunitySuccessStories />
              <WildlifeKnowledgeHub />
              <EmergencyReporting />
            </div>
          </section>
          
          <ImplementationRoadmap />
          <TeamSection />
          <CallToAction />
        </main>
      </div>
    </ColorPsychologyProvider>
  );
};

export default Index;
