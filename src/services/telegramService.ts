import { TelegramWebApp, TelegramUser } from '../types/telegram';

// Заглушка для локальной разработки
const mockWebApp: TelegramWebApp = {
  ready: () => console.log('Telegram Web App ready'),
  expand: () => console.log('Telegram Web App expand'),
  close: () => console.log('Telegram Web App close'),
  MainButton: {
    show: () => console.log('MainButton show'),
    hide: () => console.log('MainButton hide'),
    setText: (text: string) => console.log('MainButton setText:', text),
    onClick: (callback: () => void) => console.log('MainButton onClick'),
  },
  initData: '',
  initDataUnsafe: {
    user: {
      id: 123456789,
      first_name: 'Test User',
      username: 'testuser',
    },
    auth_date: Date.now(),
    hash: 'test_hash',
  },
};

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

class TelegramService {
  private webApp: TelegramWebApp | null = null;

  constructor() {
    // В локальной разработке используем заглушку
    this.webApp = window.Telegram?.WebApp || mockWebApp;
  }

  isAvailable(): boolean {
    return !!this.webApp;
  }

  getUser(): TelegramUser | null {
    return this.webApp?.initDataUnsafe.user || null;
  }

  getUserId(): number | null {
    return this.webApp?.initDataUnsafe.user?.id || null;
  }

  getUsername(): string | null {
    return this.webApp?.initDataUnsafe.user?.username || null;
  }

  getFirstName(): string | null {
    return this.webApp?.initDataUnsafe.user?.first_name || null;
  }

  getLastName(): string | null {
    return this.webApp?.initDataUnsafe.user?.last_name || null;
  }

  getLanguageCode(): string | null {
    return this.webApp?.initDataUnsafe.user?.language_code || null;
  }

  getStartParam(): string | null {
    return this.webApp?.initDataUnsafe.user?.start_param || null;
  }

  getTheme(): 'light' | 'dark' {
    return this.webApp?.colorScheme || 'light';
  }

  getThemeParams() {
    return this.webApp?.themeParams || {};
  }

  expand() {
    if (this.webApp) {
      this.webApp.expand();
    }
  }

  close() {
    if (this.webApp) {
      this.webApp.close();
    }
  }

  showMainButton(text: string, callback: () => void) {
    if (this.webApp?.MainButton) {
      this.webApp.MainButton.setText(text);
      this.webApp.MainButton.onClick(callback);
      this.webApp.MainButton.show();
    }
  }

  hideMainButton() {
    if (this.webApp?.MainButton) {
      this.webApp.MainButton.hide();
    }
  }

  showBackButton(callback: () => void) {
    if (this.webApp?.BackButton) {
      this.webApp.BackButton.onClick(callback);
      this.webApp.BackButton.show();
    }
  }

  hideBackButton() {
    if (this.webApp?.BackButton) {
      this.webApp.BackButton.hide();
    }
  }

  // Метод для проверки подписи данных от Telegram
  validateInitData(initData: string): boolean {
    // В локальной разработке всегда возвращаем true
    return true;
  }
}

export const telegramService = new TelegramService(); 