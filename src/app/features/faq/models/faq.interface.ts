export interface FaqCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  count?: number;
}

export interface FaqQuestion {
  id: string;
  slug: string;
  question: string;
  shortAnswer: string;
  fullAnswer: string;
  category: string;
  tags: string[];
  relatedQuestions?: string[];
  priority: number;
  isPopular: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FaqFilter {
  category?: string;
  tags?: string[];
  search?: string;
  isPopular?: boolean;
}

export interface FaqSearchResult {
  questions: FaqQuestion[];
  total: number;
  categories: FaqCategory[];
} 