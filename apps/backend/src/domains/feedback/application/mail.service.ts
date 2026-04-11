import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { CreateFeedbackDto } from '../presentation/dto/create-feedback.dto';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST', 'smtp.mail.ru'),
      port: this.configService.get<number>('SMTP_PORT', 465),
      secure: this.configService.get('SMTP_SECURE', 'true') === 'true',
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }

  async sendFeedback(dto: CreateFeedbackDto): Promise<void> {
    const subjectLabels: Record<string, string> = {
      'nok-nostroy': 'НОК НОСТРОЙ',
      'nok-nopriz': 'НОК НОПРИЗ',
      'nok-opb': 'НОК ОПБ',
      'consultation': 'Консультация',
      'documents': 'Подготовка документов',
      'pricing': 'Стоимость услуг',
      'other': 'Другое',
    };

    const subjectLabel = dto.subject ? subjectLabels[dto.subject] || dto.subject : 'Не указано';
    const fromName = this.configService.get('MAIL_FROM_NAME', 'НОК Эксперт');
    const fromEmail = this.configService.get('MAIL_FROM_EMAIL', 'noreply@nok-expert.ru');
    const toEmail = this.configService.get('MAIL_TO', 'info@nok-expert.ru');

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #1e40af;">Новая заявка с сайта НОК Эксперт</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold; color: #374151;">Имя:</td><td style="padding: 8px;">${dto.name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #374151;">Телефон:</td><td style="padding: 8px;">${dto.phone}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #374151;">Email:</td><td style="padding: 8px;">${dto.email || 'Не указан'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #374151;">Тема:</td><td style="padding: 8px;">${subjectLabel}</td></tr>
        </table>
        ${dto.message ? `<div style="margin-top: 16px; padding: 12px; background: #f3f4f6; border-radius: 8px;"><strong>Сообщение:</strong><br/>${dto.message}</div>` : ''}
        <p style="margin-top: 16px; font-size: 12px; color: #9ca3af;">Отправлено: ${new Date().toLocaleString('ru-RU')} · Источник: nok-expert.ru</p>
      </div>
    `;

    await this.transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: toEmail,
      subject: `Заявка с сайта: ${subjectLabel} — ${dto.name}`,
      html,
    });

    this.logger.log(`Feedback email sent: ${dto.name} / ${dto.phone} / ${subjectLabel}`);
  }
}
