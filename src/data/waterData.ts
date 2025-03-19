import type { WaterObject, WaterBody } from '../types/government';

export const waterObjects: WaterObject[] = [
  {
    id: 'ps_tashkent_1',
    name: 'Насосная станция Ташкент-1',
    type: 'pump_station',
    status: 'active',
    location: {
      lat: 41.3111,
      lng: 69.2406,
      city: 'Ташкент',
      region: 'Ташкентская область'
    },
    metrics: {
      efficiency: 0.85,
      quality: 85,
      consumption: 1000,
      energyUsage: 750,
      waterFlow: 850,
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15'
    },
    connectedObjects: ['wtp_samarkand'],
    reports: {
      daily: '/reports/ps_tashkent_1/daily',
      monthly: '/reports/ps_tashkent_1/monthly',
      quarterly: '/reports/ps_tashkent_1/quarterly',
      yearly: '/reports/ps_tashkent_1/yearly'
    }
  },
  {
    id: 'wtp_samarkand',
    name: 'Очистные сооружения Самарканд',
    type: 'treatment_plant',
    status: 'active',
    location: {
      lat: 39.6547,
      lng: 66.9758,
      city: 'Самарканд',
      region: 'Самаркандская область'
    },
    metrics: {
      efficiency: 0.9,
      quality: 90,
      consumption: 800,
      energyUsage: 600,
      waterFlow: 0,
      lastMaintenance: '2024-03-01',
      nextMaintenance: '2024-03-15'
    },
    connectedObjects: ['ps_tashkent_1', 'res_bukhara'],
    reports: {
      daily: '/reports/wtp_samarkand/daily',
      monthly: '/reports/wtp_samarkand/monthly',
      quarterly: '/reports/wtp_samarkand/quarterly',
      yearly: '/reports/wtp_samarkand/yearly'
    }
  }
];

export const waterBodies: WaterBody[] = [
  {
    id: 'amudarya',
    name: 'Амударья',
    type: 'river',
    coordinates: [
      [58.3, 37.1],
      [60.5, 38.2],
      [62.7, 39.3],
      [64.9, 40.4]
    ],
    metrics: {
      efficiency: 0.8,
      quality: 75,
      consumption: 5000,
      energyUsage: 0,
      waterFlow: 703,
      waterLevel: 5.2
    }
  },
  {
    id: 'sirdarya',
    name: 'Сырдарья',
    type: 'river',
    coordinates: [
      [68.8, 40.2],
      [69.5, 41.1],
      [70.2, 42.0],
      [70.9, 42.9]
    ],
    metrics: {
      efficiency: 0.75,
      quality: 82,
      consumption: 4000,
      energyUsage: 0,
      waterFlow: 2525,
      waterLevel: 6.8
    }
  }
]; 