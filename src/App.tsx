import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppWrapper from './components/layout/AppWrapper'
import Header from './components/layout/Header'
import Drawer from './components/layout/Drawer'
import HomePage from './pages/home/HomePage'
import ProfilePage from './pages/profile/ProfilePage'
import WalletPage from './pages/wallet/WalletPage'
import StakingPage from './pages/staking/StakingPage'
import MessagesPage from './pages/messages/MessagesPage'
import ProjectsPage from './pages/projects/ProjectsPage'
import GovernmentPage from './pages/government/GovernmentPage'
import CorporatePage from './pages/partners/CorporatePage'
import SciencePage from './pages/partners/SciencePage'
import SocialPage from './pages/partners/SocialPage'
import ConstructionPage from './pages/construction/ConstructionPage'
import EducationPage from './pages/education/EducationPage'
import GamificationPage from './pages/gamification/GamificationPage'
import { menuItems } from './data/menuItems'
import WelcomeModal from './components/welcome/WelcomeModal'
import { AuthProvider } from './contexts/AuthContext'
import { WalletProvider } from './contexts/WalletContext'
import { telegramService } from './services/telegramService'
import { isTelegramWebApp } from './config/telegram'
import './App.css'

// Инициализируем Telegram Web App
telegramService.init();

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Проверяем, был ли уже показан приветственный экран
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }

    // Инициализируем Telegram Web App и расширяем окно
    telegramService.init();
    if (isTelegramWebApp() && window.Telegram) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      // Получаем тему
      const colorScheme = window.Telegram.WebApp.colorScheme;
      document.documentElement.setAttribute('data-theme', colorScheme);
    }
    // Имитируем загрузку данных
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleWelcomeClose = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <WalletProvider>
        <Router>
          <AppWrapper>
            <Header onMenuClick={() => setIsDrawerOpen(true)} />
            <Drawer
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              menuItems={menuItems}
            />
            <main className="flex-1 p-4">
              {showWelcome && <WelcomeModal onClose={handleWelcomeClose} />}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/wallet" element={<WalletPage />} />
                <Route path="/staking" element={<StakingPage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/overview" element={<div className="text-center">Обзор</div>} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/management" element={<div className="text-center">Управление</div>} />
                <Route path="/monitoring" element={<div className="text-center">Мониторинг</div>} />
                <Route path="/community" element={<div className="text-center">Сообщество</div>} />
                <Route path="/government" element={<GovernmentPage />} />
                <Route path="/corporate" element={<CorporatePage />} />
                <Route path="/science" element={<SciencePage />} />
                <Route path="/social" element={<SocialPage />} />
                <Route path="/construction" element={<ConstructionPage />} />
                <Route path="/modernization" element={<div className="text-center">Модернизация</div>} />
                <Route path="/education" element={<EducationPage />} />
                <Route path="/investment" element={<div className="text-center">Инвестиции</div>} />
                <Route path="/bank" element={<div className="text-center">Банк воды</div>} />
                <Route path="/institute" element={<div className="text-center">Научный институт</div>} />
                <Route path="/relations" element={<div className="text-center">Международные отношения</div>} />
                <Route path="/challenges" element={<div className="text-center">Глобальные вызовы</div>} />
                <Route path="/extensions" element={<div className="text-center">Расширения</div>} />
                <Route path="/gamification" element={<GamificationPage />} />
              </Routes>
            </main>
          </AppWrapper>
        </Router>
      </WalletProvider>
    </AuthProvider>
  );
}

export default App; 