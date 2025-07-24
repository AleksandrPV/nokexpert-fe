export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  publishedAt: Date;
  updatedAt: Date;
  author: BlogAuthor;
  category: BlogCategory;
  tags: BlogTag[];
  featuredImage: string;
  readTime: number; // в минутах
  views: number;
  featured: boolean;
  status: ArticleStatus;
}

export interface BlogAuthor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  articleCount: number;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export enum ArticleStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

export interface BlogFilters {
  search: string;
  category: string;
  tags: string[];
  author: string;
  sortBy: SortOption;
  dateRange: DateRange;
}

export enum SortOption {
  NEWEST = 'newest',
  OLDEST = 'oldest',
  MOST_VIEWED = 'most_viewed',
  MOST_RELEVANT = 'most_relevant'
}

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
} 