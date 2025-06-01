
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ActivityType, ActivityData } from '@/types/forestActivity';
import { generateMockForestActivity } from '@/services/mockForestActivityService';
import HeatmapStats from './HeatmapStats';
import ActivityLegend from './ActivityLegend';
import ActivityControls from './ActivityControls';

// Lazy load the map components to avoid SSR issues
import { lazy, Suspense } from 'react';

const LazyMap = lazy(() => import('./LazyMapContainer'));

const ForestActivityHeatmap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [selectedActivityType, setSelectedActivityType] = useState<ActivityType | 'all'>('all');
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    poaching: 0,
    movement: 0,
    threats: 0,
    activeAlerts: 0
  });

  // Generate initial mock data
  useEffect(() => {
    try {
      const initialData = generateMockForestActivity(50);
      setActivities(initialData);
      updateStats(initialData);
    } catch (error) {
      console.error('Error generating initial mock data:', error);
    }
  }, []);

  // Real-time data updates
  useEffect(() => {
    if (!isRealTimeEnabled) return;

    const interval = setInterval(() => {
      try {
        const newActivity = generateMockForestActivity(1)[0];
        setActivities(prev => {
          const updated = [newActivity, ...prev.slice(0, 99)]; // Keep last 100 activities
          updateStats(updated);
          return updated;
        });
      } catch (error) {
        console.error('Error generating real-time data:', error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isRealTimeEnabled]);

  const updateStats = (data: ActivityData[]) => {
    const total = data.length;
    const poaching = data.filter(a => a.type === 'poaching').length;
    const movement = data.filter(a => a.type === 'animal-movement').length;
    const threats = data.filter(a => a.severity === 'high' || a.severity === 'medium').length;
    const activeAlerts = data.filter(a => a.severity === 'high').length;

    setStats({ total, poaching, movement, threats, activeAlerts });
  };

  // Filter activities based on selected type
  const filteredActivities = selectedActivityType === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === selectedActivityType);

  return (
    <section ref={ref} className="py-20 relative" id="forest-activity-heatmap">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-bio-green to-electric-cyan mb-8">
            Live Forest Activity Heatmap
          </h2>
          <p className="text-xl text-misty-white max-w-4xl mx-auto">
            Real-time monitoring of wildlife activities, threats, and conservation efforts across India's protected forests
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12"
        >
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <ActivityControls
              selectedActivityType={selectedActivityType}
              onActivityTypeChange={setSelectedActivityType}
              isRealTimeEnabled={isRealTimeEnabled}
              onRealTimeToggle={setIsRealTimeEnabled}
            />
            
            <HeatmapStats stats={stats} />
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glassmorphism p-6 rounded-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-orbitron font-bold text-electric-cyan">
                  India Forest Activity Map
                </h3>
                <div className="flex items-center space-x-2 text-sm text-misty-white/60">
                  <div className="w-2 h-2 bg-bio-green rounded-full animate-pulse" />
                  <span>Live Data</span>
                </div>
              </div>
              
              <div className="h-96 rounded-lg overflow-hidden bg-forest-navy/50 flex items-center justify-center">
                <Suspense fallback={
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-electric-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-misty-white">Loading map...</p>
                  </div>
                }>
                  <LazyMap activities={filteredActivities} />
                </Suspense>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Activity Legend */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
        >
          <div className="lg:col-span-1">
            <ActivityLegend />
          </div>
          
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glassmorphism p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="text-xl font-orbitron font-bold text-electric-cyan mb-2">
                Real-time Detection
              </h4>
              <p className="text-misty-white/80">
                AI-powered sensors detect threats with 95% accuracy in real-time
              </p>
            </div>

            <div className="glassmorphism p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h4 className="text-xl font-orbitron font-bold text-bio-green mb-2">
                Instant Alerts
              </h4>
              <p className="text-misty-white/80">
                Immediate notifications to forest rangers and conservation teams
              </p>
            </div>

            <div className="glassmorphism p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">📊</div>
              <h4 className="text-xl font-orbitron font-bold text-neural-purple mb-2">
                Data Analytics
              </h4>
              <p className="text-misty-white/80">
                Comprehensive insights for strategic conservation planning
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ForestActivityHeatmap;
