import { User } from '../types/user';

interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

const STORAGE_KEY = 'users';

const defaultUsers: User[] = [
  {
    id: '1',
    name: 'Александр Петров',
    email: 'foxampy@vodeco.com',
    password: '6251',
    role: 'admin',
    status: 'owner',
    profession: {
      title: 'PhD',
      position: 'Креативный инноватор',
      companies: ['Cosmic Creative', 'VODeco', 'UNICAP']
    },
    achievements: {
      awards: [
        '#1 Хакатон креативной безопасности криптобанка',
        'Лучший инноватор года 2023',
        'Премия за вклад в развитие Web3'
      ],
      certificates: [
        'Advanced Blockchain Development',
        'AI & Machine Learning Fundamentals',
        'Creative Innovation Leadership'
      ],
      skills: [
        'Blockchain',
        'AI/ML',
        'Web3',
        'Креативное мышление',
        'Инновации',
        'Управление проектами'
      ]
    },
    verification: {
      isVerified: true,
      documents: ['ID', 'Diploma', 'Certificates'],
      level: 'enterprise'
    },
    social: {
      twitter: 'https://twitter.com/foxampy',
      linkedin: 'https://linkedin.com/in/foxampy',
      github: 'https://github.com/foxampy'
    },
    statistics: {
      projects: 25,
      contributions: 150,
      reputation: 1000
    },
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  }
];

class UserService {
  private users: User[] = [];

  constructor() {
    this.initializeStorage();
  }

  private initializeStorage() {
    const storedUsers = localStorage.getItem(STORAGE_KEY);
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      this.users = defaultUsers;
      this.saveUsers();
    }
  }

  private saveUsers() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.users));
  }

  getUsers(): User[] {
    return this.users;
  }

  findUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  registerUser(name: string, email: string, password: string): User {
    const existingUser = this.findUserByEmail(email);
    if (existingUser) {
      throw new Error('Пользователь с таким email уже существует');
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: 'user',
      status: 'unverified',
      profession: {
        title: '',
        position: '',
        companies: []
      },
      achievements: {
        awards: [],
        certificates: [],
        skills: []
      },
      verification: {
        isVerified: false,
        documents: [],
        level: 'basic'
      },
      social: {},
      statistics: {
        projects: 0,
        contributions: 0,
        reputation: 0
      },
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    this.users.push(newUser);
    this.saveUsers();
    return newUser;
  }

  loginUser(email: string, password: string): AuthResponse {
    try {
      const user = this.findUserByEmail(email);
      if (!user || user.password !== password) {
        return {
          success: false,
          error: 'Неверный email или пароль'
        };
      }

      user.lastLogin = new Date().toISOString();
      this.saveUsers();
      
      return {
        success: true,
        user
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Произошла ошибка при входе'
      };
    }
  }
}

export const userService = new UserService(); 