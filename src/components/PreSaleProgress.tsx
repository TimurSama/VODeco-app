import React from 'react';
import { motion } from 'framer-motion';
import TokenIcon from '../assets/icons/TokenIcon';

interface PreSaleProgressProps {
  stage: number;
  tokenPrice: number;
  totalVolume: number;
  collectedPercentage: number;
  collectedAmount: number;
}

const PreSaleProgress: React.FC<PreSaleProgressProps> = ({
  stage,
  tokenPrice,
  totalVolume,
  collectedPercentage,
  collectedAmount,
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <TokenIcon className="h-6 w-6 text-eco-blue" />
          <span className="text-lg font-bold text-white">Этап {stage}</span>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-300">Цена токена</div>
          <div className="text-lg font-bold text-white">${tokenPrice}</div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-300">Прогресс</span>
            <span className="text-eco-blue font-medium">{collectedPercentage}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-eco"
              initial={{ width: 0 }}
              animate={{ width: `${collectedPercentage}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-300">Собрано</div>
            <div className="text-lg font-bold text-white">
              {collectedAmount.toLocaleString()} USDT
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-300">Всего</div>
            <div className="text-lg font-bold text-white">
              {totalVolume.toLocaleString()} USDT
            </div>
          </div>
        </div>

        <motion.button
          className="w-full bg-gradient-eco text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Купить токены
        </motion.button>
      </div>
    </div>
  );
};

export default PreSaleProgress; 