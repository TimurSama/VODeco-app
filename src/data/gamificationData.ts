import { Quest, Achievement, DailyReward, InteractiveChallenge } from '../types/gamification';

export const initialQuests: Quest[] = [
  {
    id: 'welcome_tour',
    title: 'Добро пожаловать в VODeco',
    description: 'Пройдите ознакомительный тур по платформе',
    type: 'tutorial',
    status: 'available',
    reward: 10,
  },
  {
    id: 'explore_water_management',
    title: 'Исследователь водных ресурсов',
    description: 'Изучите раздел управления водными ресурсами',
    type: 'exploration',
    status: 'available',
    reward: 15,
    prerequisites: ['welcome_tour'],
  },
  {
    id: 'complete_water_quiz',
    title: 'Знаток водных ресурсов',
    description: 'Пройдите тест по основам управления водными ресурсами',
    type: 'interaction',
    status: 'locked',
    reward: 20,
    prerequisites: ['explore_water_management'],
  },
  {
    id: 'daily_login',
    title: 'Ежедневный бонус',
    description: 'Получите ежедневную награду за вход в систему',
    type: 'daily',
    status: 'available',
    reward: 5,
  },
];

export const achievements: Achievement[] = [
  {
    id: 'first_steps',
    title: 'Первые шаги',
    description: 'Завершите свой первый квест',
    icon: '🎯',
    reward: 10,
    isUnlocked: false,
  },
  {
    id: 'water_expert',
    title: 'Эксперт по воде',
    description: 'Пройдите все тесты по водным ресурсам',
    icon: '💧',
    reward: 25,
    isUnlocked: false,
  },
  {
    id: 'daily_master',
    title: 'Мастер ежедневных наград',
    description: 'Соберите 7 дней подряд ежедневные награды',
    icon: '🌟',
    reward: 30,
    isUnlocked: false,
  },
];

export const dailyRewards: DailyReward[] = [
  { day: 1, reward: 5, isClaimed: false, multiplier: 1 },
  { day: 2, reward: 7, isClaimed: false, multiplier: 1.2 },
  { day: 3, reward: 10, isClaimed: false, multiplier: 1.5 },
  { day: 4, reward: 12, isClaimed: false, multiplier: 1.8 },
  { day: 5, reward: 15, isClaimed: false, multiplier: 2 },
  { day: 6, reward: 20, isClaimed: false, multiplier: 2.5 },
  { day: 7, reward: 25, isClaimed: false, multiplier: 3 },
];

export const interactiveChallenges: InteractiveChallenge[] = [
  {
    id: 'water_cycle_quiz',
    title: 'Водный цикл',
    description: 'Проверьте свои знания о круговороте воды в природе',
    type: 'quiz',
    reward: 15,
    difficulty: 'easy',
    isCompleted: false,
    attempts: 0,
    maxAttempts: 3,
  },
  {
    id: 'water_management_sim',
    title: 'Управление водными ресурсами',
    description: 'Попробуйте себя в роли менеджера водных ресурсов',
    type: 'simulation',
    reward: 25,
    cost: 5,
    difficulty: 'medium',
    isCompleted: false,
    attempts: 0,
    maxAttempts: 2,
  },
  {
    id: 'water_puzzle',
    title: 'Водная головоломка',
    description: 'Соберите пазл, связанный с водными ресурсами',
    type: 'puzzle',
    reward: 20,
    difficulty: 'hard',
    isCompleted: false,
    attempts: 0,
    maxAttempts: 1,
  },
]; 