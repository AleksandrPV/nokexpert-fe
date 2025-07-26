import { Injectable } from '@angular/core';
import { OrganizationData } from '../models/organization.interface';
import { ORGANIZATION_CONFIG } from '../../../environments/organization.config';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  
  private readonly organizationData: OrganizationData = ORGANIZATION_CONFIG;

  /**
   * Получить все данные организации
   */
  getData(): OrganizationData {
    return this.organizationData;
  }

  /**
   * Получить название организации
   */
  getName(): string {
    return this.organizationData.name;
  }

  /**
   * Получить полное название организации
   */
  getFullName(): string {
    return this.organizationData.fullName;
  }

  /**
   * Получить телефон для отображения
   */
  getPhoneDisplay(): string {
    return this.organizationData.phone.display;
  }

  /**
   * Получить телефон для ссылки
   */
  getPhoneHref(): string {
    return this.organizationData.phone.href;
  }

  /**
   * Получить email
   */
  getEmail(): string {
    return this.organizationData.email;
  }

  /**
   * Получить полный адрес
   */
  getAddress(): string {
    return this.organizationData.address.full;
  }

  /**
   * Получить описание лицензии
   */
  getLicenseDescription(): string {
    return this.organizationData.license?.description || 'Профессиональная подготовка к НОК';
  }

  /**
   * Получить год лицензии
   */
  getLicenseYear(): number {
    return this.organizationData.license?.year || 2017;
  }

  /**
   * Проверить наличие лицензии
   */
  hasLicense(): boolean {
    return !!this.organizationData.license;
  }

  /**
   * Получить домен сайта
   */
  getWebsiteDomain(): string {
    return this.organizationData.website.domain;
  }

  /**
   * Получить URL сайта
   */
  getWebsiteUrl(): string {
    return this.organizationData.website.url;
  }

  /**
   * Получить рабочее время
   */
  getWorkingHours(): string {
    return this.organizationData.workingHours?.weekdays || '';
  }

  /**
   * Получить описание организации
   */
  getDescription(): string {
    return this.organizationData.description || '';
  }

  /**
   * Получить год основания
   */
  getFoundedYear(): number {
    return this.organizationData.foundedYear || 2017;
  }

  /**
   * Получить широту организации
   */
  getLatitude(): number | undefined {
    return this.organizationData.latitude;
  }

  /**
   * Получить долготу организации
   */
  getLongitude(): number | undefined {
    return this.organizationData.longitude;
  }
} 