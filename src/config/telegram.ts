export const TELEGRAM_BOT_TOKEN = '7101935252:AAEF4Lb3-botFRs0Isf40x19Wk5PN6P2vSE';
export const TELEGRAM_WEB_APP_URL = 'https://TimurSama.github.io/VODeco-app';

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

export const isTelegramWebApp = () => {
  return window.Telegram?.WebApp !== undefined;
};

export const getTelegramTheme = () => {
  if (!isTelegramWebApp()) return 'light';
  return window.Telegram.WebApp.colorScheme;
};

export const getTelegramThemeParams = () => {
  if (!isTelegramWebApp()) return null;
  return window.Telegram.WebApp.themeParams;
}; 