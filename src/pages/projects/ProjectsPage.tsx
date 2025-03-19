import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MapIcon,
  ChartBarIcon,
  DocumentIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  UserGroupIcon,
  XIcon,
  ClockIcon,
  TrendingUpIcon,
} from '@heroicons/react/outline';
import UzbekistanMap from '../../components/map/UzbekistanMap';
import RegionDynamicsScale from '../../components/RegionDynamicsScale';
import type { WaterObject, WaterBody, Location } from '../../types/government';

interface ProjectData {
  id: string;
  title: string;
  description: string;
  location: Location;
  totalInvestment: number;
  availableInvestment: number;
  timeline: string;
  status: 'active' | 'completed' | 'upcoming';
  category: string;
  stakingInfo: {
    baseApy: number;
    maxApy: number;
    minStake: number;
    maxStake: number;
    lockPeriods: {
      months: number;
      apy: number;
    }[];
    boosts: {
      name: string;
      description: string;
      bonus: number;
    }[];
  };
}

const projects: ProjectData[] = [
  {
    id: 'pumping-station-2',
    title: 'Насосная станция №2',
    description: 'Модернизация насосной станции в Джизакской области',
    location: {
      lat: 40.1158,
      lng: 67.8422,
      city: 'Джизак',
      region: 'Джизакская область'
    },
    totalInvestment: 7760600,
    availableInvestment: 41574642,
    timeline: '2025-2035',
    status: 'active',
    category: 'irrigation',
    stakingInfo: {
      baseApy: 5,
      maxApy: 15,
      minStake: 100,
      maxStake: 1000000,
      lockPeriods: [
        { months: 6, apy: 5 },
        { months: 12, apy: 8 },
        { months: 24, apy: 12 },
        { months: 36, apy: 15 }
      ],
      boosts: [
        { name: 'Ранний инвестор', description: 'Дополнительный бонус для первых инвесторов', bonus: 2 },
        { name: 'Крупный стейк', description: 'Бонус за стейк более 10,000 VOD', bonus: 1.5 },
        { name: 'Программа лояльности', description: 'Бонус для держателей VOD более 6 месяцев', bonus: 1 }
      ]
    }
  },
  {
    id: 'korovulbozor',
    title: 'Насосная станция Коровулбозор',
    description: 'Модернизация насосной станции в Бухарской области',
    location: {
      lat: 39.7758,
      lng: 64.4233,
      city: 'Бухара',
      region: 'Бухарская область'
    },
    totalInvestment: 6189700,
    availableInvestment: 33159107,
    timeline: '2025-2035',
    status: 'active',
    category: 'irrigation',
    stakingInfo: {
      baseApy: 5,
      maxApy: 15,
      minStake: 100,
      maxStake: 1000000,
      lockPeriods: [
        { months: 6, apy: 5 },
        { months: 12, apy: 8 },
        { months: 24, apy: 12 },
        { months: 36, apy: 15 }
      ],
      boosts: [
        { name: 'Ранний инвестор', description: 'Дополнительный бонус для первых инвесторов', bonus: 2 },
        { name: 'Крупный стейк', description: 'Бонус за стейк более 10,000 VOD', bonus: 1.5 },
        { name: 'Программа лояльности', description: 'Бонус для держателей VOD более 6 месяцев', bonus: 1 }
      ]
    }
  },
  {
    id: 'kuyumazar-aux',
    title: 'Вспомогательная насосная станция Куюмазар',
    description: 'Модернизация вспомогательной насосной станции в Бухарской области',
    location: {
      lat: 39.7758,
      lng: 64.4233,
      city: 'Бухара',
      region: 'Бухарская область'
    },
    totalInvestment: 11965400,
    availableInvestment: 66100357,
    timeline: '2025-2035',
    status: 'active',
    category: 'irrigation',
    stakingInfo: {
      baseApy: 5,
      maxApy: 15,
      minStake: 100,
      maxStake: 1000000,
      lockPeriods: [
        { months: 6, apy: 5 },
        { months: 12, apy: 8 },
        { months: 24, apy: 12 },
        { months: 36, apy: 15 }
      ],
      boosts: [
        { name: 'Ранний инвестор', description: 'Дополнительный бонус для первых инвесторов', bonus: 2 },
        { name: 'Крупный стейк', description: 'Бонус за стейк более 10,000 VOD', bonus: 1.5 },
        { name: 'Программа лояльности', description: 'Бонус для держателей VOD более 6 месяцев', bonus: 1 }
      ]
    }
  },
  {
    id: 'kuyumazar',
    title: 'Насосная станция Куюмазар',
    description: 'Модернизация насосной станции в Бухарской области',
    location: {
      lat: 40.1158,
      lng: 67.8422,
      city: 'Джизак',
      region: 'Джизакская область'
    },
    totalInvestment: 7760600,
    availableInvestment: 41574642,
    timeline: '2025-2035',
    status: 'active',
    category: 'irrigation',
    stakingInfo: {
      baseApy: 5,
      maxApy: 15,
      minStake: 100,
      maxStake: 1000000,
      lockPeriods: [
        { months: 6, apy: 5 },
        { months: 12, apy: 8 },
        { months: 24, apy: 12 },
        { months: 36, apy: 15 }
      ],
      boosts: [
        { name: 'Ранний инвестор', description: 'Дополнительный бонус для первых инвесторов', bonus: 2 },
        { name: 'Крупный стейк', description: 'Бонус за стейк более 10,000 VOD', bonus: 1.5 },
        { name: 'Программа лояльности', description: 'Бонус для держателей VOD более 6 месяцев', bonus: 1 }
      ]
    }
  },
  {
    id: 'jondor-1',
    title: 'Насосная станция Джондор-1',
    description: 'Модернизация насосной станции в Бухарской области',
    location: {
      lat: 39.7758,
      lng: 64.4233,
      city: 'Бухара',
      region: 'Бухарская область'
    },
    totalInvestment: 15265800,
    availableInvestment: 81781071,
    timeline: '2025-2035',
    status: 'active',
    category: 'irrigation',
    stakingInfo: {
      baseApy: 5,
      maxApy: 15,
      minStake: 100,
      maxStake: 1000000,
      lockPeriods: [
        { months: 6, apy: 5 },
        { months: 12, apy: 8 },
        { months: 24, apy: 12 },
        { months: 36, apy: 15 }
      ],
      boosts: [
        { name: 'Ранний инвестор', description: 'Дополнительный бонус для первых инвесторов', bonus: 2 },
        { name: 'Крупный стейк', description: 'Бонус за стейк более 10,000 VOD', bonus: 1.5 },
        { name: 'Программа лояльности', description: 'Бонус для держателей VOD более 6 месяцев', bonus: 1 }
      ]
    }
  },
  {
    id: 'amu-bukhara-1',
    title: 'Насосная станция Аму-Бухара-1',
    description: 'Модернизация насосной станции в Бухарской области',
    location: {
      lat: 40.1158,
      lng: 67.8422,
      city: 'Джизак',
      region: 'Джизакская область'
    },
    totalInvestment: 9490100,
    availableInvestment: 50839821,
    timeline: '2025-2035',
    status: 'active',
    category: 'irrigation',
    stakingInfo: {
      baseApy: 5,
      maxApy: 15,
      minStake: 100,
      maxStake: 1000000,
      lockPeriods: [
        { months: 6, apy: 5 },
        { months: 12, apy: 8 },
        { months: 24, apy: 12 },
        { months: 36, apy: 15 }
      ],
      boosts: [
        { name: 'Ранний инвестор', description: 'Дополнительный бонус для первых инвесторов', bonus: 2 },
        { name: 'Крупный стейк', description: 'Бонус за стейк более 10,000 VOD', bonus: 1.5 },
        { name: 'Программа лояльности', description: 'Бонус для держателей VOD более 6 месяцев', bonus: 1 }
      ]
    }
  }
];

