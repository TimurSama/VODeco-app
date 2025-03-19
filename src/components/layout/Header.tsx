import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../../contexts/WalletContext';
import { useAuth } from '../../contexts/AuthContext';
import VODecoLogo from '../common/VODecoLogo';
import WalletDisplay from '../wallet/WalletDisplay';
import { PlusIcon, MenuIcon } from '@heroicons/react/outline';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { balance, addTokens } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddTokens = (amount: number) => {
    addTokens(amount);
  };

  return (
    <header className="bg-eco-dark/80 backdrop-blur-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <MenuIcon className="h-5 w-5 text-white" />
            </button>
            <VODecoLogo className="text-white" />
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <WalletDisplay
                  balance={balance}
                  className="text-white"
                />
                <button
                  onClick={() => handleAddTokens(100)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <PlusIcon className="h-5 w-5 text-white" />
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Выйти
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
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