export {};

interface TelegramWebAppUser {
  username?: string;
}

interface TelegramWebAppInitData {
  user?: TelegramWebAppUser;
}

interface TelegramWebAppMainButton {
  text: string;
  show: () => void;
  hide: () => void;
  onClick: (callback: () => void) => void;
}

interface TelegramWebAppBackButton {
  show: () => void;
  hide: () => void;
  onClick: (callback: () => void) => void;
}

interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  MainButton: TelegramWebAppMainButton;
  BackButton: TelegramWebAppBackButton;
  initDataUnsafe: TelegramWebAppInitData;
  colorScheme: string;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
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
        ready: () => void;
        expand: () => void;
        close: () => void;
      };
    };
  }
} 