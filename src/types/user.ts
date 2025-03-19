export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // В реальном приложении пароль будет хешироваться
  role: 'admin' | 'user';
  status: 'owner' | 'verified' | 'unverified';
  profession: {
    title: string;
    position: string;
    companies: string[];
  };
  achievements: {
    awards: string[];
    certificates: string[];
    skills: string[];
  };
  verification: {
    isVerified: boolean;
    documents: string[];
    level: 'basic' | 'advanced' | 'enterprise';
  };
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  statistics: {
    projects: number;
    contributions: number;
    reputation: number;
  };
  createdAt: string;
  lastLogin?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
} 