import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ChartBarIcon,
  AcademicCapIcon,
  OfficeBuildingIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  XIcon,
  CogIcon,
} from '@heroicons/react/outline';
import WaterDropIcon from '../../assets/icons/WaterDropIcon';
import PreSaleProgress from '../../components/PreSaleProgress';
import SalesRoadmap from '../../components/SalesRoadmap';

interface StatCard {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  route: string;
}

interface Partner {
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  route: string;
}

interface Achievement {
  value: string;
  label: string;
  description: string;
}

interface Section {
  id: string;
  title: string;
  items: Partner[] | Achievement[];
}

const stats: StatCard[] = [
  {
    id: 'water-quality',
    title: 'Качество воды',
    value: '92%',
    change: '+2.3%',
    isPositive: true,
    icon: WaterDropIcon,
  },
  {
    id: 'efficiency',
    title: 'Эффективность',
    value: '87%',
    change: '+4.1%',
    isPositive: true,
    icon: ChartBarIcon,
  },
  {
    id: 'coverage',
    title: 'Охват территории',
    value: '76%',
    change: '+12.5%',
    isPositive: true,
    icon: ChartBarIcon,
  },
];

const features: Feature[] = [
  {
    id: 'innovation',
    title: 'Инновации',
    description: 'Передовые решения в водоподготовке',
    icon: WaterDropIcon,
    route: '/projects',
  },
  {
    id: 'ecosystem',
    title: 'Экосистема',
    description: 'Единая платформа управления',
    icon: WaterDropIcon,
    route: '/overview',
  },
  {
    id: 'science',
    title: 'Наука',
    description: 'Исследования и разработки',
    icon: AcademicCapIcon,
    route: '/science',
  },
  {
    id: 'governance',
    title: 'Управление',
    description: 'Цифровизация процессов',
    icon: ChartBarIcon,
    route: '/management',
  },
  {
    id: 'global',
    title: 'Охват',
    description: 'Международное сотрудничество',
    icon: ChartBarIcon,
    route: '/relations',
  },
  {
    id: 'security',
    title: 'Безопасность',
    description: 'Защита ресурсов',
    icon: ShieldCheckIcon,
    route: '/monitoring',
  },
];

const partners: Partner[] = [
  {
    name: 'Государственный сектор',
    description: 'Сотрудничество с государственными органами в области управления водными ресурсами',
    icon: WaterDropIcon,
    route: '/government',
  },
  {
    name: 'Научные институты',
    description: 'Исследования и разработки в сфере водных технологий',
    icon: AcademicCapIcon,
    route: '/science',
  },
  {
    name: 'Бизнес-партнеры',
    description: 'Реализация коммерческих проектов и инвестиции в развитие',
    icon: CurrencyDollarIcon,
    route: '/corporate',
  },
];

const achievements: Achievement[] = [
  {
    value: '500+',
    label: 'Проектов',
    description: 'Успешно реализованных проектов в сфере водоподготовки и управления ресурсами',
  },
  {
    value: '50+',
    label: 'Стран',
    description: 'Международное сотрудничество и обмен опытом с партнерами по всему миру',
  },
  {
    value: '1M+',
    label: 'Пользователей',
    description: 'Активных пользователей системы VODeco по всему миру',
  },
];

