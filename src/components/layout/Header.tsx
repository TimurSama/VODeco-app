import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useWallet } from '../../contexts/WalletContext';
import WalletDisplay from '../wallet/WalletDisplay';
import VODecoLogo from '../common/VODecoLogo';

interface HeaderProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const navigate = useNavigate();
  const { state, logout } = useAuth();
  const { balance, addTokens } = useWallet();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="ml-4 cursor-pointer" onClick={() => navigate('/')}>
              <VODecoLogo />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {state.isAuthenticated ? (
              <>
                <WalletDisplay balance={balance} />
                <button
                  onClick={logout}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Выйти
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/profile')}
                className="text-gray-500 hover:text-gray-700"
              >
                Войти
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 