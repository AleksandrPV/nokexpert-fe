export interface InfoPage {
  id: string;
  title: string;
  description: string;
  slug: string;
  icon?: string;
  lucideIcon: string;
  category: InfoCategory;
  priority: number;
  featured: boolean;
  readTime: number;
  lastUpdated: Date;
  tags: string[];
}

export interface InfoCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
  lucideIcon: string;
  color?: string;
  colorClass: string;
  iconBgClass: string;
  iconTextClass: string;
  slug: string;
  pages: InfoPage[];
}

export interface InfoSection {
  category: InfoCategory;
  pages: InfoPage[];
}

export enum InfoCategoryType {
  BASIC = 'basic',
  DIRECTIONS = 'directions',
  PREPARATION = 'preparation',
  REFERENCE = 'reference',
  SERVICES = 'services',
  EXPERT = 'expert',
  EDUCATION = 'education'
}