const sections: Section[] = [
  {
    id: 'partners',
    title: 'Партнеры',
    items: partners,
  },
  {
    id: 'achievements',
    title: 'Достижения',
    items: achievements,
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [activeSection, setActiveSection] = useState('overview');

  const currentPreSale = {
    stage: 1,
    tokenPrice: 0.4,
    totalVolume: 2500000,
    collectedPercentage: 15,
    collectedAmount: 375000
  };

  const handleBuyClick = () => {
    // TODO: Добавить логику для покупки токенов
    console.log('Buy tokens clicked');
  };

  const presaleProgress = 15; // Процент выполнения пресейла

  const ecosystemComponents = [
    {
      icon: WaterDropIcon,
      title: 'Умное управление',
      description: 'Инновационные технологии для эффективного управления водными ресурсами',
    },
    {
      icon: ChartBarIcon,
      title: 'Экологический мониторинг',
      description: 'Комплексная система отслеживания состояния водных объектов',
    },
    {
      icon: AcademicCapIcon,
      title: 'Научные исследования',
      description: 'Передовые исследования в области водных ресурсов',
    },
    {
      icon: OfficeBuildingIcon,
      title: 'Образование',
      description: 'Образовательные программы и курсы повышения квалификации',
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Партнерская сеть',
      description: 'Сотрудничество с ведущими компаниями и организациями',
    },
    {
      icon: CogIcon,
      title: 'Международное сотрудничество',
      description: 'Глобальные инициативы и обмен опытом',
    },
  ];

  const handleParticipateClick = () => {
    navigate('/wallet');
  };

  const handleStartGameClick = () => {
    navigate('/gamification');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero секция с кнопкой участвовать */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-6">
          Революция в управлении водными ресурсами
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Присоединяйтесь к инновационной экосистеме VODeco
        </p>
        <motion.button
          onClick={handleParticipateClick}
          className="bg-gradient-eco text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Участвовать
        </motion.button>
      </div>

      {/* Секция пресейла */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 mb-12">
        <h2 className="text-3xl font-bold text-white mb-6">Пресейл VODeco</h2>
        <div className="bg-blue-950 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white">Прогресс пресейла</span>
            <span className="text-blue-400">{presaleProgress}%</span>
          </div>
          <div className="w-full h-4 bg-blue-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${presaleProgress}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-blue-400 to-blue-300"
            />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="text-gray-300">
              <div>Soft Cap: 500,000 USDT</div>
              <div>Hard Cap: 2,000,000 USDT</div>
            </div>
            <div className="text-gray-300">
              <div>Цена токена: 0.1 USDT</div>
              <div>Минимальная покупка: 100 USDT</div>
            </div>
          </div>
          <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
            Участвовать в пресейле
          </button>
        </div>
      </div>

      {/* Описание проекта */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          VODeco - Экосистема управления водными ресурсами
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Инновационная платформа, объединяющая технологии, науку и общество для эффективного управления водными ресурсами и устойчивого развития водного хозяйства.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ecosystemComponents.map((component, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <component.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{component.title}</h3>
              <p className="text-gray-600">{component.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Преимущества */}
      <div className="bg-gray-50 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Преимущества платформы</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow">
            <WaterDropIcon className="h-10 w-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Комплексный подход</h3>
            <p className="text-gray-600">
              Интеграция всех аспектов управления водными ресурсами в единую экосистему, от мониторинга до принятия решений
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow">
            <ChartBarIcon className="h-10 w-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Прозрачность</h3>
            <p className="text-gray-600">
              Использование блокчейн-технологий для обеспечения прозрачности и надежности данных
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow">
            <CogIcon className="h-10 w-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Автоматизация</h3>
            <p className="text-gray-600">
              Умные контракты и IoT-устройства для автоматизации процессов управления и мониторинга
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow">
            <WaterDropIcon className="h-10 w-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Сообщество</h3>
            <p className="text-gray-600">
              Активное вовлечение всех заинтересованных сторон в процесс управления водными ресурсами
            </p>
          </div>
        </div>
      </div>

      {/* Секция с игровым исследованием */}
      <div className="mt-16 bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Начните свое путешествие в мире VODeco
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Исследуйте экосистему, выполняйте задания и получайте вознаграждения
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <motion.button
              onClick={handleStartGameClick}
              className="bg-gradient-eco text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Начать игровое исследование
            </motion.button>
            <motion.button
              onClick={handleParticipateClick}
              className="bg-white/10 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Забрать пакет токенов
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 