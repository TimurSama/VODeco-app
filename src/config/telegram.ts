export const initTelegramWebApp = () => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }
};

export const getTelegramUser = () => {
  if (window.Telegram?.WebApp) {
    return window.Telegram.WebApp.initDataUnsafe.user;
  }
  return null;
};

export const isTelegramWebApp = () => {
  return !!window.Telegram?.WebApp;
}; 