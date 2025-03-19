import { User, AuthState } from '../types/auth';
import { telegramService } from './telegramService';

class AuthService {
  private static instance: AuthService;
  private state: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  };

  private constructor() {
    this.initialize();
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private async initialize() {
    try {
      // Проверяем, запущено ли приложение в Telegram Web App
      if (telegramService.isAvailable()) {
        await this.handleTelegramAuth();
      } else {
        // Проверяем сохраненную сессию
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          this.state.user = JSON.parse(savedUser);
          this.state.isAuthenticated = true;
        }
      }
    } catch (error) {
      this.state.error = 'Ошибка инициализации';
      console.error('Auth initialization error:', error);
    } finally {
      this.state.isLoading = false;
    }
  }

  private async handleTelegramAuth() {
    const telegramUser = telegramService.getUser();
    if (!telegramUser) {
      throw new Error('Telegram user data not available');
    }

    try {
      // Здесь должен быть запрос к вашему API для создания/получения пользователя
      const user: User = {
        id: `tg_${telegramUser.id}`,
        telegramId: telegramUser.id.toString(),
        username: telegramUser.username || telegramUser.first_name,
        firstName: telegramUser.first_name,
        lastName: telegramUser.last_name,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        isVerified: true, // Пользователи из Telegram считаются верифицированными
        role: 'user',
        settings: {
          notifications: true,
          language: (telegramUser.language_code as 'ru' | 'en') || 'en',
          theme: 'system',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      };

      this.state.user = user;
      this.state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      this.state.error = 'Ошибка аутентификации';
      console.error('Telegram auth error:', error);
      throw error;
    }
  }

  getState(): AuthState {
    return { ...this.state };
  }

  async login(): Promise<void> {
    if (telegramService.isAvailable()) {
      await this.handleTelegramAuth();
    } else {
      throw new Error('Telegram Web App not available');
    }
  }

  logout(): void {
    this.state.user = null;
    this.state.isAuthenticated = false;
    localStorage.removeItem('user');
  }

  updateUserSettings(settings: Partial<User['settings']>): void {
    if (!this.state.user) return;

    this.state.user.settings = {
      ...this.state.user.settings,
      ...settings,
    };

    localStorage.setItem('user', JSON.stringify(this.state.user));
  }

  isAuthenticated(): boolean {
    return this.state.isAuthenticated;
  }

  getCurrentUser(): User | null {
    return this.state.user;
  }
}

export const authService = AuthService.getInstance(); 