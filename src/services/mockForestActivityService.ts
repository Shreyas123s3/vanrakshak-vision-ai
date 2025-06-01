
import { ActivityData, ActivityType, SeverityLevel } from '@/types/forestActivity';

// Indian forest locations with coordinates
const forestLocations = [
  { name: 'Sundarbans, West Bengal', lat: 21.9497, lng: 88.4297 },
  { name: 'Jim Corbett, Uttarakhand', lat: 29.5951, lng: 78.7718 },
  { name: 'Kaziranga, Assam', lat: 26.5774, lng: 93.1717 },
  { name: 'Bandipur, Karnataka', lat: 11.6854, lng: 76.6847 },
  { name: 'Ranthambore, Rajasthan', lat: 26.0173, lng: 76.5026 },
  { name: 'Periyar, Kerala', lat: 9.5009, lng: 77.2378 },
  { name: 'Gir Forest, Gujarat', lat: 21.1249, lng: 70.7947 },
  { name: 'Tadoba, Maharashtra', lat: 20.2133, lng: 79.3270 },
  { name: 'Bandhavgarh, Madhya Pradesh', lat: 23.7117, lng: 81.0318 },
  { name: 'Nagarhole, Karnataka', lat: 12.0262, lng: 76.1090 },
  { name: 'Mudumalai, Tamil Nadu', lat: 11.5744, lng: 76.5390 },
  { name: 'Silent Valley, Kerala', lat: 11.0933, lng: 76.4497 },
  { name: 'Simlipal, Odisha', lat: 21.8631, lng: 86.2269 },
  { name: 'Pench, Madhya Pradesh', lat: 21.6425, lng: 79.2955 },
  { name: 'Sariska, Rajasthan', lat: 27.3048, lng: 76.3908 }
];

const activityTypes: ActivityType[] = [
  'poaching',
  'animal-movement',
  'illegal-logging',
  'vehicle-intrusion',
  'fire-detection',
  'conservation-patrol'
];

const severityLevels: SeverityLevel[] = ['low', 'medium', 'high'];

const activityDescriptions = {
  'poaching': [
    'Suspicious human activity detected near wildlife corridor',
    'Unauthorized weapons detected by thermal imaging',
    'Unusual movement patterns suggesting hunting activity'
  ],
  'animal-movement': [
    'Tiger family moving through protected zone',
    'Elephant herd migration detected',
    'Leopard spotted in new territory'
  ],
  'illegal-logging': [
    'Chainsaw sounds detected in restricted area',
    'Unauthorized tree cutting activity',
    'Illegal timber transport vehicles spotted'
  ],
  'vehicle-intrusion': [
    'Unauthorized vehicle entered protected zone',
    'Motorcycle activity in core area',
    'Suspicious vehicle movement at night'
  ],
  'fire-detection': [
    'Smoke detected in forest area',
    'Temperature anomaly suggesting fire',
    'Potential wildfire risk identified'
  ],
  'conservation-patrol': [
    'Ranger patrol completed successfully',
    'Camera trap maintenance completed',
    'Wildlife monitoring checkpoint active'
  ]
};

class MockForestActivityService {
  private activities: ActivityData[] = [];
  private lastActivityId = 0;

  generateRandomActivity(): ActivityData {
    const location = forestLocations[Math.floor(Math.random() * forestLocations.length)];
    const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    const severity = severityLevels[Math.floor(Math.random() * severityLevels.length)];
    const descriptions = activityDescriptions[type];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    
    // Add some randomness to coordinates for realistic spread
    const latOffset = (Math.random() - 0.5) * 0.1;
    const lngOffset = (Math.random() - 0.5) * 0.1;

    return {
      id: `activity_${++this.lastActivityId}_${Date.now()}`,
      type,
      latitude: location.lat + latOffset,
      longitude: location.lng + lngOffset,
      location: location.name,
      severity,
      timestamp: new Date().toISOString(),
      description,
      confidence: Math.floor(Math.random() * 30) + 70 // 70-99% confidence
    };
  }

  async getActivities(): Promise<ActivityData[]> {
    // Generate initial dataset
    if (this.activities.length === 0) {
      const initialCount = 50;
      for (let i = 0; i < initialCount; i++) {
        const activity = this.generateRandomActivity();
        // Spread activities over the last 24 hours
        const hoursAgo = Math.floor(Math.random() * 24);
        activity.timestamp = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString();
        this.activities.push(activity);
      }
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...this.activities];
  }

  async getRealtimeUpdates(): Promise<ActivityData[]> {
    // Simulate real-time updates (1-3 new activities)
    const updateCount = Math.floor(Math.random() * 3) + 1;
    const newActivities: ActivityData[] = [];

    for (let i = 0; i < updateCount; i++) {
      // Higher chance of conservation patrol and animal movement
      let type: ActivityType;
      const rand = Math.random();
      if (rand < 0.3) {
        type = 'animal-movement';
      } else if (rand < 0.5) {
        type = 'conservation-patrol';
      } else {
        type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      }

      const location = forestLocations[Math.floor(Math.random() * forestLocations.length)];
      const severity: SeverityLevel = type === 'poaching' || type === 'fire-detection' 
        ? (Math.random() > 0.7 ? 'high' : 'medium')
        : severityLevels[Math.floor(Math.random() * severityLevels.length)];

      const descriptions = activityDescriptions[type];
      const description = descriptions[Math.floor(Math.random() * descriptions.length)];
      
      const latOffset = (Math.random() - 0.5) * 0.1;
      const lngOffset = (Math.random() - 0.5) * 0.1;

      const activity: ActivityData = {
        id: `realtime_${++this.lastActivityId}_${Date.now()}`,
        type,
        latitude: location.lat + latOffset,
        longitude: location.lng + lngOffset,
        location: location.name,
        severity,
        timestamp: new Date().toISOString(),
        description,
        confidence: Math.floor(Math.random() * 30) + 70
      };

      newActivities.push(activity);
      this.activities.push(activity);
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    console.log(`Generated ${newActivities.length} new forest activities:`, newActivities);
    return newActivities;
  }

  async getActivityStats(): Promise<any> {
    const activities = await this.getActivities();
    
    const stats = {
      total: activities.length,
      byType: activityTypes.reduce((acc, type) => {
        acc[type] = activities.filter(a => a.type === type).length;
        return acc;
      }, {} as Record<ActivityType, number>),
      bySeverity: severityLevels.reduce((acc, severity) => {
        acc[severity] = activities.filter(a => a.severity === severity).length;
        return acc;
      }, {} as Record<SeverityLevel, number>)
    };

    return stats;
  }
}

export const mockForestActivityService = new MockForestActivityService();
