import { ConstructionProject } from '../types/construction';

export const constructionProjects: ConstructionProject[] = [
  {
    id: '1',
    title: 'Модернизация насосной станции "Сырдарья-1"',
    description: 'Комплексная модернизация насосной станции с внедрением умных систем мониторинга и управления. Проект включает установку современного энергоэффективного оборудования и интеграцию IoT-датчиков для контроля качества воды и эффективности работы станции.',
    location: {
      lat: 40.8735,
      lng: 68.6621,
      region: 'Сырдарьинская область',
      city: 'Сырдарья'
    },
    type: 'modernization',
    status: 'active',
    totalBudget: 12500000,
    spentBudget: 4750000,
    startDate: '2024-01-15',
    estimatedEndDate: '2024-12-30',
    mainContractor: 'УзбекГидроСтрой',
    innovations: [
      {
        name: 'Умные насосы с предиктивной аналитикой',
        description: 'Насосные системы с встроенными датчиками и ИИ для предсказания необходимости обслуживания',
        impact: 'Снижение энергопотребления на 35% и увеличение срока службы оборудования на 40%'
      },
      {
        name: 'Блокчейн-система контроля качества воды',
        description: 'Непрерывный мониторинг параметров воды с записью в блокчейн',
        impact: 'Полная прозрачность данных о качестве воды и невозможность их фальсификации'
      }
    ],
    stages: [
      {
        id: '1-1',
        name: 'Демонтаж старого оборудования',
        status: 'completed',
        startDate: '2024-01-15',
        endDate: '2024-02-15',
        progress: 100,
        contractor: 'УзбекГидроСтрой',
        budget: {
          planned: 1500000,
          spent: 1450000,
          currency: 'USD'
        },
        sensors: [
          {
            id: 's1',
            type: 'water_quality',
            location: {
              lat: 40.8735,
              lng: 68.6621,
              region: 'Сырдарьинская область',
              city: 'Сырдарья'
            },
            lastReading: 95,
            unit: '%',
            status: 'active',
            lastUpdate: '2024-03-20T10:30:00Z',
            blockchain_hash: '0x8f2e54c7a9b3e4d8f5e6c7d8a9b0c1d2e3f4a5b6'
          }
        ],
        qualityMetrics: {
          waterQuality: 95,
          structuralIntegrity: 98,
          environmentalImpact: 92
        },
        documents: {
          permits: ['demolition_permit.pdf'],
          reports: ['environmental_assessment.pdf'],
          inspections: ['safety_inspection.pdf']
        }
      }
    ],
    blockchainData: {
      contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
      transactionsCount: 1458,
      lastUpdate: '2024-03-20T10:30:00Z'
    }
  },
  {
    id: '2',
    title: 'Строительство водоочистного комплекса "Чирчик"',
    description: 'Инновационный проект по строительству современного водоочистного комплекса с применением нанофильтрации и умных систем управления. Особое внимание уделяется экологической безопасности и энергоэффективности.',
    location: {
      lat: 41.4689,
      lng: 69.5827,
      region: 'Ташкентская область',
      city: 'Чирчик'
    },
    type: 'new_construction',
    status: 'active',
    totalBudget: 18000000,
    spentBudget: 7200000,
    startDate: '2024-02-01',
    estimatedEndDate: '2025-03-30',
    mainContractor: 'ЭкоСтройИнвест',
    innovations: [
      {
        name: 'Нанофильтрационные мембраны',
        description: 'Инновационная система очистки воды на основе нанотехнологий',
        impact: 'Повышение качества очистки воды на 45% при снижении использования химических реагентов на 60%'
      },
      {
        name: 'Система умного распределения нагрузки',
        description: 'ИИ-система оптимизации работы очистных сооружений',
        impact: 'Снижение энергопотребления на 40% и увеличение производительности на 25%'
      }
    ],
    stages: [
      {
        id: '2-1',
        name: 'Подготовка площадки и фундамент',
        status: 'completed',
        startDate: '2024-02-01',
        endDate: '2024-03-15',
        progress: 100,
        contractor: 'ЭкоСтройИнвест',
        budget: {
          planned: 2000000,
          spent: 1950000,
          currency: 'USD'
        },
        sensors: [
          {
            id: 's2',
            type: 'ph',
            location: {
              lat: 41.4689,
              lng: 69.5827,
              region: 'Ташкентская область',
              city: 'Чирчик'
            },
            lastReading: 7.2,
            unit: 'pH',
            status: 'active',
            lastUpdate: '2024-03-20T10:30:00Z',
            blockchain_hash: '0x7d8e9f0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'
          }
        ],
        qualityMetrics: {
          waterQuality: 97,
          structuralIntegrity: 100,
          environmentalImpact: 95
        },
        documents: {
          permits: ['construction_permit.pdf'],
          reports: ['geological_survey.pdf'],
          inspections: ['foundation_inspection.pdf']
        }
      }
    ],
    blockchainData: {
      contractAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
      transactionsCount: 2156,
      lastUpdate: '2024-03-20T10:30:00Z'
    }
  },
  {
    id: '3',
    title: 'Реконструкция ирригационной системы "Зарафшан"',
    description: 'Проект по модернизации ирригационной системы с внедрением умного распределения воды и контроля потерь. Включает установку IoT-датчиков и автоматизированных шлюзов.',
    location: {
      lat: 39.7027,
      lng: 66.9309,
      region: 'Самаркандская область',
      city: 'Самарканд'
    },
    type: 'modernization',
    status: 'preparation',
    totalBudget: 8500000,
    spentBudget: 850000,
    startDate: '2024-04-01',
    estimatedEndDate: '2024-11-30',
    mainContractor: 'ИрригацияТех',
    innovations: [
      {
        name: 'Умные шлюзы с автоматическим управлением',
        description: 'Система автоматического регулирования потока воды на основе реальных потребностей',
        impact: 'Сокращение потерь воды на 50% и повышение эффективности распределения на 35%'
      },
      {
        name: 'Распределенная сеть IoT-датчиков',
        description: 'Система мониторинга состояния каналов и качества воды',
        impact: 'Раннее обнаружение проблем и сокращение времени реагирования на 70%'
      }
    ],
    stages: [
      {
        id: '3-1',
        name: 'Картографирование и планирование',
        status: 'in_progress',
        startDate: '2024-04-01',
        endDate: '2024-04-30',
        progress: 60,
        contractor: 'ИрригацияТех',
        budget: {
          planned: 500000,
          spent: 300000,
          currency: 'USD'
        },
        sensors: [
          {
            id: 's3',
            type: 'flow',
            location: {
              lat: 39.7027,
              lng: 66.9309,
              region: 'Самаркандская область',
              city: 'Самарканд'
            },
            lastReading: 120,
            unit: 'm³/h',
            status: 'active',
            lastUpdate: '2024-03-20T10:30:00Z',
            blockchain_hash: '0x2a3b4c5d6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1'
          }
        ],
        qualityMetrics: {
          waterQuality: 94,
          structuralIntegrity: 96,
          environmentalImpact: 98
        },
        documents: {
          permits: ['survey_permit.pdf'],
          reports: ['initial_assessment.pdf'],
          inspections: ['system_audit.pdf']
        }
      }
    ],
    blockchainData: {
      contractAddress: '0x9876543210fedcba9876543210fedcba98765432',
      transactionsCount: 856,
      lastUpdate: '2024-03-20T10:30:00Z'
    }
  }
]; 