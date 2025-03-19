import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveChallenge } from '../../types/gamification';

interface InteractiveChallengesProps {
  challenges: InteractiveChallenge[];
  onChallengeClick: (challenge: InteractiveChallenge) => void;
  userTokens: number;
}

const InteractiveChallenges: React.FC<InteractiveChallengesProps> = ({
  challenges,
  onChallengeClick,
  userTokens,
}) => {
  const getDifficultyColor = (difficulty: InteractiveChallenge['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const canParticipate = (challenge: InteractiveChallenge) => {
    if (challenge.isCompleted) return false;
    if (challenge.attempts >= challenge.maxAttempts) return false;
    if (challenge.cost && userTokens < challenge.cost) return false;
    return true;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {challenges.map((challenge) => (
        <motion.div
          key={challenge.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          className={`bg-white rounded-lg shadow-md p-4 ${
            !canParticipate(challenge) ? 'opacity-75' : 'cursor-pointer'
          }`}
          onClick={() => canParticipate(challenge) && onChallengeClick(challenge)}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{challenge.title}</h3>
            <span className={`px-2 py-1 rounded-full text-sm ${getDifficultyColor(challenge.difficulty)}`}>
              {challenge.difficulty}
            </span>
          </div>

          <p className="text-gray-600 mb-3">{challenge.description}</p>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Награда:</span>
              <span className="font-semibold text-blue-600">{challenge.reward} VOD</span>
            </div>

            {challenge.cost && (
              <div className="flex justify-between text-sm">
                <span>Стоимость:</span>
                <span className={`font-semibold ${userTokens >= challenge.cost ? 'text-green-600' : 'text-red-600'}`}>
                  {challenge.cost} VOD
                </span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span>Попытки:</span>
              <span className="font-semibold text-gray-600">
                {challenge.attempts}/{challenge.maxAttempts}
              </span>
            </div>
          </div>

          {challenge.isCompleted && (
            <div className="mt-3 p-2 bg-green-100 text-green-800 rounded text-sm text-center">
              Завершено!
            </div>
          )}

          {!canParticipate(challenge) && !challenge.isCompleted && (
            <div className="mt-3 p-2 bg-red-100 text-red-800 rounded text-sm text-center">
              {challenge.attempts >= challenge.maxAttempts
                ? 'Превышено количество попыток'
                : 'Недостаточно токенов'}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default InteractiveChallenges; 