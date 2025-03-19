// @ts-nocheck
export const TELEGRAM_BOT_TOKEN = '7101935252:AAEF4Lb3-botFRs0Isf40x19Wk5PN6P2vSE';
export const TELEGRAM_WEB_APP_URL = 'https://TimurSama.github.io/VODeco-app';

// Демо-режим
export const isTelegramWebApp = (): boolean => {
  return false; // Всегда возвращаем false в демо-режиме
};

// Получаем объект WebApp
export const getWebApp = () => {
  return null; // В демо-режиме всегда возвращаем null
};

// Получаем никнейм пользователя
export const getTelegramUsername = (): string | null => {
  return 'Demo User';
};

// Инициализация
export const initTelegramWebApp = async (): Promise<boolean> => {
  return true; // В демо-режиме всегда возвращаем true
};

// Получаем данные пользователя
export const getTelegramUser = () => {
  return {
    id: 123456789,
    first_name: 'Demo',
    last_name: 'User',
    username: 'demo_user',
    language_code: 'en',
    is_premium: true
  };
};

// Получаем текущую тему
export const getTelegramTheme = (): 'light' | 'dark' => {
  return 'dark';
};

// Получаем параметры темы
export const getTelegramThemeParams = () => {
  return {
    bg_color: '#1c1c1e',
    text_color: '#ffffff',
    hint_color: '#98989e',
    link_color: '#007aff',
    button_color: '#007aff',
    button_text_color: '#ffffff',
    secondary_bg_color: '#2c2c2e'
  };
}; 