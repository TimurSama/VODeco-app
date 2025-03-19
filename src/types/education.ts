export type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type CourseCategory = 'water_management' | 'engineering' | 'ecology' | 'smart_tech' | 'blockchain' | 'governance';
export type ContentType = 'video' | 'article' | 'presentation' | 'quiz' | 'interactive' | 'case_study';

export interface CourseProgress {
  completed: number;
  total: number;
  lastAccessed: string;
  quizScores: {
    quizId: string;
    score: number;
    maxScore: number;
    completedAt: string;
  }[];
  certificateIssued?: {
    id: string;
    issuedAt: string;
    blockchain_hash: string;
  };
}

export interface CourseContent {
  id: string;
  title: string;
  type: ContentType;
  duration: number; // в минутах
  description: string;
  url: string;
  attachments?: {
    name: string;
    type: string;
    url: string;
  }[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: CourseLevel;
  category: CourseCategory;
  duration: number; // общая продолжительность в минутах
  instructor: {
    id: string;
    name: string;
    title: string;
    organization: string;
    avatar?: string;
  };
  rating: {
    average: number;
    count: number;
  };
  enrollments: number;
  contents: CourseContent[];
  requirements: string[];
  outcomes: string[];
  certification: {
    type: 'professional' | 'academic' | 'participation';
    validityPeriod?: number; // в месяцах
    accreditedBy?: string[];
  };
  tags: string[];
  thumbnail: string;
  startDate: string;
  language: 'ru' | 'uz' | 'en';
  price?: {
    amount: number;
    currency: string;
  };
}

export interface EducationalResource {
  id: string;
  title: string;
  type: ContentType;
  category: CourseCategory;
  description: string;
  author: string;
  publishedAt: string;
  url: string;
  thumbnail?: string;
  downloads?: number;
  views?: number;
  language: 'ru' | 'uz' | 'en';
  tags: string[];
  isFeatured: boolean;
} 