import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, SearchIcon, UserGroupIcon } from '@heroicons/react/outline';
import PartnerCard, { Partner } from '../../components/PartnerCard';
import { socialPartners } from '../../data/partners/socialPartners';

export default function SocialPage() {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const categories = [
    { id: 'eco', name: 'Экология' },
    { id: 'education', name: 'Образование' },
    { id: 'rights', name: 'Права и интересы' },
    { id: 'media', name: 'Медиа' }
  ];

  const filteredPartners = socialPartners.filter(partner => {
    const matchesSearch = 
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.projects.some(project => 
        project.toLowerCase().includes(searchQuery.toLowerCase())
      );

    if (!activeFilter) return matchesSearch;

    const categoryMatches = {
      eco: ['Экологический фонд', 'эко-движение'],
      education: ['образовательные программы', 'обучение', 'просвещение'],
      rights: ['защита прав', 'общественный совет', 'ассоциация'],
      media: ['журналист', 'медиа', 'информационные']
    };

    return matchesSearch && (
      partner.name.toLowerCase().includes(categoryMatches[activeFilter as keyof typeof categoryMatches][0].toLowerCase()) ||
      partner.description.toLowerCase().includes(categoryMatches[activeFilter as keyof typeof categoryMatches][0].toLowerCase()) ||
      partner.projects.some(project =>
        categoryMatches[activeFilter as keyof typeof categoryMatches].some(keyword =>
          project.toLowerCase().includes(keyword.toLowerCase())
        )
      )
    );
  });

  return (
    <div className="min-h-screen py-8 px-4 space-y-8">
      {/* Заголовок и поиск */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <UserGroupIcon className="h-16 w-16 mx-auto text-teal-500" />
          <h1 className="text-3xl font-bold neon-text">
            Общественные партнеры
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Организации и объединения, представляющие интересы общества 
            в вопросах управления водными ресурсами
          </p>
        </div>
        
        {/* Поиск и фильтры */}
        <div className="space-y-4">
          <div className="relative max-w-md mx-auto">
            <SearchIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по названию, описанию или проектам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(activeFilter === category.id ? null : category.id)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  activeFilter === category.id
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
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
              Партнеры не найдены. Попробуйте изменить параметры поиска или фильтры.
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
                    <span className="inline-block px-3 py-1 rounded-full text-sm bg-teal-500/20 text-teal-400">
                      Общественный партнер
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
                    <h3 className="text-lg font-semibold mb-2">О организации</h3>
                    <p className="text-gray-400">{selectedPartner.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Вклад в проект</h3>
                    <p className="text-gray-400">{selectedPartner.contribution}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Проекты и инициативы</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPartner.projects.map((project, index) => (
                        <span
                          key={index}
                          className="inline-block px-3 py-1 bg-teal-900/30 rounded-full text-sm border border-teal-500/20"
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
                        className="text-teal-400 hover:text-teal-300"
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