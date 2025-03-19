import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CurrencyDollarIcon,
  TrendingUpIcon,
  ClockIcon,
  XIcon,
  CheckIcon,
  RefreshIcon,
} from '@heroicons/react/outline';
import { User } from '../../types/user';

interface StakingInfo {
  amount: number;
  reward: number;
  startDate: string;
  endDate: string;
}

const StakingPage: React.FC = () => {
  const [balance, setBalance] = useState(0);
  const [stakedAmount, setStakedAmount] = useState(0);
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showCoins, setShowCoins] = useState(false);
  const [stakingHistory, setStakingHistory] = useState<StakingInfo[]>([]);

  // Загрузка данных пользователя и баланса
  useEffect(() => {
    const savedUser = localStorage.getItem('current_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      const savedBalance = localStorage.getItem(`balance_${user.id}`);
      const savedStaked = localStorage.getItem(`staked_${user.id}`);
      const savedHistory = localStorage.getItem(`staking_history_${user.id}`);
      
      setBalance(savedBalance ? parseInt(savedBalance) : 0);
      setStakedAmount(savedStaked ? parseInt(savedStaked) : 0);
      if (savedHistory) {
        setStakingHistory(JSON.parse(savedHistory));
      }
    }
  }, []);

  const handleStakeTokens = () => {
    if (stakeAmount > 0 && stakeAmount <= balance) {
      // Анимация монет
      setShowCoins(true);
      
      setTimeout(() => {
        const newBalance = balance - stakeAmount;
        const newStakedAmount = stakedAmount + stakeAmount;
        const reward = Math.floor(stakeAmount * 0.1); // 10% награда

        // Обновляем балансы
        setBalance(newBalance);
        setStakedAmount(newStakedAmount);

        // Сохраняем в localStorage
        if (currentUser) {
          localStorage.setItem(`balance_${currentUser.id}`, newBalance.toString());
          localStorage.setItem(`staked_${currentUser.id}`, newStakedAmount.toString());

          // Добавляем запись в историю
          const newStakingInfo: StakingInfo = {
            amount: stakeAmount,
            reward,
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // +30 дней
          };

          const updatedHistory = [...stakingHistory, newStakingInfo];
          setStakingHistory(updatedHistory);
          localStorage.setItem(`staking_history_${currentUser.id}`, JSON.stringify(updatedHistory));
        }

        setShowSuccess(true);
        setTimeout(() => {
          setShowCoins(false);
          setShowSuccess(false);
          setShowStakeModal(false);
          setStakeAmount(0);
        }, 2000);
      }, 1000);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Карточка стейкинга */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <TrendingUpIcon className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Стейкинг VOD</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowStakeModal(true)}
            disabled={balance === 0}
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl font-medium transition-colors"
          >
            Внести токены
          </motion.button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="glass p-4 rounded-xl">
            <div className="text-sm text-gray-400 mb-1">Доступно</div>
            <div className="text-2xl font-bold text-white">
              {balance.toLocaleString()} <span className="text-blue-400">VOD</span>
            </div>
          </div>
          <div className="glass p-4 rounded-xl">
            <div className="text-sm text-gray-400 mb-1">В стейкинге</div>
            <div className="text-2xl font-bold text-white">
              {stakedAmount.toLocaleString()} <span className="text-blue-400">VOD</span>
            </div>
          </div>
        </div>

        <div className="glass p-4 rounded-xl mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-400">Годовая доходность</div>
            <div className="text-lg font-bold text-green-400">10%</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">Период</div>
            <div className="text-lg font-bold text-white">30 дней</div>
          </div>
        </div>
      </motion.div>

      {/* История стейкинга */}
      <div className="glass p-6 rounded-2xl">
        <div className="flex items-center space-x-2 mb-6">
          <ClockIcon className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">История стейкинга</h2>
        </div>
        {stakingHistory.length === 0 ? (
          <div className="text-gray-400 text-center py-8">
            История стейкинга пока пуста
          </div>
        ) : (
          <div className="space-y-4">
            {stakingHistory.map((stake, index) => (
              <div key={index} className="glass p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white font-medium">
                    {stake.amount.toLocaleString()} VOD
                  </div>
                  <div className="text-green-400">+{stake.reward.toLocaleString()} VOD</div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div>Начало: {new Date(stake.startDate).toLocaleDateString()}</div>
                  <div>Конец: {new Date(stake.endDate).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Модальное окно стейкинга */}
      <AnimatePresence>
        {showStakeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass p-6 rounded-2xl w-full max-w-md relative"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowStakeModal(false)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <XIcon className="w-6 h-6 text-gray-400 hover:text-white" />
              </motion.button>

              <h2 className="text-2xl font-bold text-white mb-6">Внести токены</h2>

              <div className="space-y-6">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Количество токенов
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(Math.min(balance, Math.max(0, parseInt(e.target.value) || 0)))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                      placeholder="Введите количество"
                    />
                    <button
                      onClick={() => setStakeAmount(balance)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-400 hover:text-blue-300"
                    >
                      MAX
                    </button>
                  </div>
                  <div className="text-sm text-gray-400 mt-2">
                    Доступно: {balance.toLocaleString()} VOD
                  </div>
                </div>

                <div className="glass p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">Награда</div>
                    <div className="text-green-400 font-medium">
                      +{Math.floor(stakeAmount * 0.1).toLocaleString()} VOD
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">Период</div>
                    <div className="text-white">30 дней</div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStakeTokens}
                  disabled={stakeAmount === 0 || stakeAmount > balance}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium transition-colors"
                >
                  {showSuccess ? (
                    <div className="flex items-center justify-center space-x-2">
                      <CheckIcon className="w-5 h-5" />
                      <span>Успешно!</span>
                    </div>
                  ) : (
                    'Подтвердить'
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Анимация монет */}
      <AnimatePresence>
        {showCoins && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  scale: 1,
                  x: '50%',
                  y: '50%',
                }}
                animate={{
                  opacity: 0,
                  scale: 0,
                  x: [null, '50%', '100%'],
                  y: [null, '0%', '0%'],
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
                className="absolute"
              >
                <div className="w-8 h-8 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50 flex items-center justify-center text-black font-bold">
                  VOD
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StakingPage; 