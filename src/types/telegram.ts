export interface TelegramWebAppUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  start_param?: string;
}

export interface TelegramWebAppInitData {
  user?: TelegramWebAppUser;
  auth_date: number;
  hash: string;
}

export interface TelegramWebAppMainButton {
  text: string;
  color?: string;
  text_color?: string;
  is_active?: boolean;
  is_visible?: boolean;
  show(): void;
  hide(): void;
  onClick(callback: () => void): void;
}

export interface TelegramWebAppBackButton {
  is_visible: boolean;
  show(): void;
  hide(): void;
  onClick(callback: () => void): void;
}

export interface TelegramWebAppThemeParams {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
}

export interface TelegramWebApp {
  ready(): void;
  expand(): void;
  close(): void;
  MainButton: TelegramWebAppMainButton;
  BackButton: TelegramWebAppBackButton;
  initData: string;
  initDataUnsafe: TelegramWebAppInitData;
  colorScheme: 'light' | 'dark';
  themeParams: TelegramWebAppThemeParams;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  showPopup(params: {
    title: string;
    message: string;
    buttons?: Array<{
      id: string;
      type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
      text: string;
    }>;
  }): void;
  showAlert(message: string): void;
  showConfirm(message: string): Promise<boolean>;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
} 