import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChartBarIcon,
  DocumentTextIcon,
  MapIcon,
  UserIcon,
  XIcon,
} from '@heroicons/react/outline';
import UzbekistanMap from '../../components/map/UzbekistanMap';
import { AccessLevel, AccessLevelInfo, WaterObject } from '../../types/government';
import { waterObjects, waterBodies } from '../../data/waterData';

const accessLevels: AccessLevelInfo[] = [
  {
    id: 'STATION_DIRECTOR',
    title: 'Директор станции',
    description: 'Управление отдельной станцией',
    permissions: ['view_station', 'edit_station', 'view_region_summary'],
    scope: 'station'
  },
  {
    id: 'OFFICIAL',
    title: 'Чиновник',
    description: 'Мониторинг водных ресурсов',
    permissions: ['view_city', 'view_reports'],
    scope: 'city'
  },
  {
    id: 'MAYOR',
    title: 'Мэр',
    description: 'Управление городской инфраструктурой',
    permissions: ['view_city', 'edit_city', 'view_reports', 'approve_projects'],
    scope: 'city'
  },
  {
    id: 'GOVERNOR',
    title: 'Губернатор',
    description: 'Управление регионом',
    permissions: ['view_region', 'edit_region', 'approve_projects', 'manage_resources'],
    scope: 'region'
  },
  {
    id: 'MINISTER',
    title: 'Министр',
    description: 'Управление водными ресурсами страны',
    permissions: ['view_all', 'edit_ministry', 'approve_national_projects'],
    scope: 'ministry'
  },
  {
    id: 'PRIME_MINISTER',
    title: 'Премьер-министр',
    description: 'Полный доступ ко всем системам',
    permissions: ['view_all', 'edit_all', 'approve_all', 'manage_all'],
    scope: 'country'
  }
];

