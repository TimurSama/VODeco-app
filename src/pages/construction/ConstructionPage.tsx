import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChartBarIcon,
  CogIcon,
  DocumentIcon,
  CurrencyDollarIcon,
  ClockIcon,
  MapIcon,
  XIcon,
  ArrowUpIcon,
  BeakerIcon,
  ChipIcon
} from '@heroicons/react/outline';
import { constructionProjects } from '../../data/constructionProjects';
import { ConstructionProject, IoTSensor } from '../../types/construction';

export default function ConstructionPage() {
  const [selectedProject, setSelectedProject] = useState<ConstructionProject | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'stages' | 'sensors' | 'blockchain'>('overview');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-500',
      completed: 'bg-blue-500',
      preparation: 'bg-yellow-500',
      suspended: 'bg-red-500',
      in_progress: 'bg-green-500',
      planned: 'bg-yellow-500',
      delayed: 'bg-red-500'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500';
  };

  const renderSensorValue = (sensor: IoTSensor) => {
    return (
      <div className="flex items-center space-x-2">
        <BeakerIcon className="h-5 w-5 text-teal-500" />
        <span>{sensor.lastReading} {sensor.unit}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <CogIcon className="h-16 w-16 mx-auto text-teal-500 mb-4" />
          <h1 className="text-3xl font-bold mb-4">
            Строительство и модернизация
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Инновационные проекты по строительству и модернизации водной инфраструктуры
            с применением IoT-технологий и блокчейн для обеспечения прозрачности
          </p>
        </div>

        {/* Список проектов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {constructionProjects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedProject(project)}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 cursor-pointer
                       hover:border-teal-500/50 hover:bg-gray-900/70"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold mb-2 flex-1">{project.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(project.status)} bg-opacity-20`}>
                  {project.status === 'active' ? 'Активен' :
                   project.status === 'completed' ? 'Завершен' :
                   project.status === 'preparation' ? 'Подготовка' : 'Приостановлен'}
                </span>
              </div>

              <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-400">
                  <MapIcon className="h-5 w-5 mr-2 text-teal-500" />
                  {project.location.city}, {project.location.region}
                </div>

                <div className="flex items-center text-sm text-gray-400">
                  <CurrencyDollarIcon className="h-5 w-5 mr-2 text-teal-500" />
                  {formatCurrency(project.totalBudget)}
                </div>

                <div className="flex items-center text-sm text-gray-400">
                  <ClockIcon className="h-5 w-5 mr-2 text-teal-500" />
                  {new Date(project.startDate).toLocaleDateString('ru-RU')} - 
                  {new Date(project.estimatedEndDate).toLocaleDateString('ru-RU')}
                </div>

                <div className="flex items-center text-sm text-gray-400">
                  <ChipIcon className="h-5 w-5 mr-2 text-teal-500" />
                  {project.stages.reduce((acc, stage) => acc + stage.sensors.length, 0)} IoT-датчиков
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Модальное окно с деталями проекта */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-900/90 border border-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              {/* Заголовок модального окна */}
              <div className="p-6 border-b border-gray-800 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedProject.status)} bg-opacity-20`}>
                    {selectedProject.status === 'active' ? 'Активен' :
                     selectedProject.status === 'completed' ? 'Завершен' :
                     selectedProject.status === 'preparation' ? 'Подготовка' : 'Приостановлен'}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <XIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Навигация */}
              <div className="border-b border-gray-800">
                <div className="flex">
                  {['overview', 'stages', 'sensors', 'blockchain'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab as any)}
                      className={`px-6 py-3 text-sm font-medium ${
                        selectedTab === tab
                          ? 'text-teal-500 border-b-2 border-teal-500'
                          : 'text-gray-400 hover:text-gray-300'
                      }`}
                    >
                      {tab === 'overview' ? 'Обзор' :
                       tab === 'stages' ? 'Этапы' :
                       tab === 'sensors' ? 'IoT-датчики' : 'Блокчейн'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Контент */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                {selectedTab === 'overview' && (
                  <div className="space-y-6">
                    <p className="text-gray-400">{selectedProject.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Основная информация</h3>
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-400">
                            <MapIcon className="h-5 w-5 mr-2 text-teal-500" />
                            {selectedProject.location.city}, {selectedProject.location.region}
                          </div>
                          <div className="flex items-center text-gray-400">
                            <CurrencyDollarIcon className="h-5 w-5 mr-2 text-teal-500" />
                            Бюджет: {formatCurrency(selectedProject.totalBudget)}
                          </div>
                          <div className="flex items-center text-gray-400">
                            <ClockIcon className="h-5 w-5 mr-2 text-teal-500" />
                            Сроки: {new Date(selectedProject.startDate).toLocaleDateString('ru-RU')} - 
                            {new Date(selectedProject.estimatedEndDate).toLocaleDateString('ru-RU')}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Инновации</h3>
                        <div className="space-y-4">
                          {selectedProject.innovations.map((innovation, index) => (
                            <div key={index} className="space-y-2">
                              <h4 className="font-medium text-teal-500">{innovation.name}</h4>
                              <p className="text-sm text-gray-400">{innovation.description}</p>
                              <p className="text-sm text-teal-400">{innovation.impact}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'stages' && (
                  <div className="space-y-6">
                    {selectedProject.stages.map((stage) => (
                      <div
                        key={stage.id}
                        className="border border-gray-800 rounded-lg p-4 space-y-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{stage.name}</h3>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                              getStatusColor(stage.status)
                            } bg-opacity-20 mt-2`}>
                              {stage.status === 'completed' ? 'Завершен' :
                               stage.status === 'in_progress' ? 'В процессе' :
                               stage.status === 'planned' ? 'Запланирован' : 'Задержка'}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-400">
                              {new Date(stage.startDate).toLocaleDateString('ru-RU')} - 
                              {new Date(stage.endDate).toLocaleDateString('ru-RU')}
                            </div>
                            <div className="text-sm text-teal-500 mt-1">
                              {formatCurrency(stage.budget.spent)} / {formatCurrency(stage.budget.planned)}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Качество воды</h4>
                            <div className="flex items-center">
                              <div className="h-2 flex-1 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-teal-500"
                                  style={{ width: `${stage.qualityMetrics.waterQuality}%` }}
                                />
                              </div>
                              <span className="ml-2 text-sm text-gray-400">
                                {stage.qualityMetrics.waterQuality}%
                              </span>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Структурная целостность</h4>
                            <div className="flex items-center">
                              <div className="h-2 flex-1 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-500"
                                  style={{ width: `${stage.qualityMetrics.structuralIntegrity}%` }}
                                />
                              </div>
                              <span className="ml-2 text-sm text-gray-400">
                                {stage.qualityMetrics.structuralIntegrity}%
                              </span>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Экологическое воздействие</h4>
                            <div className="flex items-center">
                              <div className="h-2 flex-1 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-green-500"
                                  style={{ width: `${stage.qualityMetrics.environmentalImpact}%` }}
                                />
                              </div>
                              <span className="ml-2 text-sm text-gray-400">
                                {stage.qualityMetrics.environmentalImpact}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedTab === 'sensors' && (
                  <div className="space-y-6">
                    {selectedProject.stages.map((stage) => (
                      <div key={stage.id}>
                        <h3 className="text-lg font-semibold mb-4">{stage.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {stage.sensors.map((sensor) => (
                            <div
                              key={sensor.id}
                              className="border border-gray-800 rounded-lg p-4 space-y-3"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                  {sensor.type === 'water_quality' ? 'Качество воды' :
                                   sensor.type === 'pressure' ? 'Давление' :
                                   sensor.type === 'flow' ? 'Поток' :
                                   sensor.type === 'temperature' ? 'Температура' :
                                   sensor.type === 'turbidity' ? 'Мутность' :
                                   sensor.type === 'ph' ? 'pH' : 'Проводимость'}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  sensor.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                  sensor.status === 'maintenance' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-red-500/20 text-red-400'
                                }`}>
                                  {sensor.status === 'active' ? 'Активен' :
                                   sensor.status === 'maintenance' ? 'Обслуживание' : 'Ошибка'}
                                </span>
                              </div>

                              {renderSensorValue(sensor)}

                              <div className="text-xs text-gray-400">
                                Последнее обновление: {new Date(sensor.lastUpdate).toLocaleString('ru-RU')}
                              </div>

                              <div className="text-xs text-gray-500 truncate">
                                Hash: {sensor.blockchain_hash}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedTab === 'blockchain' && (
                  <div className="space-y-6">
                    <div className="border border-gray-800 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">Данные блокчейна</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Адрес смарт-контракта</h4>
                          <div className="text-gray-400 break-all">
                            {selectedProject.blockchainData.contractAddress}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Количество транзакций</h4>
                          <div className="text-gray-400">
                            {selectedProject.blockchainData.transactionsCount}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Последнее обновление</h4>
                          <div className="text-gray-400">
                            {new Date(selectedProject.blockchainData.lastUpdate).toLocaleString('ru-RU')}
                          </div>
                        </div>

                        <div className="pt-4">
                          <h4 className="text-sm font-medium mb-2">Последние показания датчиков</h4>
                          <div className="space-y-2">
                            {selectedProject.stages.flatMap(stage => stage.sensors).slice(0, 5).map(sensor => (
                              <div
                                key={sensor.id}
                                className="flex items-center justify-between text-sm text-gray-400 border-b border-gray-800 pb-2"
                              >
                                <div>Датчик {sensor.type}</div>
                                <div className="flex items-center space-x-4">
                                  <span>{sensor.lastReading} {sensor.unit}</span>
                                  <span className="text-xs text-gray-500">{sensor.blockchain_hash.slice(0, 10)}...</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 