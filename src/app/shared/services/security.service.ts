import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  constructor(private sanitizer: DomSanitizer) {}

  /**
   * Санитизация текста для предотвращения XSS атак
   * Удаляет потенциально опасные HTML теги и атрибуты
   */
  sanitizeText(input: string): string {
    if (!input) return '';

    // Удаляем HTML теги
    let sanitized = input.replace(/<[^>]*>/g, '');

    // Удаляем потенциально опасные символы и последовательности
    sanitized = sanitized
      .replace(/javascript:/gi, '')
      .replace(/vbscript:/gi, '')
      .replace(/on\w+=/gi, '')
      .replace(/<script/gi, '')
      .replace(/<\/script>/gi, '')
      .replace(/<iframe/gi, '')
      .replace(/<\/iframe>/gi, '')
      .replace(/<object/gi, '')
      .replace(/<\/object>/gi, '')
      .replace(/<embed/gi, '')
      .replace(/<\/embed>/gi, '');

    // Ограничиваем длину
    if (sanitized.length > 10000) {
      sanitized = sanitized.substring(0, 10000) + '...';
    }

    return sanitized.trim();
  }

  /**
   * Санитизация email адреса
   */
  sanitizeEmail(email: string): string {
    if (!email) return '';

    // Проверяем формат email и удаляем потенциально опасные символы
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return '';
    }

    // Удаляем потенциально опасные символы
    return email.replace(/[<>'"&]/g, '');
  }

  /**
   * Санитизация телефонного номера
   */
  sanitizePhone(phone: string): string {
    if (!phone) return '';

    // Удаляем все кроме цифр, +, -, (, ), пробелов
    return phone.replace(/[^\d+\-\(\)\s]/g, '').substring(0, 20);
  }

  /**
   * Санитизация имени
   */
  sanitizeName(name: string): string {
    if (!name) return '';

    // Удаляем HTML и оставляем только буквы, пробелы, дефисы, апострофы
    return name
      .replace(/<[^>]*>/g, '')
      .replace(/[^\p{L}\s\-']/gu, '')
      .substring(0, 100)
      .trim();
  }

  /**
   * Валидация и санитизация URL
   */
  sanitizeUrl(url: string): string {
    if (!url) return '';

    try {
      const urlObj = new URL(url);

      // Разрешаем только HTTP и HTTPS протоколы
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        return '';
      }

      // Ограничиваем длину
      if (url.length > 2000) {
        return '';
      }

      return url;
    } catch {
      return '';
    }
  }

  /**
   * Санитизация HTML для безопасного отображения
   */
  sanitizeHtml(html: string): SafeHtml {
    if (!html) return '';

    // Создаем элемент для парсинга
    const div = document.createElement('div');
    div.innerHTML = html;

    // Удаляем потенциально опасные элементы
    const dangerousElements = div.querySelectorAll('script, iframe, object, embed, form, input, button');
    dangerousElements.forEach(el => el.remove());

    // Удаляем опасные атрибуты
    const allElements = div.querySelectorAll('*');
    allElements.forEach(el => {
      const attributes = Array.from(el.attributes);
      attributes.forEach(attr => {
        if (attr.name.startsWith('on') ||
            attr.name === 'href' && attr.value.toLowerCase().includes('javascript:') ||
            attr.name === 'src' && !attr.value.startsWith('http')) {
          el.removeAttribute(attr.name);
        }
      });
    });

    return this.sanitizer.bypassSecurityTrustHtml(div.innerHTML);
  }

  /**
   * Проверка на SQL инъекции (базовая)
   */
  checkForSqlInjection(input: string): boolean {
    if (!input) return false;

    // Упрощенная проверка на основные SQL инъекции
    const dangerousPatterns = [
      'union select',
      'select * from',
      'drop table',
      'delete from',
      '--',
      '/*',
      '*/'
    ];

    const lowerInput = input.toLowerCase();
    return dangerousPatterns.some(pattern => lowerInput.includes(pattern));
  }

  /**
   * Проверка на потенциально опасные паттерны
   */
  isSafeInput(input: string): boolean {
    if (!input) return true;

    // Проверяем на SQL инъекции
    if (this.checkForSqlInjection(input)) {
      return false;
    }

    // Проверяем на слишком длинные строки
    if (input.length > 10000) {
      return false;
    }

    // Проверяем на слишком много специальных символов
    const specialChars = input.match(/[^\w\sа-яё]/gi);
    if (specialChars && specialChars.length > input.length * 0.3) {
      return false;
    }

    return true;
  }

  /**
   * Генерация безопасного ID для элементов
   */
  generateSafeId(prefix: string = 'safe'): string {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
