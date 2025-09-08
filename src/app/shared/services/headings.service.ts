import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HeadingsService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /**
   * Проверяет структуру заголовков H1-H6 на странице
   */
  validateHeadings(): { valid: boolean; issues: string[]; suggestions: string[] } {
    if (!this.isBrowser) {
      return { valid: true, issues: [], suggestions: [] };
    }

    const issues: string[] = [];
    const suggestions: string[] = [];

    // Проверяем наличие H1
    const h1Elements = document.querySelectorAll('h1');
    if (h1Elements.length === 0) {
      issues.push('На странице отсутствует заголовок H1');
      suggestions.push('Добавьте основной заголовок H1 с ключевыми словами');
    } else if (h1Elements.length > 1) {
      issues.push(`Найдено ${h1Elements.length} заголовков H1 (рекомендуется 1)`);
      suggestions.push('Оставьте только один основной заголовок H1');
    }

    // Проверяем иерархию заголовков
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;

    headings.forEach((heading, index) => {
      const currentLevel = parseInt(heading.tagName.charAt(1));

      if (index === 0 && currentLevel !== 1) {
        issues.push('Первый заголовок должен быть H1');
        suggestions.push('Начните с заголовка H1');
      }

      if (currentLevel - previousLevel > 1) {
        issues.push(`Пропущен уровень заголовка перед ${heading.tagName} (скачок с H${previousLevel} на H${currentLevel})`);
        suggestions.push(`Добавьте промежуточный заголовок H${previousLevel + 1} или измените уровень`);
      }

      previousLevel = currentLevel;
    });

    // Проверяем длину заголовков
    headings.forEach((heading, index) => {
      const text = heading.textContent?.trim() || '';
      if (text.length < 10) {
        issues.push(`Заголовок ${heading.tagName} слишком короткий: "${text}"`);
        suggestions.push('Расширьте заголовок, добавив ключевые слова');
      } else if (text.length > 70) {
        issues.push(`Заголовок ${heading.tagName} слишком длинный (${text.length} символов)`);
        suggestions.push('Сократите заголовок до 50-70 символов');
      }
    });

    return {
      valid: issues.length === 0,
      issues,
      suggestions
    };
  }

  /**
   * Получает структуру заголовков страницы
   */
  getHeadingsStructure(): Array<{ level: number; text: string; id?: string }> {
    if (!this.isBrowser) return [];

    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    return Array.from(headings).map(heading => ({
      level: parseInt(heading.tagName.charAt(1)),
      text: heading.textContent?.trim() || '',
      id: heading.id || undefined
    }));
  }

  /**
   * Оптимизирует заголовки для SEO
   */
  optimizeHeadings(): void {
    if (!this.isBrowser) return;

    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

    headings.forEach((heading, index) => {
      const text = heading.textContent?.trim() || '';

      // Добавляем ID для якорных ссылок если отсутствует
      if (!heading.id) {
        const slug = this.createSlug(text);
        heading.id = slug;
      }

      // Добавляем микроразметку для speakable
      if (index < 3) { // Первые 3 заголовка
        heading.setAttribute('itemprop', 'headline');
      }
    });
  }

  /**
   * Создает slug из текста для ID
   */
  private createSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Удаляем специальные символы
      .replace(/\s+/g, '-') // Заменяем пробелы на дефисы
      .replace(/-+/g, '-') // Удаляем множественные дефисы
      .trim();
  }

  /**
   * Добавляет оглавление на основе заголовков
   */
  generateTableOfContents(containerSelector: string = '.toc-container'): void {
    if (!this.isBrowser) return;

    const headings = document.querySelectorAll('h2, h3, h4');
    if (headings.length < 3) return; // Не создаем оглавление если мало заголовков

    const tocItems = Array.from(headings).map((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent?.trim() || '';
      const id = heading.id || this.createSlug(text);

      // Устанавливаем ID если отсутствует
      if (!heading.id) {
        heading.id = id;
      }

      return {
        level,
        text,
        id,
        index
      };
    });

    const tocHtml = this.generateTocHtml(tocItems);
    const container = document.querySelector(containerSelector);

    if (container) {
      container.innerHTML = tocHtml;

      // Добавляем обработчики кликов для плавной прокрутки
      const tocLinks = container.querySelectorAll('.toc-link');
      tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href')?.substring(1);
          if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
              // Обновляем URL без перезагрузки страницы
              history.pushState(null, '', `#${targetId}`);
            }
          }
        });
      });
    }
  }

  /**
   * Генерирует HTML для оглавления
   */
  private generateTocHtml(items: Array<{ level: number; text: string; id: string; index: number }>): string {
    let html = `
      <nav class="toc bg-white rounded-lg border border-gray-200 p-6 shadow-sm" aria-label="Оглавление">
        <h3 class="toc-title text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>📋</span> Содержание статьи
        </h3>
        <ul class="toc-list space-y-2">
    `;

    items.forEach(item => {
      const indentClass = item.level === 3 ? 'ml-4' : '';
      html += `<li class="toc-item ${indentClass}">
        <a href="#${item.id}" class="toc-link text-gray-700 hover:text-blue-600 transition-colors duration-200 block py-1 px-2 rounded hover:bg-blue-50 text-sm leading-relaxed">${item.text}</a>
      </li>`;
    });

    html += `
        </ul>
      </nav>
    `;
    return html;
  }
}
