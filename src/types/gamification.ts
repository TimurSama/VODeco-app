export type QuestType = 'tutorial' | 'exploration' | 'interaction' | 'achievement' | 'daily';

export type QuestStatus = 'available' | 'in_progress' | 'completed' | 'locked';

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: QuestType;
  status: QuestStatus;
  reward: number; // количество VOD токенов
  requiredLevel?: number;
  prerequisites?: string[]; // ID других квестов
  progress?: {
    current: number;
    total: number;
  };
  expiresAt?: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  reward: number;
  isUnlocked: boolean;
  unlockedAt?: Date;
}

export interface DailyReward {
  day: number;
  reward: number;
  isClaimed: boolean;
  multiplier: number;
}

export interface UserProgress {
  level: number;
  experience: number;
  totalTokens: number;
  completedQuests: string[];
  unlockedAchievements: string[];
  dailyStreak: number;
  lastDailyReward: Date;
}

export interface InteractiveChallenge {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'simulation' | 'puzzle' | 'minigame';
  reward: number;
  cost?: number; // стоимость участия в токенах
  difficulty: 'easy' | 'medium' | 'hard';
  isCompleted: boolean;
  attempts: number;
  maxAttempts: number;
} 