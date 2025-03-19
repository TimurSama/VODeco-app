import type { Location } from './government';

export interface Project {
  id: string;
  title: string;
  description: string;
  location: Location;
  budget: number;
  timeline: string;
  participants: string[];
  progress: number;
  status: 'active' | 'upcoming' | 'maintenance';
  category: string;
  stakingInfo?: {
    totalStaked: number;
    apy: number;
    minStake: number;
  };
} 