import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AcademicCapIcon, BookOpenIcon, SearchIcon } from '@heroicons/react/outline';
import { courses, educationalResources } from '../../data/educationData';
import { Course, EducationalResource } from '../../types/education';

const EducationPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedResource, setSelectedResource] = useState<EducationalResource | null>(null);
  const [activeTab, setActiveTab] = useState<'courses' | 'resources'>('courses');

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredResources = educationalResources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}ч ${remainingMinutes}мин`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Заголовок */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <AcademicCapIcon className="h-12 w-12 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Образовательный центр</h1>
            <p className="text-gray-600">Развивайте свои навыки в области водного хозяйства</p>
          </div>
        </div>
      </div>

      {/* Поиск */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Поиск курсов и материалов..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
      </div>

      {/* Табы */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'courses'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Курсы
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'resources'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Материалы
        </button>
      </div>

      {/* Список курсов */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setSelectedCourse(course)}
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{formatDuration(course.duration)}</span>
                  <span className="text-sm font-medium text-blue-600">
                    {course.price ? `${course.price.amount} ${course.price.currency}` : 'Бесплатно'}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {course.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Список материалов */}
      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setSelectedResource(resource)}
            >
              <img
                src={resource.thumbnail}
                alt={resource.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <BookOpenIcon className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">{resource.type}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{resource.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{resource.author}</span>
                  <span>{new Date(resource.publishedAt).toLocaleDateString('ru-RU')}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {resource.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Модальное окно для курса */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.title}</h2>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <img
                src={selectedCourse.thumbnail}
                alt={selectedCourse.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">О курсе</h3>
                  <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Преподаватель</h4>
                      <div className="flex items-center space-x-3">
                        <img
                          src={selectedCourse.instructor.avatar}
                          alt={selectedCourse.instructor.name}
                          className="h-12 w-12 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{selectedCourse.instructor.name}</p>
                          <p className="text-sm text-gray-500">{selectedCourse.instructor.title}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Требования</h4>
                      <ul className="list-disc list-inside text-gray-600">
                        {selectedCourse.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Программа курса</h3>
                  <div className="space-y-4">
                    {selectedCourse.contents.map((content) => (
                      <div
                        key={content.id}
                        className="p-4 bg-gray-50 rounded-lg"
                      >
                        <h4 className="font-medium text-gray-900 mb-2">{content.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{content.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-blue-600">{content.type}</span>
                          <span className="text-gray-500">{formatDuration(content.duration)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Модальное окно для материала */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedResource.title}</h2>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <img
                src={selectedResource.thumbnail}
                alt={selectedResource.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Описание</h3>
                  <p className="text-gray-600">{selectedResource.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Автор</h4>
                    <p className="text-gray-600">{selectedResource.author}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Дата публикации</h4>
                    <p className="text-gray-600">
                      {new Date(selectedResource.publishedAt).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Статистика</h4>
                  <div className="flex space-x-4">
                    <span className="text-gray-600">Просмотры: {selectedResource.views}</span>
                    <span className="text-gray-600">Скачивания: {selectedResource.downloads}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Теги</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedResource.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-sm font-medium text-green-600 bg-green-100 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={selectedResource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Открыть материал
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default EducationPage; 