
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { ActivityType, ActivityData } from '@/types/forestActivity';
import { generateMockForestActivity } from '@/services/mockForestActivityService';
import HeatmapStats from './HeatmapStats';
import ActivityLegend from './ActivityLegend';
import ActivityControls from './ActivityControls';
import 'leaflet/dist/leaflet.css';

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
    const initialData = generateMockForestActivity(50);
    setActivities(initialData);
    updateStats(initialData);
  }, []);

  // Real-time data updates
  useEffect(() => {
    if (!isRealTimeEnabled) return;

    const interval = setInterval(() => {
      const newActivity = generateMockForestActivity(1)[0];
      setActivities(prev => {
        const updated = [newActivity, ...prev.slice(0, 99)]; // Keep last 100 activities
        updateStats(updated);
        return updated;
      });
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

  // Color mapping for different activity types
  const getActivityColor = (type: ActivityType, severity: string) => {
    const colors = {
      'poaching': severity === 'high' ? '#FF0000' : '#FF4444',
      'animal-movement': '#39FF6A',
      'illegal-logging': '#FF8C00',
      'vehicle-intrusion': '#8B5FFF',
      'fire-detection': '#FF0000',
      'conservation-patrol': '#00D4FF'
    };
    return colors[type] || '#FFFFFF';
  };

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
              
              <div className="h-96 rounded-lg overflow-hidden">
                <MapContainer
                  center={[20.5937, 78.9629]} // Center of India
                  zoom={5}
                  style={{ height: '100%', width: '100%' }}
                  className="z-0"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {filteredActivities.map((activity) => (
                    <CircleMarker
                      key={activity.id}
                      center={[activity.latitude, activity.longitude]}
                      radius={activity.severity === 'high' ? 8 : activity.severity === 'medium' ? 6 : 4}
                      color={getActivityColor(activity.type, activity.severity)}
                      fillColor={getActivityColor(activity.type, activity.severity)}
                      fillOpacity={0.7}
                      weight={2}
                    >
                      <Popup>
                        <div className="p-2 min-w-48">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            {activity.type.replace('-', ' ').toUpperCase()}
                          </h4>
                          <div className="space-y-1 text-sm">
                            <p><strong>Location:</strong> {activity.location}</p>
                            <p><strong>Severity:</strong> 
                              <span className={`ml-1 px-2 py-1 rounded text-xs ${
                                activity.severity === 'high' ? 'bg-red-100 text-red-800' :
                                activity.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {activity.severity}
                              </span>
                            </p>
                            <p><strong>Time:</strong> {new Date(activity.timestamp).toLocaleString()}</p>
                            {activity.description && (
                              <p><strong>Details:</strong> {activity.description}</p>
                            )}
                            {activity.confidence && (
                              <p><strong>Confidence:</strong> {(activity.confidence * 100).toFixed(1)}%</p>
                            )}
                          </div>
                        </div>
                      </Popup>
                    </CircleMarker>
                  ))}
                </MapContainer>
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
