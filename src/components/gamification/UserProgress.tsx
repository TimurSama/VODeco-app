import React from 'react';
import { motion } from 'framer-motion';
import { UserProgress as UserProgressType } from '../../types/gamification';

interface UserProgressProps {
  progress: UserProgressType;
}

const UserProgress: React.FC<UserProgressProps> = ({ progress }) => {
  const levelProgress = (progress.experience % 100) / 100 * 100;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Уровень {progress.level}</h3>
          <p className="text-sm text-gray-600">Опыт: {progress.experience}/100</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-blue-600">{progress.totalTokens} VOD</p>
          <p className="text-sm text-gray-600">Токены</p>
        </div>
      </div>

      {/* Прогресс-бар уровня */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <motion.div
          className="bg-blue-600 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${levelProgress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{progress.completedQuests.length}</p>
          <p className="text-sm text-gray-600">Квестов</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{progress.unlockedAchievements.length}</p>
          <p className="text-sm text-gray-600">Достижений</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{progress.dailyStreak}</p>
          <p className="text-sm text-gray-600">Дней подряд</p>
        </div>
      </div>

      {/* Цель стейкинга */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900">Цель: Стейкинг</h4>
        <p className="text-sm text-blue-800">
          Доступно: {progress.totalTokens}/150 VOD
        </p>
        <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(progress.totalTokens / 150) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProgress; 