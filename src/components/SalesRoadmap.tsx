import React from 'react';
import { motion } from 'framer-motion';

interface SaleStage {
  stage: number;
  name: string;
  price: number;
  volume: number;
  date: string;
  status: 'upcoming' | 'active' | 'completed';
}

const stages: SaleStage[] = [
  {
    stage: 1,
    name: 'Pre-Sale 1',
    price: 0.4,
    volume: 2500000,
    date: '2024 Q2',
    status: 'active'
  },
  {
    stage: 2,
    name: 'Pre-Sale 2',
    price: 0.6,
    volume: 3000000,
    date: '2024 Q3',
    status: 'upcoming'
  },
  {
    stage: 3,
    name: 'Public Sale',
    price: 0.8,
    volume: 4500000,
    date: '2024 Q4',
    status: 'upcoming'
  }
];

export default function SalesRoadmap() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-8 text-center neon-text">
        План продаж токенов VOD
      </h2>
      
      <div className="relative">
        {/* Линия времени */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-eco" />
        
        {/* Этапы */}
        <div className="space-y-12">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.stage}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              {/* Маркер на линии времени */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-eco" />
              
              {/* Контент этапа */}
              <div className={`grid grid-cols-2 gap-8 ${index % 2 === 0 ? '' : 'direction-rtl'}`}>
                <div className={`p-4 modal-glass rounded-lg ${index % 2 === 0 ? 'text-right mr-8' : 'text-left ml-8'}`}>
                  <h3 className="text-xl font-semibold mb-2">{stage.name}</h3>
                  <div className="space-y-1 text-gray-400">
                    <p>Цена: ${stage.price.toFixed(2)}</p>
                    <p>Объем: ${stage.volume.toLocaleString()}</p>
                    <p>Дата: {stage.date}</p>
                  </div>
                  <div className="mt-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                      stage.status === 'active' ? 'bg-green-500' :
                      stage.status === 'completed' ? 'bg-blue-500' :
                      'bg-gray-500'
                    }`}>
                      {stage.status === 'active' ? 'Активен' :
                       stage.status === 'completed' ? 'Завершен' :
                       'Предстоит'}
                    </span>
                  </div>
                </div>
                <div /> {/* Пустая колонка для отступа */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 