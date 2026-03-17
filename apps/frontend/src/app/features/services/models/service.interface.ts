export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: string;
  duration: string;
  features: string[];
  category: ServiceCategory;
  popular?: boolean;
  difficulty: 'Начальный' | 'Средний' | 'Продвинутый';
  route?: string;
}

export enum ServiceCategory {
  CONSTRUCTION = 'construction',
  DESIGN = 'design',
  RESEARCH = 'research',
  SAFETY = 'safety',
  CONSULTATION = 'consultation',
  EMERGENCY = 'emergency',  // МЧС
  HOUSING = 'housing',      // ЖКХ
  TRAINER = 'trainer'       // Тренажёр
}

export interface ServiceStats {
  successRate: number;
  clientsServed: number;
  averageScore: number;
  certificationTime: string;
} 