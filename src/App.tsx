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
import './App.css'

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Проверяем, был ли уже показан приветственный экран
        const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
        if (!hasSeenWelcome) {
          setShowWelcome(true);
        }

        // Инициализируем сервис в демо-режиме
        await telegramService.init();
        console.log('App initialized in demo mode');

      } catch (error) {
        console.error('Failed to initialize app:', error);
        setInitError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (initError) {
    return <div className="error">Error: {initError}</div>;
  }

  return (
    <AuthProvider>
      <WalletProvider>
        <Router basename="/VODeco-app">
          <AppWrapper>
            <Header isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
            <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} menuItems={menuItems} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/staking" element={<StakingPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/government" element={<GovernmentPage />} />
              <Route path="/corporate" element={<CorporatePage />} />
              <Route path="/science" element={<SciencePage />} />
              <Route path="/social" element={<SocialPage />} />
              <Route path="/construction" element={<ConstructionPage />} />
              <Route path="/education" element={<EducationPage />} />
              <Route path="/gamification" element={<GamificationPage />} />
            </Routes>
            {showWelcome && <WelcomeModal onClose={() => {
              setShowWelcome(false);
              localStorage.setItem('hasSeenWelcome', 'true');
            }} />}
          </AppWrapper>
        </Router>
      </WalletProvider>
    </AuthProvider>
  );
}

export default App; 