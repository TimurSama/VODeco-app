import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCircleIcon, LockClosedIcon, MailIcon } from '@heroicons/react/outline';
import { userService } from '../../services/userService';

interface AuthFormProps {
  onClose: () => void;
  onSuccess: (user: any) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      let response;
      if (isLogin) {
        response = await userService.loginUser(email, password);
      } else {
        const user = await userService.registerUser(name, email, password);
        response = { success: true, user };
      }
      console.log('Response:', response);

      if (response.success && response.user) {
        onSuccess(response.user);
        onClose();
      } else {
        setError(response.error || 'Произошла ошибка');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass p-6 rounded-2xl w-full max-w-md mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          {isLogin ? 'Вход' : 'Регистрация'}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div className="space-y-2">
            <label className="text-gray-300 text-sm">Имя</label>
            <div className="relative">
              <UserCircleIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500"
                placeholder="Введите ваше имя"
                required
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-gray-300 text-sm">Email</label>
          <div className="relative">
            <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500"
              placeholder="Введите email"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-gray-300 text-sm">Пароль</label>
          <div className="relative">
            <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-blue-500"
              placeholder="Введите пароль"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Обработка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
          >
            {isLogin ? 'Создать аккаунт' : 'Уже есть аккаунт?'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AuthForm; 