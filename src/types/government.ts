export type AccessLevel = 
  | 'STATION_DIRECTOR'
  | 'OFFICIAL'
  | 'MAYOR'
  | 'GOVERNOR'
  | 'MINISTER'
  | 'PRIME_MINISTER';

export interface AccessLevelInfo {
  id: AccessLevel;
  title: string;
  description: string;
  permissions: string[];
  scope: 'station' | 'city' | 'region' | 'ministry' | 'country';
}

export interface WaterMetrics {
  efficiency: number;
  quality: number;
  consumption: number;
  energyUsage: number;
  waterFlow?: number;
  waterLevel?: number;
  flowRate?: number;
  lastMaintenance?: string;
  nextMaintenance?: string;
  waterQuality?: number;
  energyConsumption?: number;
}

export interface Location {
  lat: number;
  lng: number;
  city?: string;
  region?: string;
}

export interface WaterObject {
  id: string;
  name: string;
  type: 'station' | 'treatment' | 'reservoir' | 'pump_station' | 'treatment_plant' | 'research_institute';
  status: 'active' | 'maintenance' | 'offline' | 'construction';
  location: Location;
  metrics: WaterMetrics;
  connectedObjects: string[];
  reports: {
    daily?: string;
    monthly?: string;
    quarterly?: string;
    yearly?: string;
    date?: string;
    type?: string;
    content?: string;
  };
}

export interface WaterBody {
  id: string;
  name: string;
  type: 'river' | 'lake';
  coordinates: [number, number][];
  metrics: WaterMetrics;
}

export interface ResearchProject {
  id: string;
  title: string;
  institute: string;
  status: 'proposed' | 'active' | 'completed';
  startDate: string;
  endDate: string;
  budget: number;
  description: string;
  results: string[];
  location: Location;
}

export interface RegionData {
  id: string;
  name: string;
  population: number;
  waterConsumption: {
    total: number; // м³/день
    residential: number;
    industrial: number;
    agricultural: number;
  };
  waterSources: {
    surface: number; // %
    underground: number;
    imported: number;
  };
  infrastructure: {
    pumpStations: number;
    treatmentPlants: number;
    pipelines: number; // км
    reservoirs: number;
  };
  qualityIndices: {
    drinking: number; // 0-100
    irrigation: number;
    environmental: number;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  location: Location;
  budget: number;
  timeline: string;
  participants: string[];
  progress: number;
  status: 'active' | 'pending' | 'maintenance' | 'completed' | 'upcoming';
  category: 'government' | 'research' | 'business';
  stakingInfo?: {
    totalStaked: number;
    apy: number;
    minStake: number;
  };
} 