// Преобразуем проекты в водные объекты для карты
const projectsToWaterObjects = (projects: ProjectData[]): WaterObject[] => {
  return projects.map(project => ({
    id: project.id,
    name: project.title,
    type: 'station',
    status: project.status === 'active' ? 'active' : 
           project.status === 'upcoming' ? 'construction' : 'maintenance',
    location: project.location,
    metrics: {
      efficiency: 0.85,
      quality: 85,
      consumption: 1000,
      energyUsage: 750
    },
    connectedObjects: [],
    reports: {}
  }));
};

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU').format(num);
  };

  const waterObjects = projectsToWaterObjects(projects);
  const waterBodies: WaterBody[] = [
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
        efficiency: 80,
        quality: 75,
        consumption: 5000,
        energyUsage: 0
      }
    }
  ];

  const regionDynamics = [
    { label: 'Эффективность водопользования', value: 45 },
    { label: 'Качество воды', value: 30 },
    { label: 'Энергоэффективность', value: 65 }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Карта */}
        <div className="lg:col-span-2 h-[600px] bg-night-blue rounded-lg overflow-hidden">
          <UzbekistanMap
            accessLevel="OFFICIAL"
            waterObjects={waterObjects}
            waterBodies={waterBodies}
            onObjectClick={(obj) => {
              const project = projects.find(p => p.id === obj.id);
              if (project) setSelectedProject(project);
            }}
            selectedObject={selectedProject?.id}
          />
        </div>

        {/* Шкалы динамики */}
        <div className="space-y-4">
          {regionDynamics.map((dynamic, index) => (
            <RegionDynamicsScale
              key={index}
              value={dynamic.value}
              label={dynamic.label}
            />
          ))}
        </div>
      </div>

      {/* Список проектов */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div
            key={project.id}
            className={`bg-night-blue p-6 rounded-lg shadow-eco hover:shadow-eco-hover transition-all cursor-pointer ${
              selectedProject?.id === project.id ? 'ring-2 ring-eco-green' : ''
            }`}
            onClick={() => setSelectedProject(project)}
          >
            <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-eco-green">{formatNumber(project.availableInvestment)} VOD</span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                project.status === 'active' ? 'bg-eco-green/20 text-eco-green' :
                project.status === 'upcoming' ? 'bg-yellow-500/20 text-yellow-500' :
                'bg-red-500/20 text-red-500'
              }`}>
                {project.status === 'active' ? 'Активен' :
                 project.status === 'upcoming' ? 'В ожидании' :
                 'На обслуживании'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно с деталями проекта */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 flex items-center justify-center p-4 z-50 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-glass rounded-lg p-6 max-w-2xl w-full relative border border-white/10 my-8">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                >
                  <XIcon className="h-6 w-6" />
                </button>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2 neon-text">{selectedProject.title}</h2>
                    <p className="text-gray-400">{selectedProject.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="modal-glass p-4 rounded-lg border border-white/5">
                      <h3 className="text-sm text-gray-400 mb-1">Общие инвестиции</h3>
                      <p className="text-lg font-semibold text-white/90">${formatNumber(selectedProject.totalInvestment)}</p>
                    </div>
                    <div className="modal-glass p-4 rounded-lg border border-white/5">
                      <h3 className="text-sm text-gray-400 mb-1">Доступно для стейкинга</h3>
                      <p className="text-lg font-semibold text-white/90">{formatNumber(selectedProject.availableInvestment)} VOD</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold neon-text">Условия стейкинга</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedProject.stakingInfo.lockPeriods.map((period, index) => (
                        <div key={index} className="modal-glass p-4 rounded-lg border border-white/5">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">{period.months} месяцев</span>
                            <span className="text-lg font-semibold text-eco-blue">{period.apy}% APY</span>
                          </div>
                          <div className="text-xs text-gray-400">
                            Минимальный стейк: {formatNumber(selectedProject.stakingInfo.minStake)} VOD
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold neon-text">Доступные бусты</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {selectedProject.stakingInfo.boosts.map((boost, index) => (
                        <div key={index} className="modal-glass p-4 rounded-lg border border-white/5">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-white/90">{boost.name}</span>
                            <span className="text-eco-green">+{boost.bonus}%</span>
                          </div>
                          <p className="text-sm text-gray-400">{boost.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedProject(null);
                        navigate('/staking');
                      }}
                      className="px-6 py-3 bg-gradient-eco rounded-lg font-semibold text-white shadow-eco hover:shadow-eco-hover transition-all duration-300"
                    >
                      Инвестировать
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 