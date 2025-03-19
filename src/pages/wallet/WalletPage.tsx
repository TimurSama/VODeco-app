import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCardIcon,
  CurrencyDollarIcon,
  ArrowUpIcon,
  XIcon,
  CheckIcon,
} from '@heroicons/react/outline';
import WalletIcon from '../../assets/icons/WalletIcon';
import { User } from '../../types/user';

interface PaymentMethod {
  id: string;
  title: string;
  icon: any;
  description: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    title: 'Банковская карта',
    icon: CreditCardIcon,
    description: 'Visa, Mastercard, МИР',
  },
  {
    id: 'crypto',
    title: 'Криптокошелек',
    icon: WalletIcon,
    description: 'BTC, ETH, USDT',
  },
];

const tokenAmounts = [
  { amount: 100, bonus: 0 },
  { amount: 500, bonus: 50 },
  { amount: 1000, bonus: 150 },
  { amount: 5000, bonus: 1000 },
];

const WalletPage: React.FC = () => {
  const [balance, setBalance] = useState(0);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [hasClaimedBonus, setHasClaimedBonus] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('current_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      // Загружаем баланс и статус бонуса из localStorage
      const savedBalance = localStorage.getItem(`balance_${user.id}`);
      const bonusClaimed = localStorage.getItem(`bonus_claimed_${user.id}`);
      setBalance(savedBalance ? parseInt(savedBalance) : 0);
      setHasClaimedBonus(bonusClaimed === 'true');
    }
  }, []);

  const handleBuyTokens = () => {
    if (selectedAmount && selectedPaymentMethod) {
      const newBalance = balance + selectedAmount + (tokenAmounts.find(t => t.amount === selectedAmount)?.bonus || 0);
      setBalance(newBalance);
      if (currentUser) {
        localStorage.setItem(`balance_${currentUser.id}`, newBalance.toString());
      }
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setShowBuyModal(false);
        setSelectedAmount(null);
        setSelectedPaymentMethod(null);
      }, 2000);
    }
  };

  const handleClaimBonus = () => {
    if (currentUser && !hasClaimedBonus) {
      const newBalance = balance + 100; // Подарочные 100 VOD
      setBalance(newBalance);
      localStorage.setItem(`balance_${currentUser.id}`, newBalance.toString());
      localStorage.setItem(`bonus_claimed_${currentUser.id}`, 'true');
      setHasClaimedBonus(true);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Карточка баланса */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-2xl"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <CurrencyDollarIcon className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Баланс токенов</h2>
          </div>
          <div className="flex flex-col space-y-2">
            {!hasClaimedBonus && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClaimBonus}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <span>Забрать</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded">100 VOD</span>
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowBuyModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
            >
              Пополнить
            </motion.button>
          </div>
        </div>
        <div className="text-4xl font-bold text-white mb-2">
          {balance.toLocaleString()} <span className="text-blue-400">VOD</span>
        </div>
        <p className="text-gray-400">≈ {(balance * 0.1).toLocaleString()} USD</p>
      </motion.div>

      {/* Модальное окно покупки токенов */}
      <AnimatePresence>
        {showBuyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 z-50 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass rounded-2xl w-full max-w-md relative my-8"
            >
              {/* Шапка модального окна */}
              <div className="p-6 border-b border-white/10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowBuyModal(false)}
                  className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <XIcon className="w-6 h-6 text-gray-400 hover:text-white" />
                </motion.button>
                <h2 className="text-2xl font-bold text-white">Купить токены</h2>
              </div>

              {/* Контент с прокруткой */}
              <div className="p-6 space-y-6 max-h-[calc(100vh-16rem)] overflow-y-auto scrollbar-hide">
                {/* Выбор суммы */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Выберите сумму</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {tokenAmounts.map(({ amount, bonus }) => (
                      <motion.button
                        key={amount}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedAmount(amount)}
                        className={`p-4 rounded-xl text-left transition-colors ${
                          selectedAmount === amount
                            ? 'bg-blue-500/20 border-2 border-blue-500'
                            : 'glass border-2 border-transparent hover:border-blue-500/50'
                        }`}
                      >
                        <div className="text-xl font-bold text-white">{amount.toLocaleString()} VOD</div>
                        {bonus > 0 && (
                          <div className="text-sm text-blue-400">+{bonus} бонус</div>
                        )}
                        <div className="text-sm text-gray-400 mt-1">≈ {(amount * 0.1).toLocaleString()} USD</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Выбор способа оплаты */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Способ оплаты</h3>
                  {paymentMethods.map((method) => (
                    <motion.button
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`w-full p-4 rounded-xl flex items-center space-x-4 transition-colors ${
                        selectedPaymentMethod === method.id
                          ? 'bg-blue-500/20 border-2 border-blue-500'
                          : 'glass border-2 border-transparent hover:border-blue-500/50'
                      }`}
                    >
                      <method.icon className="w-6 h-6 text-blue-400" />
                      <div className="flex-1">
                        <div className="font-medium text-white">{method.title}</div>
                        <div className="text-sm text-gray-400">{method.description}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Футер с кнопками */}
              <div className="p-6 border-t border-white/10 space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyTokens}
                  disabled={!selectedAmount || !selectedPaymentMethod}
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
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowBuyModal(false)}
                  className="w-full bg-gray-500/20 hover:bg-gray-500/30 text-white py-3 rounded-xl font-medium transition-colors"
                >
                  Отмена
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* История транзакций */}
      <div className="glass p-6 rounded-2xl">
        <div className="flex items-center space-x-2 mb-4">
          <ArrowUpIcon className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-white">История транзакций</h2>
        </div>
        <div className="text-gray-400 text-center py-8">
          История транзакций пока пуста
        </div>
      </div>
    </div>
  );
};

export default WalletPage; 