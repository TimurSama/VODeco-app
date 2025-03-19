// @ts-nocheck
export const TELEGRAM_BOT_TOKEN = '7101935252:AAEF4Lb3-botFRs0Isf40x19Wk5PN6P2vSE';
export const TELEGRAM_WEB_APP_URL = 'https://TimurSama.github.io/VODeco-app';

// Проверяем, запущено ли приложение в Telegram
export const isTelegramWebApp = () => {
  return Boolean(window.Telegram?.WebApp);
};

// Получаем никнейм пользователя из Telegram
export const getTelegramUsername = () => {
  if (!isTelegramWebApp()) return null;
  const webApp = window.Telegram?.WebApp;
  if (!webApp) return null;
  return webApp.initDataUnsafe?.user?.username || null;
};

export const initTelegramWebApp = () => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }
};

export const getTelegramUser = () => {
  if (!isTelegramWebApp()) return null;
  return window.Telegram.WebApp.initDataUnsafe.user;
};

export const getTelegramTheme = () => {
  if (!isTelegramWebApp()) return 'light';
  return window.Telegram.WebApp.colorScheme;
};

export const getTelegramThemeParams = () => {
  if (!isTelegramWebApp()) return null;
  return window.Telegram.WebApp.themeParams;
}; 