import { telegramService } from './telegramService';

interface User {
  username: string;
  id?: string;
  firstName?: string;
  lastName?: string;
}

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(username: string, password: string): Promise<User> {
    // В демо-версии просто возвращаем объект пользователя
    return {
      username,
      id: '1',
      firstName: 'Demo',
      lastName: 'User'
    };
  }
}

export const authService = AuthService.getInstance(); 