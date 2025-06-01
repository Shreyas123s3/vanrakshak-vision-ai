import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { ActivityData, ActivityType } from '@/types/forestActivity';
import { mockForestActivityService } from '@/services/mockForestActivityService';
import ActivityLegend from './ActivityLegend';
import ActivityControls from './ActivityControls';
import HeatmapStats from './HeatmapStats';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ForestActivityHeatmap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activities, setActivities] = useState<ActivityData[]>([]);
  const [selectedActivityType, setSelectedActivityType] = useState<ActivityType | 'all'>('all');
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  // India center coordinates
  const indiaCenter: LatLngExpression = [20.5937, 78.9629];

  useEffect(() => {
    // Initial data load
    const loadInitialData = async () => {
      try {
        const initialData = await mockForestActivityService.getActivities();
        setActivities(initialData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading initial activity data:', error);
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    if (!isRealTimeEnabled) return;

    // Set up real-time updates
    const interval = setInterval(async () => {
      try {
        const newActivities = await mockForestActivityService.getRealtimeUpdates();
        setActivities(prev => {
          const combined = [...prev, ...newActivities];
          // Keep only recent activities (last 1000 entries)
          return combined.slice(-1000);
        });
      } catch (error) {
        console.error('Error fetching real-time updates:', error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isRealTimeEnabled]);

  const getActivityColor = (type: ActivityType): string => {
    const colors = {
      poaching: '#FF4444',
      'animal-movement': '#39FF6A',
      'illegal-logging': '#FF8C00',
      'vehicle-intrusion': '#8B5FFF',
      'fire-detection': '#FF0000',
      'conservation-patrol': '#00D4FF'
    };
    return colors[type] || '#FFFFFF';
  };

  const filteredActivities = selectedActivityType === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === selectedActivityType);

  const getActivityStats = () => {
    const stats = {
      total: activities.length,
      poaching: activities.filter(a => a.type === 'poaching').length,
      movement: activities.filter(a => a.type === 'animal-movement').length,
      threats: activities.filter(a => ['poaching', 'illegal-logging', 'vehicle-intrusion', 'fire-detection'].includes(a.type)).length,
      activeAlerts: activities.filter(a => a.severity === 'high' && Date.now() - new Date(a.timestamp).getTime() < 3600000).length
    };
    return stats;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-electric-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-electric-cyan">Loading forest activity data...</p>
        </div>
      </div>
    );
  }

  return (
    <section ref={ref} className="py-20 relative" id="forest-heatmap">
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
            Real-time monitoring of wildlife activities, conservation efforts, and threat detection across India's protected forests
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
        >
          {/* Controls and Stats */}
          <div className="lg:col-span-1 space-y-6">
            <HeatmapStats stats={getActivityStats()} />
            <ActivityControls
              selectedActivityType={selectedActivityType}
              onActivityTypeChange={setSelectedActivityType}
              isRealTimeEnabled={isRealTimeEnabled}
              onRealTimeToggle={setIsRealTimeEnabled}
            />
            <ActivityLegend />
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
                  <div className={`w-2 h-2 rounded-full ${isRealTimeEnabled ? 'bg-bio-green animate-pulse' : 'bg-gray-500'}`} />
                  <span>{isRealTimeEnabled ? 'Live Data' : 'Paused'}</span>
                </div>
              </div>
              
              <div className="h-96 lg:h-[500px] rounded-lg overflow-hidden">
                <MapContainer
                  center={indiaCenter}
                  zoom={5}
                  style={{ height: '100%', width: '100%' }}
                  className="z-10"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {filteredActivities.map((activity) => (
                    <CircleMarker
                      key={activity.id}
                      center={[activity.latitude, activity.longitude]}
                      radius={activity.severity === 'high' ? 12 : activity.severity === 'medium' ? 8 : 6}
                      fillColor={getActivityColor(activity.type)}
                      color={getActivityColor(activity.type)}
                      weight={2}
                      opacity={0.8}
                      fillOpacity={0.6}
                    >
                      <Popup>
                        <div className="p-2">
                          <h4 className="font-bold text-lg capitalize mb-2">
                            {activity.type.replace('-', ' ')}
                          </h4>
                          <p><strong>Location:</strong> {activity.location}</p>
                          <p><strong>Severity:</strong> 
                            <span className={`ml-1 capitalize ${
                              activity.severity === 'high' ? 'text-red-500' :
                              activity.severity === 'medium' ? 'text-yellow-500' : 'text-green-500'
                            }`}>
                              {activity.severity}
                            </span>
                          </p>
                          <p><strong>Detection Time:</strong> {new Date(activity.timestamp).toLocaleString()}</p>
                          {activity.description && (
                            <p className="mt-2 text-sm text-gray-600">{activity.description}</p>
                          )}
                        </div>
                      </Popup>
                    </CircleMarker>
                  ))}
                </MapContainer>
              </div>

              {/* Activity Counter */}
              <div className="mt-4 text-center">
                <span className="text-misty-white/80 text-sm">
                  Showing {filteredActivities.length} activities
                  {selectedActivityType !== 'all' && ` (${selectedActivityType.replace('-', ' ')})`}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ForestActivityHeatmap;
