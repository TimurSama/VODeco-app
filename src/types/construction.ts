import { Location } from './government';

export interface IoTSensor {
  id: string;
  type: 'water_quality' | 'pressure' | 'flow' | 'temperature' | 'turbidity' | 'ph' | 'conductivity';
  location: Location;
  lastReading: number;
  unit: string;
  status: 'active' | 'maintenance' | 'error';
  lastUpdate: string;
  blockchain_hash: string;
}

export interface ConstructionStage {
  id: string;
  name: string;
  status: 'planned' | 'in_progress' | 'completed' | 'delayed';
  startDate: string;
  endDate: string;
  progress: number;
  contractor: string;
  budget: {
    planned: number;
    spent: number;
    currency: string;
  };
  sensors: IoTSensor[];
  qualityMetrics: {
    waterQuality: number;
    structuralIntegrity: number;
    environmentalImpact: number;
  };
  documents: {
    permits: string[];
    reports: string[];
    inspections: string[];
  };
}

export interface ConstructionProject {
  id: string;
  title: string;
  description: string;
  location: Location;
  type: 'new_construction' | 'modernization' | 'repair';
  status: 'preparation' | 'active' | 'completed' | 'suspended';
  totalBudget: number;
  spentBudget: number;
  startDate: string;
  estimatedEndDate: string;
  stages: ConstructionStage[];
  mainContractor: string;
  innovations: {
    name: string;
    description: string;
    impact: string;
  }[];
  blockchainData: {
    contractAddress: string;
    transactionsCount: number;
    lastUpdate: string;
  };
} 