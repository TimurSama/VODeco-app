import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  UserCircleIcon,
  ShieldCheckIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  StarIcon,
  DocumentIcon,
  ChartBarIcon,
  ExternalLinkIcon,
} from '@heroicons/react/outline';
import { User } from '../../types/user';
import AuthForm from './AuthForm';

const ProfilePage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('current_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setShowAuthForm(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <UserCircleIcon className="w-24 h-24 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Войдите в аккаунт</h2>
          <button
            onClick={() => setShowAuthForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Войти
          </button>
        </div>
        {showAuthForm && (
          <AuthForm
            onSuccess={handleAuthSuccess}
            onClose={() => setShowAuthForm(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Основная информация */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center space-x-4">
            <UserCircleIcon className="w-20 h-20 text-blue-500" />
            <div>
              <h1 className="text-2xl font-bold">{currentUser?.name}</h1>
              <div className="flex items-center space-x-2 text-gray-400">
                <span className="px-2 py-1 bg-blue-500/20 rounded-full text-sm">
                  {currentUser?.status}
                </span>
                <span className="px-2 py-1 bg-green-500/20 rounded-full text-sm">
                  {currentUser?.verification.level}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Профессиональная информация */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <BriefcaseIcon className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Профессиональная информация</h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-gray-400">Должность</h3>
              <p className="text-lg">{currentUser?.profession.position}</p>
            </div>
            <div>
              <h3 className="text-gray-400">Компании</h3>
              <div className="flex flex-wrap gap-2">
                {currentUser?.profession.companies.map((company, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Достижения */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <StarIcon className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Достижения</h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-gray-400">Награды</h3>
              <ul className="list-disc list-inside space-y-2">
                {currentUser?.achievements.awards.map((award, index) => (
                  <li key={index}>{award}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-gray-400">Сертификаты</h3>
              <ul className="list-disc list-inside space-y-2">
                {currentUser?.achievements.certificates.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-gray-400">Навыки</h3>
              <div className="flex flex-wrap gap-2">
                {currentUser?.achievements.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Статистика */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <ChartBarIcon className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Статистика</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                {currentUser?.statistics.projects}
              </div>
              <div className="text-gray-400">Проекты</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                {currentUser?.statistics.contributions}
              </div>
              <div className="text-gray-400">Вклад</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                {currentUser?.statistics.reputation}
              </div>
              <div className="text-gray-400">Репутация</div>
            </div>
          </div>
        </motion.div>

        {/* Социальные сети */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <ExternalLinkIcon className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Социальные сети</h2>
          </div>
          <div className="flex space-x-4">
            {currentUser?.social.twitter && (
              <a
                href={currentUser.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                Twitter
              </a>
            )}
            {currentUser?.social.linkedin && (
              <a
                href={currentUser.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                LinkedIn
              </a>
            )}
            {currentUser?.social.github && (
              <a
                href={currentUser.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                GitHub
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage; 