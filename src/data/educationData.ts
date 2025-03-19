import { Course, EducationalResource } from '../types/education';

export const courses: Course[] = [
  {
    id: '1',
    title: 'Умное управление водными ресурсами',
    description: 'Комплексный курс по современным методам управления водными ресурсами с использованием IoT и блокчейн технологий. Вы изучите принципы работы умных датчиков, систем автоматизации и прозрачного мониторинга водных объектов.',
    level: 'intermediate',
    category: 'smart_tech',
    duration: 2400, // 40 часов
    instructor: {
      id: 'i1',
      name: 'Алексей Водников',
      title: 'Доктор технических наук',
      organization: 'Институт водных проблем',
      avatar: '/images/instructors/vodnikov.jpg'
    },
    rating: {
      average: 4.8,
      count: 245
    },
    enrollments: 1250,
    contents: [
      {
        id: 'c1-1',
        title: 'Введение в умное управление водными ресурсами',
        type: 'video',
        duration: 45,
        description: 'Обзор современных технологий в управлении водными ресурсами',
        url: '/courses/smart-water/intro'
      },
      {
        id: 'c1-2',
        title: 'IoT-датчики в водном хозяйстве',
        type: 'interactive',
        duration: 90,
        description: 'Практическое занятие по работе с датчиками',
        url: '/courses/smart-water/iot'
      }
    ],
    requirements: [
      'Базовые знания в области водного хозяйства',
      'Понимание принципов работы датчиков',
      'Начальные навыки работы с компьютером'
    ],
    outcomes: [
      'Умение настраивать и обслуживать IoT-системы мониторинга',
      'Навыки анализа данных с водных объектов',
      'Понимание принципов блокчейн в управлении водными ресурсами'
    ],
    certification: {
      type: 'professional',
      validityPeriod: 24,
      accreditedBy: ['Министерство водного хозяйства', 'Институт водных проблем']
    },
    tags: ['IoT', 'блокчейн', 'умные датчики', 'автоматизация', 'мониторинг'],
    thumbnail: '/images/courses/smart-water.jpg',
    startDate: '2024-04-01',
    language: 'ru',
    price: {
      amount: 299,
      currency: 'USD'
    }
  },
  {
    id: '2',
    title: 'Экологический менеджмент водных ресурсов',
    description: 'Изучите современные подходы к экологическому управлению водными ресурсами. Курс охватывает вопросы сохранения экосистем, очистки воды и устойчивого развития.',
    level: 'advanced',
    category: 'ecology',
    duration: 1800, // 30 часов
    instructor: {
      id: 'i2',
      name: 'Зарина Экологова',
      title: 'Кандидат экологических наук',
      organization: 'Экологический центр',
      avatar: '/images/instructors/ekologova.jpg'
    },
    rating: {
      average: 4.9,
      count: 178
    },
    enrollments: 890,
    contents: [
      {
        id: 'c2-1',
        title: 'Основы экологического менеджмента',
        type: 'video',
        duration: 60,
        description: 'Введение в экологическое управление водными ресурсами',
        url: '/courses/eco-management/intro'
      },
      {
        id: 'c2-2',
        title: 'Практикум по оценке качества воды',
        type: 'interactive',
        duration: 120,
        description: 'Практические занятия по анализу качества воды',
        url: '/courses/eco-management/water-quality'
      }
    ],
    requirements: [
      'Базовые знания экологии',
      'Понимание принципов охраны окружающей среды',
      'Опыт работы в сфере водных ресурсов'
    ],
    outcomes: [
      'Навыки экологического мониторинга водных объектов',
      'Умение разрабатывать природоохранные мероприятия',
      'Компетенции в области устойчивого развития'
    ],
    certification: {
      type: 'professional',
      validityPeriod: 36,
      accreditedBy: ['Экологический центр', 'Международный институт экологии']
    },
    tags: ['экология', 'устойчивое развитие', 'охрана природы', 'качество воды'],
    thumbnail: '/images/courses/eco-management.jpg',
    startDate: '2024-04-15',
    language: 'ru'
  },
  {
    id: '3',
    title: 'Блокчейн в водном хозяйстве',
    description: 'Практический курс по применению блокчейн-технологий в управлении водными ресурсами. Изучите смарт-контракты, токенизацию водных активов и системы прозрачного учета.',
    level: 'expert',
    category: 'blockchain',
    duration: 1200, // 20 часов
    instructor: {
      id: 'i3',
      name: 'Тимур Блокчейнов',
      title: 'Ведущий специалист по блокчейн',
      organization: 'Центр цифровых технологий',
      avatar: '/images/instructors/blockchaynov.jpg'
    },
    rating: {
      average: 4.7,
      count: 156
    },
    enrollments: 680,
    contents: [
      {
        id: 'c3-1',
        title: 'Введение в блокчейн',
        type: 'video',
        duration: 90,
        description: 'Основы блокчейн-технологий и их применение в водном хозяйстве',
        url: '/courses/blockchain/intro'
      },
      {
        id: 'c3-2',
        title: 'Разработка смарт-контрактов',
        type: 'interactive',
        duration: 180,
        description: 'Практикум по созданию смарт-контрактов для водного хозяйства',
        url: '/courses/blockchain/smart-contracts'
      }
    ],
    requirements: [
      'Базовые знания программирования',
      'Понимание принципов работы блокчейн',
      'Опыт работы с криптовалютами'
    ],
    outcomes: [
      'Навыки разработки смарт-контрактов',
      'Умение создавать токены водных активов',
      'Компетенции в области блокчейн-аудита'
    ],
    certification: {
      type: 'professional',
      validityPeriod: 12,
      accreditedBy: ['Центр цифровых технологий', 'Blockchain Academy']
    },
    tags: ['блокчейн', 'смарт-контракты', 'токенизация', 'цифровизация'],
    thumbnail: '/images/courses/blockchain.jpg',
    startDate: '2024-05-01',
    language: 'ru',
    price: {
      amount: 499,
      currency: 'USD'
    }
  }
];

