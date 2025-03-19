import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthState, User } from '../types/auth';
import { authService } from '../services/authService';

interface AuthContextType extends AuthState {
  login: () => Promise<void>;
  logout: () => void;
  updateSettings: (settings: Partial<User['settings']>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(authService.getState());

  useEffect(() => {
    const updateState = () => {
      setState(authService.getState());
    };

    // Обновляем состояние при изменении в authService
    window.addEventListener('storage', updateState);
    return () => window.removeEventListener('storage', updateState);
  }, []);

  const login = async () => {
    try {
      await authService.login();
      setState(authService.getState());
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setState(authService.getState());
  };

  const updateSettings = (settings: Partial<User['settings']>) => {
    authService.updateUserSettings(settings);
    setState(authService.getState());
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        updateSettings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 