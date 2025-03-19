import { TELEGRAM_BOT_TOKEN, TELEGRAM_WEB_APP_URL, isTelegramWebApp, getTelegramUser } from '../config/telegram';

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
      window.Telegram.WebApp.ready();
      this.isInitialized = true;
    }
  }

  getUser() {
    return getTelegramUser();
  }

  showMainButton(text: string, callback: () => void) {
    if (!isTelegramWebApp()) return;

    const mainButton = window.Telegram.WebApp.MainButton;
    mainButton.text = text;
    mainButton.onClick(callback);
    mainButton.show();
  }

  hideMainButton() {
    if (!isTelegramWebApp()) return;
    window.Telegram.WebApp.MainButton.hide();
  }

  showBackButton(callback: () => void) {
    if (!isTelegramWebApp()) return;

    const backButton = window.Telegram.WebApp.BackButton;
    backButton.onClick(callback);
    backButton.show();
  }

  hideBackButton() {
    if (!isTelegramWebApp()) return;
    window.Telegram.WebApp.BackButton.hide();
  }

  showPopup(params: {
    title: string;
    message: string;
    buttons?: Array<{
      id: string;
      type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
      text: string;
    }>;
  }) {
    if (!isTelegramWebApp()) return;
    window.Telegram.WebApp.showPopup(params);
  }

  showAlert(message: string) {
    if (!isTelegramWebApp()) return;
    window.Telegram.WebApp.showAlert(message);
  }

  showConfirm(message: string): Promise<boolean> {
    if (!isTelegramWebApp()) return Promise.resolve(false);
    return window.Telegram.WebApp.showConfirm(message);
  }
}

export const telegramService = TelegramService.getInstance(); 