export const educationalResources: EducationalResource[] = [
  {
    id: 'r1',
    title: 'Руководство по внедрению IoT в водном хозяйстве',
    type: 'article',
    category: 'smart_tech',
    description: 'Подробное руководство по выбору и установке IoT-датчиков для мониторинга водных объектов',
    author: 'Центр цифровых технологий',
    publishedAt: '2024-03-15',
    url: '/resources/iot-guide',
    thumbnail: '/images/resources/iot-guide.jpg',
    downloads: 1250,
    views: 3800,
    language: 'ru',
    tags: ['IoT', 'датчики', 'мониторинг', 'автоматизация'],
    isFeatured: true
  },
  {
    id: 'r2',
    title: 'Экологическая безопасность водных объектов',
    type: 'presentation',
    category: 'ecology',
    description: 'Презентация о современных методах обеспечения экологической безопасности водных ресурсов',
    author: 'Институт экологии',
    publishedAt: '2024-03-10',
    url: '/resources/eco-safety',
    thumbnail: '/images/resources/eco-safety.jpg',
    downloads: 850,
    views: 2400,
    language: 'ru',
    tags: ['экология', 'безопасность', 'охрана природы'],
    isFeatured: true
  },
  {
    id: 'r3',
    title: 'Практикум по анализу качества воды',
    type: 'interactive',
    category: 'engineering',
    description: 'Интерактивный практикум по методам анализа и контроля качества воды',
    author: 'Лаборатория водных исследований',
    publishedAt: '2024-03-01',
    url: '/resources/water-quality',
    thumbnail: '/images/resources/water-quality.jpg',
    downloads: 620,
    views: 1800,
    language: 'ru',
    tags: ['качество воды', 'анализ', 'лабораторные исследования'],
    isFeatured: false
  }
]; 