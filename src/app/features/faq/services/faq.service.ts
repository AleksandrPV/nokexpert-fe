import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FaqQuestion, FaqCategory, FaqFilter, FaqSearchResult } from '../models/faq.interface';
import { FAQ_QUESTIONS } from '../data/faq-questions';
import { FAQ_CATEGORIES } from '../data/faq-categories';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor() { }

  /**
   * Получить все вопросы
   */
  getAllQuestions(): Observable<FaqQuestion[]> {
    return of(FAQ_QUESTIONS).pipe(
      map(questions => questions.sort((a, b) => a.priority - b.priority))
    );
  }

  /**
   * Получить все категории
   */
  getAllCategories(): Observable<FaqCategory[]> {
    return of(FAQ_CATEGORIES);
  }

  /**
   * Получить вопрос по slug
   */
  getQuestionBySlug(slug: string): Observable<FaqQuestion | null> {
    return of(FAQ_QUESTIONS.find(q => q.slug === slug) || null);
  }

  /**
   * Получить вопросы по категории
   */
  getQuestionsByCategory(categoryId: string): Observable<FaqQuestion[]> {
    return this.getAllQuestions().pipe(
      map(questions => questions.filter(q => q.category === categoryId))
    );
  }

  /**
   * Получить популярные вопросы
   */
  getPopularQuestions(limit: number = 10): Observable<FaqQuestion[]> {
    return this.getAllQuestions().pipe(
      map(questions => questions.filter(q => q.isPopular).slice(0, limit))
    );
  }

  /**
   * Поиск вопросов по фильтрам
   */
  searchQuestions(filter: FaqFilter): Observable<FaqSearchResult> {
    return this.getAllQuestions().pipe(
      map(questions => {
        let filteredQuestions = questions;

        // Фильтр по категории
        if (filter.category) {
          filteredQuestions = filteredQuestions.filter(q => q.category === filter.category);
        }

        // Фильтр по тегам
        if (filter.tags && filter.tags.length > 0) {
          filteredQuestions = filteredQuestions.filter(q => 
            filter.tags!.some(tag => q.tags.includes(tag))
          );
        }

        // Фильтр по популярности
        if (filter.isPopular !== undefined) {
          filteredQuestions = filteredQuestions.filter(q => q.isPopular === filter.isPopular);
        }

        // Поиск по тексту
        if (filter.search) {
          const searchLower = filter.search.toLowerCase();
          filteredQuestions = filteredQuestions.filter(q => 
            q.question.toLowerCase().includes(searchLower) ||
            q.shortAnswer.toLowerCase().includes(searchLower) ||
            q.fullAnswer.toLowerCase().includes(searchLower) ||
            q.tags.some(tag => tag.toLowerCase().includes(searchLower))
          );
        }

        return {
          questions: filteredQuestions,
          total: filteredQuestions.length,
          categories: FAQ_CATEGORIES
        };
      })
    );
  }

  /**
   * Получить связанные вопросы
   */
  getRelatedQuestions(questionId: string, limit: number = 5): Observable<FaqQuestion[]> {
    return this.getAllQuestions().pipe(
      map(questions => {
        const currentQuestion = questions.find(q => q.id === questionId);
        if (!currentQuestion) return [];

        // Находим вопросы с похожими тегами или из той же категории
        const related = questions
          .filter(q => q.id !== questionId)
          .map(q => ({
            question: q,
            score: this.calculateRelatednessScore(currentQuestion, q)
          }))
          .sort((a, b) => b.score - a.score)
          .slice(0, limit)
          .map(item => item.question);

        return related;
      })
    );
  }

  /**
   * Получить вопросы для конкретной страницы (по тегам)
   */
  getQuestionsForPage(pageTags: string[], limit: number = 5): Observable<FaqQuestion[]> {
    return this.getAllQuestions().pipe(
      map(questions => {
        return questions
          .map(q => ({
            question: q,
            score: this.calculatePageRelevanceScore(q, pageTags)
          }))
          .filter(item => item.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, limit)
          .map(item => item.question);
      })
    );
  }

  /**
   * Получить категорию по ID
   */
  getCategoryById(categoryId: string): Observable<FaqCategory | null> {
    return of(FAQ_CATEGORIES.find(c => c.id === categoryId) || null);
  }

  /**
   * Получить статистику по категориям
   */
  getCategoryStats(): Observable<Array<FaqCategory & { count: number }>> {
    return this.getAllQuestions().pipe(
      map(questions => {
        const stats = new Map<string, number>();
        
        questions.forEach(q => {
          stats.set(q.category, (stats.get(q.category) || 0) + 1);
        });

        return FAQ_CATEGORIES.map(category => ({
          ...category,
          count: stats.get(category.id) || 0
        }));
      })
    );
  }

  /**
   * Вычисление релевантности для связанных вопросов
   */
  private calculateRelatednessScore(q1: FaqQuestion, q2: FaqQuestion): number {
    let score = 0;

    // Одинаковая категория
    if (q1.category === q2.category) {
      score += 3;
    }

    // Общие теги
    const commonTags = q1.tags.filter(tag => q2.tags.includes(tag));
    score += commonTags.length * 2;

    // Популярность
    if (q2.isPopular) {
      score += 1;
    }

    return score;
  }

  /**
   * Вычисление релевантности для страницы
   */
  private calculatePageRelevanceScore(question: FaqQuestion, pageTags: string[]): number {
    let score = 0;

    // Совпадение тегов
    const matchingTags = question.tags.filter(tag => 
      pageTags.some(pageTag => 
        tag.toLowerCase().includes(pageTag.toLowerCase()) ||
        pageTag.toLowerCase().includes(tag.toLowerCase())
      )
    );
    score += matchingTags.length * 3;

    // Популярность вопроса
    if (question.isPopular) {
      score += 2;
    }

    // Приоритет вопроса
    score += (11 - question.priority) * 0.5;

    return score;
  }
} 