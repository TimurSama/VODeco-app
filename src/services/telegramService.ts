import { isTelegramWebApp, getTelegramUsername } from '../config/telegram';

interface PopupButton {
  id: string;
  type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
  text: string;
}

class TelegramService {
  private static instance: TelegramService;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): TelegramService {
    if (!TelegramService.instance) {
      TelegramService.instance = new TelegramService();
    }
    return TelegramService.instance;
  }

  init() {
    if (this.isInitialized) return;

    if (isTelegramWebApp()) {
      window.Telegram?.WebApp?.ready();
      this.isInitialized = true;
    }
  }

  getUsername() {
    return getTelegramUsername();
  }

  showMainButton(text: string, callback: () => void) {
    if (!isTelegramWebApp()) return;
    const mainButton = window.Telegram?.WebApp?.MainButton;
    if (mainButton) {
      mainButton.text = text;
      mainButton.show();
      mainButton.onClick(callback);
    }
  }

  hideMainButton() {
    if (!isTelegramWebApp()) return;
    window.Telegram?.WebApp?.MainButton?.hide();
  }

  showBackButton(callback: () => void) {
    if (!isTelegramWebApp()) return;
    const backButton = window.Telegram?.WebApp?.BackButton;
    if (backButton) {
      backButton.show();
      backButton.onClick(callback);
    }
  }

  hideBackButton() {
    if (!isTelegramWebApp()) return;
    window.Telegram?.WebApp?.BackButton?.hide();
  }

  showPopup({
    message,
    buttons = [],
    title = ''
  }: {
    message: string;
    buttons?: PopupButton[];
    title?: string;
  }) {
    if (!isTelegramWebApp() || !window.Telegram) return;
    window.Telegram.WebApp.showPopup({
      message,
      buttons,
      title
    });
  }

  showAlert(message: string) {
    if (!isTelegramWebApp() || !window.Telegram) return;
    window.Telegram.WebApp.showAlert(message);
  }

  showConfirm(message: string): Promise<boolean> {
    if (!isTelegramWebApp() || !window.Telegram) return Promise.resolve(false);
    return window.Telegram.WebApp.showConfirm(message);
  }
}

export const telegramService = TelegramService.getInstance(); 