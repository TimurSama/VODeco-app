import React from 'react';
import { motion } from 'framer-motion';
import { Quest } from '../../types/gamification';

interface QuestListProps {
  quests: Quest[];
  onQuestClick: (quest: Quest) => void;
}

const QuestList: React.FC<QuestListProps> = ({ quests, onQuestClick }) => {
  const getStatusColor = (status: Quest['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'locked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Quest['status']) => {
    switch (status) {
      case 'available':
        return 'Доступно';
      case 'in_progress':
        return 'В процессе';
      case 'completed':
        return 'Завершено';
      case 'locked':
        return 'Заблокировано';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-4">
      {quests.map((quest) => (
        <motion.div
          key={quest.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          className={`bg-white rounded-lg shadow-md p-4 cursor-pointer ${
            quest.status === 'locked' ? 'opacity-75' : ''
          }`}
          onClick={() => quest.status !== 'locked' && onQuestClick(quest)}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{quest.title}</h3>
            <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(quest.status)}`}>
              {getStatusText(quest.status)}
            </span>
          </div>
          
          <p className="text-gray-600 mb-3">{quest.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-blue-600 font-semibold">{quest.reward} VOD</span>
              {quest.progress && (
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-blue-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(quest.progress.current / quest.progress.total) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </div>
            
            {quest.type === 'daily' && quest.expiresAt && (
              <span className="text-sm text-gray-500">
                До {new Date(quest.expiresAt).toLocaleTimeString()}
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default QuestList; 