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

  async sendAdminNewRegistration(user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    activationToken: string;
  }): Promise<void> {
    const fromName = this.configService.get('MAIL_FROM_NAME', 'НОК Эксперт');
    const fromEmail = this.configService.get('MAIL_FROM_EMAIL', 'noreply@nok-expert.ru');
    const toEmail = this.configService.get('MAIL_TO', 'info@nok-expert.ru');
    const siteUrl = this.configService.get('SITE_URL', 'https://nok-expert.ru');
    const activationLink = `${siteUrl}/api/users/activate/${user.activationToken}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #1e40af;">Новая регистрация на тренажёр НОК</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold; color: #374151;">Имя:</td><td style="padding: 8px;">${user.firstName} ${user.lastName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #374151;">Email:</td><td style="padding: 8px;">${user.email}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #374151;">Телефон:</td><td style="padding: 8px;">${user.phone}</td></tr>
        </table>
        <div style="margin-top: 24px; text-align: center;">
          <a href="${activationLink}" style="display: inline-block; padding: 14px 32px; background: #16a34a; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
            Активировать аккаунт
          </a>
        </div>
        <p style="margin-top: 12px; font-size: 12px; color: #9ca3af;">Или скопируйте ссылку: ${activationLink}</p>
        <p style="margin-top: 16px; font-size: 12px; color: #9ca3af;">Отправлено: ${new Date().toLocaleString('ru-RU')} · Источник: nok-expert.ru</p>
      </div>
    `;

    await this.transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: toEmail,
      subject: `Новая регистрация: ${user.firstName} ${user.lastName} — ${user.phone}`,
      html,
    });

    this.logger.log(`Admin registration email sent for: ${user.email}`);
  }

  async sendUserRegistrationPending(user: {
    firstName: string;
    email: string;
  }): Promise<void> {
    const fromName = this.configService.get('MAIL_FROM_NAME', 'НОК Эксперт');
    const fromEmail = this.configService.get('MAIL_FROM_EMAIL', 'noreply@nok-expert.ru');

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #1e40af;">Спасибо за регистрацию, ${user.firstName}!</h2>
        <p style="font-size: 16px; color: #374151; line-height: 1.6;">
          Ваша заявка на доступ к тренажёру НОК Эксперт принята.
        </p>
        <p style="font-size: 16px; color: #374151; line-height: 1.6;">
          В ближайшее время с вами свяжется наш менеджер для подтверждения и активации аккаунта.
        </p>
        <div style="margin-top: 24px; padding: 16px; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #16a34a;">
          <p style="margin: 0; color: #166534; font-weight: bold;">Что дальше?</p>
          <p style="margin: 8px 0 0; color: #374151;">Ожидайте звонка менеджера. После активации вы сможете войти в тренажёр и начать подготовку к экзамену НОК.</p>
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">С уважением, команда НОК Эксперт · nok-expert.ru</p>
      </div>
    `;

    await this.transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: user.email,
      subject: 'Заявка на тренажёр НОК принята — НОК Эксперт',
      html,
    });

    this.logger.log(`User pending email sent to: ${user.email}`);
  }
}
