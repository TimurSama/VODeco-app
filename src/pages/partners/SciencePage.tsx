import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, SearchIcon, AcademicCapIcon } from '@heroicons/react/outline';
import PartnerCard, { Partner } from '../../components/PartnerCard';
import { sciencePartners } from '../../data/partners/sciencePartners';

export default function SciencePage() {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPartners = sciencePartners.filter(partner =>
    partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    partner.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    partner.projects.some(project => 
      project.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen py-8 px-4 space-y-8">
      {/* Заголовок и поиск */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <AcademicCapIcon className="h-16 w-16 mx-auto text-purple-500" />
          <h1 className="text-3xl font-bold neon-text">
            Научные партнеры
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ведущие научно-исследовательские институты, университеты и лаборатории, 
            развивающие инновации в водном секторе
          </p>
        </div>
        
        <div className="relative max-w-md mx-auto">
          <SearchIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск по названию, описанию или проектам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Список партнеров */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              onClick={() => setSelectedPartner(partner)}
            />
          ))}
        </div>
        
        {filteredPartners.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">
              Партнеры не найдены. Попробуйте изменить параметры поиска.
            </p>
          </div>
        )}
      </div>

      {/* Модальное окно с детальной информацией */}
      <AnimatePresence>
        {selectedPartner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedPartner(null)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl modal-glass rounded-lg overflow-hidden"
            >
              {/* Кнопка закрытия */}
              <button
                onClick={() => setSelectedPartner(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <XIcon className="h-6 w-6" />
              </button>

              {/* Контент */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedPartner.name}</h2>
                    <span className="inline-block px-3 py-1 rounded-full text-sm bg-purple-500/20 text-purple-400">
                      Научный партнер
                    </span>
                  </div>
                  {selectedPartner.logo && (
                    <img
                      src={selectedPartner.logo}
                      alt={`${selectedPartner.name} logo`}
                      className="w-20 h-20 object-contain"
                    />
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Описание</h3>
                    <p className="text-gray-400">{selectedPartner.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Вклад в проект</h3>
                    <p className="text-gray-400">{selectedPartner.contribution}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Исследования и проекты</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPartner.projects.map((project, index) => (
                        <span
                          key={index}
                          className="inline-block px-3 py-1 bg-purple-900/30 rounded-full text-sm border border-purple-500/20"
                        >
                          {project}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedPartner.website && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Веб-сайт</h3>
                      <a
                        href={selectedPartner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300"
                      >
                        {selectedPartner.website} →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 