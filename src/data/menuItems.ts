import {
  HomeIcon,
  GlobeAltIcon,
  ChatIcon,
  CreditCardIcon,
  ChartBarIcon,
  UserIcon,
  ChartBarIcon as PresentationChartLineIcon,
  DocumentTextIcon,
  CogIcon,
  DesktopComputerIcon,
  UserGroupIcon,
  LibraryIcon,
  OfficeBuildingIcon,
  BeakerIcon,
  CogIcon as ConstructionIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  OfficeBuildingIcon as BuildingOffice2Icon,
  GlobeIcon,
  CloudIcon,
  PuzzleIcon,
  UserCircleIcon,
  ChatIcon as ChatBubbleLeftRightIcon,
  AcademicCapIcon as AcademicCap2Icon,
  ShieldCheckIcon,
  XIcon,
  MenuIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/outline'
import WaterDropIcon from '../assets/icons/WaterDropIcon';

interface MenuItem {
  id: string;
  name: string;
  href: string;
  icon: any;
}

interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}

export const menuItems: MenuSection[] = [
  {
    id: 'account',
    title: 'АККАУНТ',
    items: [
      { id: 'profile', name: 'Профиль', href: '/profile', icon: UserIcon },
      { id: 'wallet', name: 'Кошелек', href: '/wallet', icon: CreditCardIcon },
      { id: 'staking', name: 'Стейкинг', href: '/staking', icon: ChartBarIcon },
      { id: 'messages', name: 'Сообщения', href: '/messages', icon: ChatIcon },
    ],
  },
  {
    id: 'main',
    title: 'ОСНОВНОЕ',
    items: [
      { id: 'home', name: 'Главная', href: '/', icon: HomeIcon },
      { id: 'overview', name: 'Обзор', href: '/overview', icon: PresentationChartLineIcon },
    ],
  },
  {
    id: 'activities',
    title: 'АКТИВНОСТИ',
    items: [
      { id: 'projects', name: 'Проекты', href: '/projects', icon: DocumentTextIcon },
      { id: 'management', name: 'Управление', href: '/management', icon: CogIcon },
      { id: 'monitoring', name: 'Мониторинг', href: '/monitoring', icon: DesktopComputerIcon },
      { id: 'community', name: 'Сообщество', href: '/community', icon: UserGroupIcon },
    ],
  },
  {
    id: 'partners',
    title: 'ПАРТНЕРЫ',
    items: [
      { id: 'government', name: 'Государственный', href: '/government', icon: LibraryIcon },
      { id: 'corporate', name: 'Корпоративный', href: '/corporate', icon: OfficeBuildingIcon },
      { id: 'science', name: 'Научный', href: '/science', icon: BeakerIcon },
      { id: 'social', name: 'Общественный', href: '/social', icon: UserGroupIcon },
    ],
  },
  {
    id: 'development',
    title: 'РАЗВИТИЕ',
    items: [
      { id: 'construction', name: 'Строительство', href: '/construction', icon: ConstructionIcon },
      { id: 'modernization', name: 'Модернизация', href: '/modernization', icon: CogIcon },
      { id: 'education', name: 'Обучение', href: '/education', icon: AcademicCapIcon },
      { id: 'investment', name: 'Инвестиции', href: '/investment', icon: CurrencyDollarIcon },
      { id: 'bank', name: 'Банк воды', href: '/bank', icon: BuildingOffice2Icon },
      { id: 'institute', name: 'Научный институт', href: '/institute', icon: BeakerIcon },
    ],
  },
  {
    id: 'international',
    title: 'МЕЖДУНАРОДНОЕ СОТРУДНИЧЕСТВО',
    items: [
      { id: 'relations', name: 'Международные отношения', href: '/relations', icon: GlobeIcon },
      { id: 'challenges', name: 'Глобальные вызовы', href: '/challenges', icon: CloudIcon },
    ],
  },
  {
    id: 'extensions',
    title: 'ДОПОЛНИТЕЛЬНО',
    items: [
      { id: 'extensions', name: 'Расширения', href: '/extensions', icon: PuzzleIcon },
    ],
  },
  {
    id: 'main',
    title: 'Главное',
    items: [
      {
        id: 'home',
        name: 'Главная',
        icon: HomeIcon,
        href: '/',
      },
      {
        id: 'profile',
        name: 'Профиль',
        icon: UserCircleIcon,
        href: '/profile',
      },
      {
        id: 'wallet',
        name: 'Кошелек',
        icon: CreditCardIcon,
        href: '/wallet',
      },
    ],
  },
  {
    id: 'features',
    title: 'Функции',
    items: [
      {
        id: 'staking',
        name: 'Стейкинг',
        icon: CurrencyDollarIcon,
        href: '/staking',
      },
      {
        id: 'messages',
        name: 'Сообщения',
        icon: ChatBubbleLeftRightIcon,
        href: '/messages',
      },
    ],
  },
  {
    id: 'settings',
    title: 'Настройки',
    items: [
      {
        id: 'settings',
        name: 'Настройки',
        icon: CogIcon,
        href: '/settings',
      },
    ],
  },
]; 