export default function GovernmentPage() {
  const [selectedAccess, setSelectedAccess] = useState<AccessLevel>('STATION_DIRECTOR');
  const [selectedObject, setSelectedObject] = useState<WaterObject | null>(null);
  const [selectedTab, setSelectedTab] = useState<'map' | 'analytics' | 'reports'>('map');

  const handleObjectClick = (object: WaterObject) => {
    if (hasAccessToObject(selectedAccess, object)) {
      setSelectedObject(object);
    }
  };

  const hasAccessToObject = (accessLevel: AccessLevel, object: WaterObject): boolean => {
    const access = accessLevels.find(a => a.id === accessLevel);
    if (!access) return false;

    switch (access.scope) {
      case 'station':
        return object.id === 'ps_tashkent_1'; // Для примера
      case 'city':
        return object.location.city === 'Ташкент' || object.location.city === 'Самарканд';
      case 'region':
        return object.location.region === 'Ташкентская область' || 
               object.location.region === 'Самаркандская область';
      case 'ministry':
      case 'country':
        return true;
      default:
        return false;
    }
  };

  const getFilteredObjects = () => {
    return waterObjects.filter((obj: WaterObject) => hasAccessToObject(selectedAccess, obj));
  };

  return (
    <div className="min-h-screen space-y-6 py-6 px-4">
      {/* Заголовок */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 neon-text">Государственный сектор</h1>
        <p className="text-gray-400">
          Система управления водными ресурсами Узбекистана
        </p>
      </div>

      {/* Выбор уровня доступа */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Уровень доступа</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {accessLevels.map((level) => (
            <motion.button
              key={level.id}
              onClick={() => setSelectedAccess(level.id)}
              className={`p-4 rounded-lg ${
                selectedAccess === level.id
                  ? 'bg-gradient-eco text-white'
                  : 'modal-glass text-gray-400 hover:text-white'
              } transition-all duration-300`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <UserIcon className="h-6 w-6" />
                <span className="font-medium">{level.title}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Вкладки */}
      <div className="max-w-7xl mx-auto">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setSelectedTab('map')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              selectedTab === 'map' ? 'bg-gradient-eco text-white' : 'modal-glass text-gray-400'
            }`}
          >
            <MapIcon className="h-5 w-5" />
            <span>Карта</span>
          </button>
          <button
            onClick={() => setSelectedTab('analytics')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              selectedTab === 'analytics' ? 'bg-gradient-eco text-white' : 'modal-glass text-gray-400'
            }`}
          >
            <ChartBarIcon className="h-5 w-5" />
            <span>Аналитика</span>
          </button>
          <button
            onClick={() => setSelectedTab('reports')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              selectedTab === 'reports' ? 'bg-gradient-eco text-white' : 'modal-glass text-gray-400'
            }`}
          >
            <DocumentTextIcon className="h-5 w-5" />
            <span>Отчеты</span>
          </button>
        </div>

        {/* Контент вкладок */}
        <div className="h-[600px] rounded-lg modal-glass p-4">
          {selectedTab === 'map' && (
            <UzbekistanMap
              accessLevel={selectedAccess}
              waterObjects={getFilteredObjects()}
              waterBodies={waterBodies}
              onObjectClick={handleObjectClick}
              selectedObject={selectedObject?.id}
            />
          )}
          {selectedTab === 'analytics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredObjects().map((object: WaterObject) => (
                <div key={object.id} className="p-4 rounded-lg modal-glass overflow-hidden">
                  <h3 className="text-lg font-semibold mb-2 truncate">{object.name}</h3>
                  <div className="space-y-2">
                    <p className="truncate">Эффективность: {(object.metrics.efficiency * 100).toFixed(1)}%</p>
                    <p className="truncate">Расход воды: {object.metrics.waterFlow} м³/час</p>
                    <p className="truncate">Потребление энергии: {object.metrics.energyUsage} кВт/ч</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {selectedTab === 'reports' && (
            <div className="space-y-4">
              {getFilteredObjects().map((object: WaterObject) => (
                <div key={object.id} className="p-4 rounded-lg modal-glass overflow-hidden">
                  <h3 className="text-lg font-semibold mb-2 truncate">{object.name}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <a href={object.reports.daily} className="text-blue-400 hover:text-blue-300 truncate">
                      Ежедневный отчет
                    </a>
                    <a href={object.reports.monthly} className="text-blue-400 hover:text-blue-300 truncate">
                      Ежемесячный отчет
                    </a>
                    <a href={object.reports.quarterly} className="text-blue-400 hover:text-blue-300 truncate">
                      Квартальный отчет
                    </a>
                    <a href={object.reports.yearly} className="text-blue-400 hover:text-blue-300 truncate">
                      Годовой отчет
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Модальное окно с деталями объекта */}
      <AnimatePresence>
        {selectedObject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSelectedObject(null)} />
            <div className="modal-glass rounded-lg p-6 max-w-2xl w-full relative overflow-hidden">
              <button
                onClick={() => setSelectedObject(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <XIcon className="h-6 w-6" />
              </button>
              <h2 className="text-2xl font-bold mb-4 truncate">{selectedObject.name}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 truncate">Основная информация</h3>
                  <p className="truncate">Тип: {selectedObject.type}</p>
                  <p className="truncate">Статус: {selectedObject.status}</p>
                  <p className="truncate">Регион: {selectedObject.location.region}</p>
                  {selectedObject.location.city && <p className="truncate">Город: {selectedObject.location.city}</p>}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 truncate">Метрики</h3>
                  <p className="truncate">Эффективность: {(selectedObject.metrics.efficiency * 100).toFixed(1)}%</p>
                  <p className="truncate">Расход воды: {selectedObject.metrics.waterFlow} м³/час</p>
                  <p className="truncate">Потребление энергии: {selectedObject.metrics.energyUsage} кВт/ч</p>
                </div>
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold mb-2">Связанные объекты</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedObject.connectedObjects.map(id => {
                      const connectedObject = waterObjects.find((obj: WaterObject) => obj.id === id);
                      return connectedObject ? (
                        <button
                          key={id}
                          onClick={() => setSelectedObject(connectedObject)}
                          className="text-left p-2 rounded bg-opacity-50 bg-blue-900 hover:bg-opacity-75"
                        >
                          {connectedObject.name}
                        </button>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 