export {};

interface TelegramWebAppUser {
  username?: string;
}

interface TelegramWebAppInitData {
  user?: TelegramWebAppUser;
}

interface TelegramWebAppMainButton {
  text: string;
  color: string;
  textColor: string;
  isVisible: boolean;
  isActive: boolean;
  isProgressVisible: boolean;
  setText: (text: string) => void;
  onClick: (callback: () => void) => void;
  show: () => void;
  hide: () => void;
  enable: () => void;
  disable: () => void;
  showProgress: () => void;
  hideProgress: () => void;
}

interface TelegramWebAppBackButton {
  isVisible: boolean;
  onClick: (callback: () => void) => void;
  show: () => void;
  hide: () => void;
}

interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  MainButton: TelegramWebAppMainButton;
  BackButton: TelegramWebAppBackButton;
  initDataUnsafe: TelegramWebAppInitData;
  showPopup: (params: {
    message: string;
    buttons?: Array<{
      id: string;
      type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
      text: string;
    }>;
    title?: string;
  }) => void;
  showAlert: (message: string) => void;
  showConfirm: (message: string) => Promise<boolean>;
  colorScheme: 'light' | 'dark';
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        onEvent: (eventType: 'viewportChanged', callback: (event: { isStateStable: boolean }) => void) => void;
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          isProgressVisible: boolean;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          showProgress: () => void;
          hideProgress: () => void;
        };
        BackButton: {
          isVisible: boolean;
          onClick: (callback: () => void) => void;
          show: () => void;
          hide: () => void;
        };
      };
    };
  }
} 