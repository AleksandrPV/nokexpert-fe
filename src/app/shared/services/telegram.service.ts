import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface TelegramMessage {
  chat_id: string;
  text: string;
  parse_mode?: 'HTML' | 'Markdown';
}

export interface TelegramResponse {
  ok: boolean;
  result?: any;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  private readonly botToken = environment.telegram.botToken;
  private readonly chatId = environment.telegram.chatId;
  private readonly apiUrl = `https://api.telegram.org/bot${this.botToken}`;

  constructor(private http: HttpClient) {}

  /**
   * Отправляет сообщение в Telegram
   */
  sendMessage(text: string): Observable<TelegramResponse> {
    const message: TelegramMessage = {
      chat_id: this.chatId,
      text: text,
      parse_mode: 'HTML'
    };

    return this.http.post<TelegramResponse>(`${this.apiUrl}/sendMessage`, message)
      .pipe(
        catchError(error => {
          console.error('Ошибка отправки в Telegram:', error);
          return throwError(() => new Error('Не удалось отправить сообщение в Telegram'));
        })
      );
  }

  /**
   * Форматирует данные формы в сообщение для Telegram
   */
  formatFeedbackMessage(formData: any): string {
    const subjectLabels: { [key: string]: string } = {
      'nok-nostroy': '🏗️ НОК НОСТРОЙ',
      'nok-nopriz': '📐 НОК НОПРИЗ',
      'nok-opb': '🛡️ НОК ОПБ',
      'consultation': '💬 Консультация',
      'documents': '📄 Подготовка документов',
      'pricing': '💰 Стоимость услуг',
      'other': '❓ Другое'
    };

    const subjectLabel = subjectLabels[formData.subject] || '❓ Не указано';

    return `
<b>📋 Новая заявка с сайта НОК Эксперт</b>

<b>👤 Имя:</b> ${formData.name || 'Не указано'}
<b>📞 Телефон:</b> ${formData.phone || 'Не указан'}
<b>📧 Email:</b> ${formData.email || 'Не указан'}
<b>🎯 Тема:</b> ${subjectLabel}

<b>💬 Сообщение:</b>
${formData.message || 'Сообщение отсутствует'}

<b>🕐 Время отправки:</b> ${new Date().toLocaleString('ru-RU')}
<b>🌐 Источник:</b> Сайт nok-expert.ru
    `.trim();
  }

  /**
   * Проверяет конфигурацию Telegram
   */
  isConfigured(): boolean {
    return this.botToken !== 'YOUR_BOT_TOKEN_HERE' && this.chatId !== 'YOUR_CHAT_ID_HERE';
  }

  /**
   * Получает информацию о боте
   */
  getBotInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getMe`);
  }
}
