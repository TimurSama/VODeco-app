import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';
import { isTelegramWebApp, getTelegramUsername } from '../config/telegram';

interface User {
  username: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  settings?: Record<string, any>;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

interface AuthContextType {
  state: AuthState;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true
  });

  const handleTelegramAuth = async () => {
    try {
      const username = getTelegramUsername();
      if (username) {
        setState({
          isAuthenticated: true,
          user: { username },
          loading: false
        });
      }
    } catch (error) {
      console.error('Telegram auth failed:', error);
      setState({ ...state, loading: false });
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (isTelegramWebApp()) {
          await handleTelegramAuth();
        } else {
          const savedUser = localStorage.getItem('user');
          if (savedUser) {
            setState({
              isAuthenticated: true,
              user: JSON.parse(savedUser),
              loading: false
            });
          } else {
            setState({ ...state, loading: false });
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setState({ ...state, loading: false });
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setState({ ...state, loading: true });
      const user = await authService.login(username, password);
      setState({
        isAuthenticated: true,
        user,
        loading: false
      });
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      setState({ ...state, loading: false });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setState({
      isAuthenticated: false,
      user: null,
      loading: false
    });
  };

  if (state.loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 