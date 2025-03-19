import React, { useState } from 'react';
import { motion } from 'framer-motion';
import UserProgress from '../../components/gamification/UserProgress';
import QuestList from '../../components/gamification/QuestList';
import InteractiveChallenges from '../../components/gamification/InteractiveChallenges';
import { initialQuests, interactiveChallenges } from '../../data/gamificationData';
import { Quest, InteractiveChallenge, UserProgress as UserProgressType } from '../../types/gamification';

const GamificationPage: React.FC = () => {
  const [userProgress, setUserProgress] = useState<UserProgressType>({
    level: 1,
    experience: 0,
    totalTokens: 10, // Начальные токены из приветственного окна
    completedQuests: [],
    unlockedAchievements: [],
    dailyStreak: 0,
    lastDailyReward: new Date(),
  });

  const [quests, setQuests] = useState<Quest[]>(initialQuests);
  const [challenges, setChallenges] = useState<InteractiveChallenge[]>(interactiveChallenges);

  const handleQuestClick = (quest: Quest) => {
    if (quest.status === 'available' || quest.status === 'in_progress') {
      // Обновляем статус квеста
      const updatedQuests = quests.map((q) =>
        q.id === quest.id
          ? { ...q, status: 'completed' as const }
          : q
      );
      setQuests(updatedQuests);

      // Обновляем прогресс пользователя
      setUserProgress((prev) => ({
        ...prev,
        totalTokens: prev.totalTokens + quest.reward,
        completedQuests: [...prev.completedQuests, quest.id],
        experience: prev.experience + quest.reward,
      }));

      // Проверяем повышение уровня
      if (userProgress.experience + quest.reward >= 100) {
        setUserProgress((prev) => ({
          ...prev,
          level: prev.level + 1,
          experience: (prev.experience + quest.reward) % 100,
        }));
      }
    }
  };

  const handleChallengeClick = (challenge: InteractiveChallenge) => {
    if (!challenge.isCompleted && challenge.attempts < challenge.maxAttempts) {
      // Обновляем статус испытания
      const updatedChallenges = challenges.map((c) =>
        c.id === challenge.id
          ? {
              ...c,
              attempts: c.attempts + 1,
              isCompleted: true, // В реальном приложении это будет зависеть от результата
            }
          : c
      );
      setChallenges(updatedChallenges);

      // Обновляем прогресс пользователя
      setUserProgress((prev) => ({
        ...prev,
        totalTokens: prev.totalTokens + challenge.reward - (challenge.cost || 0),
        experience: prev.experience + challenge.reward,
      }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900 mb-8"
      >
        Игровые механики
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Прогресс пользователя */}
        <div className="lg:col-span-1">
          <UserProgress progress={userProgress} />
        </div>

        {/* Квесты */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Квесты</h2>
          <QuestList quests={quests} onQuestClick={handleQuestClick} />
        </div>

        {/* Интерактивные испытания */}
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Испытания</h2>
          <InteractiveChallenges
            challenges={challenges}
            onChallengeClick={handleChallengeClick}
            userTokens={userProgress.totalTokens}
          />
        </div>
      </div>
    </div>
  );
};

export default GamificationPage; 