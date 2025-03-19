import { isTelegramWebApp } from '../config/telegram';

interface PopupButton {
  id: string;
  type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
  text: string;
}

class TelegramService {
  private static instance: TelegramService;
  private isInitialized = false;
  private isDemoMode = true;

  private constructor() {}

  static getInstance(): TelegramService {
    if (!TelegramService.instance) {
      TelegramService.instance = new TelegramService();
    }
    return TelegramService.instance;
  }

  async init(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // В демо-режиме просто устанавливаем флаг инициализации
      this.isInitialized = true;
      console.log('Demo mode initialized successfully');
    } catch (error) {
      console.error('Failed to initialize:', error);
      throw error;
    }
  }

  getUsername(): string {
    return 'Demo User';
  }

  showMainButton(text: string, callback: () => void) {
    if (this.isDemoMode) {
      console.log('Demo: Main button clicked', { text });
      callback();
    }
  }

  hideMainButton() {
    if (this.isDemoMode) {
      console.log('Demo: Main button hidden');
    }
  }

  showBackButton(callback: () => void) {
    if (this.isDemoMode) {
      console.log('Demo: Back button shown');
      callback();
    }
  }

  hideBackButton() {
    if (this.isDemoMode) {
      console.log('Demo: Back button hidden');
    }
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
    if (this.isDemoMode) {
      console.log('Demo: Popup shown', { message, buttons, title });
      // В демо-режиме просто показываем alert
      alert(message);
    }
  }

  showAlert(message: string) {
    if (this.isDemoMode) {
      console.log('Demo: Alert shown', { message });
      alert(message);
    }
  }

  showConfirm(message: string): Promise<boolean> {
    if (this.isDemoMode) {
      console.log('Demo: Confirm shown', { message });
      return Promise.resolve(window.confirm(message));
    }
    return Promise.resolve(false);
  }

  cleanup() {
    if (this.isDemoMode) {
      console.log('Demo: Cleanup completed');
    }
  }
}

export const telegramService = TelegramService.getInstance(); 