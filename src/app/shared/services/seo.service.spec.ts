import { TestBed } from '@angular/core/testing';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let titleService: jasmine.SpyObj<Title>;
  let metaService: jasmine.SpyObj<Meta>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const titleSpy = jasmine.createSpyObj('Title', ['setTitle']);
    const metaSpy = jasmine.createSpyObj('Meta', ['updateTag']);
    const routerSpy = jasmine.createSpyObj('Router', [], {
      events: of({ url: '/test' })
    });

    TestBed.configureTestingModule({
      providers: [
        SeoService,
        { provide: Title, useValue: titleSpy },
        { provide: Meta, useValue: metaSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(SeoService);
    titleService = TestBed.inject(Title) as jasmine.SpyObj<Title>;
    metaService = TestBed.inject(Meta) as jasmine.SpyObj<Meta>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set home page SEO', () => {
    service.setHomePageSeo();
    
    expect(titleService.setTitle).toHaveBeenCalledWith(
      'НОК Эксперт - Профессиональная подготовка к независимой оценке квалификации'
    );
    
    expect(metaService.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: jasmine.stringContaining('Лидирующий центр подготовки к НОК в России')
    });
  });

  it('should set services page SEO', () => {
    service.setServicesPageSeo();
    
    expect(titleService.setTitle).toHaveBeenCalledWith(
      'Услуги по подготовке к НОК - НОК Эксперт'
    );
    
    expect(metaService.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: jasmine.stringContaining('Все виды подготовки к НОК')
    });
  });


  it('should set contacts page SEO', () => {
    service.setContactsPageSeo();
    
    expect(titleService.setTitle).toHaveBeenCalledWith(
      'Контакты - НОК Эксперт | Телефон, адрес, график работы'
    );
    
    expect(metaService.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: jasmine.stringContaining('Контакты НОК Эксперт')
    });
  });

  it('should set info page SEO', () => {
    service.setInfoPageSeo();
    
    expect(titleService.setTitle).toHaveBeenCalledWith(
      'Все о НОК - независимой оценке квалификации | НОК Эксперт'
    );
    
    expect(metaService.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: jasmine.stringContaining('Вся информация о НОК в одном месте')
    });
  });

  it('should set privacy page SEO with noindex', () => {
    service.setPrivacyPageSeo();
    
    expect(titleService.setTitle).toHaveBeenCalledWith(
      'Политика конфиденциальности - НОК Эксперт'
    );
    
    expect(metaService.updateTag).toHaveBeenCalledWith({
      name: 'robots',
      content: 'noindex, nofollow'
    });
  });
}); 