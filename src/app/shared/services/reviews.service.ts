import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  reviewBody: string;
  reviewTitle: string;
  datePublished: string;
  serviceType: string;
  verified: boolean;
  helpful: number;
  avatar?: string;
  company?: string;
  position?: string;
}

export interface ReviewSchema {
  '@context': string;
  '@type': string;
  name: string;
  reviewRating: {
    '@type': string;
    ratingValue: number;
    bestRating: number;
    worstRating: number;
  };
  author: {
    '@type': string;
    name: string;
  };
  reviewBody: string;
  datePublished: string;
  publisher: {
    '@type': string;
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private readonly reviews: CustomerReview[] = [
    {
      id: '1',
      author: 'Александр Петров',
      rating: 5,
      reviewTitle: 'Отличная подготовка к НОК НОСТРОЙ',
      reviewBody: 'Прошел НОК НОСТРОЙ с первого раза! Сервис помог подготовить все документы и портфолио. Особенно понравился онлайн-тренажер - очень помог в подготовке к экзамену. Рекомендую всем специалистам строительной отрасли.',
      datePublished: '2024-01-15',
      serviceType: 'НОК НОСТРОЙ',
      verified: true,
      helpful: 24,
      company: 'ООО "СтройПроект"',
      position: 'Главный инженер'
    },
    {
      id: '2',
      author: 'Мария Сидорова',
      rating: 5,
      reviewTitle: 'Быстрое прохождение НОК ОПБ',
      reviewBody: 'Обратилась за помощью в прохождении НОК ОПБ. Все прошло очень быстро и качественно. Специалисты помогли собрать необходимые документы и подготовиться к экзамену. Результат превзошел ожидания!',
      datePublished: '2024-01-10',
      serviceType: 'НОК ОПБ',
      verified: true,
      helpful: 18,
      company: 'ИП "ПожарБезопасность"',
      position: 'Руководитель'
    },
    {
      id: '3',
      author: 'Дмитрий Козлов',
      rating: 5,
      reviewTitle: 'Профессиональная поддержка при НОК НОПРИЗ',
      reviewBody: 'Проходил НОК НОПРИЗ. Сервис оказал полную поддержку на всех этапах: от консультации до получения сертификата. Особенно ценно, что помогли разобраться в сложных вопросах законодательства.',
      datePublished: '2024-01-08',
      serviceType: 'НОК НОПРИЗ',
      verified: true,
      helpful: 31,
      company: 'ООО "ПроектСтрой"',
      position: 'Проектировщик'
    },
    {
      id: '4',
      author: 'Елена Волкова',
      rating: 5,
      reviewTitle: 'Качественная подготовка к экзамену',
      reviewBody: 'Использовала тренажер для подготовки к НОК. Очень удобный интерфейс, актуальные вопросы, подробные объяснения. Благодаря этому сервису сдала экзамен на отлично!',
      datePublished: '2024-01-05',
      serviceType: 'Подготовка к НОК',
      verified: true,
      helpful: 27,
      company: 'ООО "Архитектурное бюро"',
      position: 'Архитектор'
    },
    {
      id: '5',
      author: 'Сергей Николаев',
      rating: 5,
      reviewTitle: 'Помощь в составлении портфолио',
      reviewBody: 'Обратился за помощью в составлении портфолио для НОК. Специалисты помогли структурировать опыт работы и правильно оформить документы. Портфолио прошло проверку с первого раза.',
      datePublished: '2024-01-03',
      serviceType: 'Составление портфолио',
      verified: true,
      helpful: 22,
      company: 'ООО "СтройМонтаж"',
      position: 'Инженер-конструктор'
    },
    {
      id: '6',
      author: 'Анна Морозова',
      rating: 5,
      reviewTitle: 'Консультации по законодательству НОК',
      reviewBody: 'Получила подробные консультации по изменениям в законодательстве НОК. Специалисты объяснили все нововведения простым языком. Теперь чувствую себя уверенно в правовых вопросах.',
      datePublished: '2024-01-01',
      serviceType: 'Консультации',
      verified: true,
      helpful: 19,
      company: 'ИП "СтройКонсалт"',
      position: 'Консультант'
    }
  ];

  getReviews(serviceType?: string, limit: number = 6): Observable<CustomerReview[]> {
    let filteredReviews = this.reviews;
    
    if (serviceType) {
      filteredReviews = this.reviews.filter(review => 
        review.serviceType.toLowerCase().includes(serviceType.toLowerCase())
      );
    }
    
    return of(filteredReviews.slice(0, limit));
  }

  getFeaturedReviews(limit: number = 3): Observable<CustomerReview[]> {
    const featuredReviews = this.reviews
      .sort((a, b) => b.helpful - a.helpful)
      .slice(0, limit);
    
    return of(featuredReviews);
  }

  getAverageRating(): Observable<number> {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / this.reviews.length;
    return of(Math.round(averageRating * 10) / 10);
  }

  getReviewsCount(): Observable<number> {
    return of(this.reviews.length);
  }

  generateReviewSchema(review: CustomerReview): ReviewSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'Review',
      name: review.reviewTitle,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1
      },
      author: {
        '@type': 'Person',
        name: review.author
      },
      reviewBody: review.reviewBody,
      datePublished: review.datePublished,
      publisher: {
        '@type': 'Organization',
        name: 'НОК Эксперт'
      }
    };
  }

  generateAggregateRatingSchema(): any {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / this.reviews.length;
    const reviewCount = this.reviews.length;

    return {
      '@context': 'https://schema.org',
      '@type': 'AggregateRating',
      itemReviewed: {
        '@type': 'Service',
        name: 'НОК Эксперт - Независимая оценка квалификации'
      },
      ratingValue: Math.round(averageRating * 10) / 10,
      bestRating: 5,
      worstRating: 1,
      ratingCount: reviewCount,
      reviewCount: reviewCount
    };
  }
} 