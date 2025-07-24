export interface InfoPage {
  id: string;
  title: string;
  description: string;
  slug: string;
  icon: string;
  category: InfoCategory;
  priority: number; // для сортировки
  featured: boolean;
  readTime: number; // в минутах
  lastUpdated: Date;
  tags: string[];
}

export interface InfoCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  slug: string;
  pages: InfoPage[];
}

export interface InfoSection {
  category: InfoCategory;
  pages: InfoPage[];
}

export enum InfoCategoryType {
  BASIC = 'basic',           // Основные
  DIRECTIONS = 'directions', // По направлениям
  PREPARATION = 'preparation', // Подготовительные
  REFERENCE = 'reference',   // Справочные
  SERVICES = 'services',     // Сервисные
  EXPERT = 'expert',         // Экспертные
  EDUCATION = 'education'    // Образовательные
} 