import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitemapService, SitemapData } from '../../services/sitemap.service';

@Component({
  selector: 'app-sitemap-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">
        Информация о Sitemap
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-medium text-blue-900">Основной Sitemap</h4>
          <p class="text-2xl font-bold text-blue-600">{{ mainSitemapStats.totalUrls }}</p>
          <p class="text-sm text-blue-700">URL адресов</p>
        </div>
        
        <div class="bg-green-50 p-4 rounded-lg">
          <h4 class="font-medium text-green-900">Sitemap Блога</h4>
          <p class="text-2xl font-bold text-green-600">{{ blogSitemapStats.totalUrls }}</p>
          <p class="text-sm text-green-700">статей</p>
        </div>
        
        <div class="bg-purple-50 p-4 rounded-lg">
          <h4 class="font-medium text-purple-900">Sitemap Услуг</h4>
          <p class="text-2xl font-bold text-purple-600">{{ servicesSitemapStats.totalUrls }}</p>
          <p class="text-sm text-purple-700">услуг</p>
        </div>
      </div>
      
      <div class="space-y-4">
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <h5 class="font-medium text-gray-900">Статус Sitemap</h5>
            <p class="text-sm text-gray-600">Доступность для поисковых роботов</p>
          </div>
          <div class="flex items-center">
            <div class="w-3 h-3 rounded-full mr-2" 
                 [class]="sitemapAvailable ? 'bg-green-500' : 'bg-red-500'"></div>
            <span class="text-sm font-medium" 
                  [class]="sitemapAvailable ? 'text-green-700' : 'text-red-700'">
              {{ sitemapAvailable ? 'Доступен' : 'Недоступен' }}
            </span>
          </div>
        </div>
        
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <h5 class="font-medium text-gray-900">Последнее обновление</h5>
            <p class="text-sm text-gray-600">Дата последнего изменения</p>
          </div>
          <span class="text-sm text-gray-700">{{ lastUpdated | date:'dd.MM.yyyy HH:mm' }}</span>
        </div>
      </div>
      
      <div class="mt-6 pt-4 border-t border-gray-200">
        <h4 class="font-medium text-gray-900 mb-3">Ссылки на Sitemap</h4>
        <div class="space-y-2">
          <a href="https://нок-эксперт.рф/sitemap.xml" 
             target="_blank"
             class="block text-blue-600 hover:text-blue-800 text-sm">
            📄 Основной sitemap.xml
          </a>
          <a href="https://нок-эксперт.рф/sitemap-blog.xml" 
             target="_blank"
             class="block text-blue-600 hover:text-blue-800 text-sm">
            📝 Sitemap блога
          </a>
          <a href="https://нок-эксперт.рф/sitemap-services.xml" 
             target="_blank"
             class="block text-blue-600 hover:text-blue-800 text-sm">
            🛠️ Sitemap услуг
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class SitemapInfoComponent implements OnInit {
  private sitemapService = inject(SitemapService);

  mainSitemapStats = { totalUrls: 0, lastUpdated: '' };
  blogSitemapStats = { totalUrls: 0, lastUpdated: '' };
  servicesSitemapStats = { totalUrls: 0, lastUpdated: '' };
  sitemapAvailable = false;
  lastUpdated = new Date();

  ngOnInit(): void {
    this.loadSitemapInfo();
  }

  private loadSitemapInfo(): void {
    // Загружаем статистику основного sitemap
    this.sitemapService.getSitemapStats().subscribe(stats => {
      this.mainSitemapStats = stats;
    });

    // Загружаем статистику блога
    this.sitemapService.generateBlogSitemap([]).subscribe(sitemap => {
      this.blogSitemapStats = {
        totalUrls: sitemap.urls.length,
        lastUpdated: new Date().toISOString()
      };
    });

    // Загружаем статистику услуг
    this.sitemapService.generateServicesSitemap([]).subscribe(sitemap => {
      this.servicesSitemapStats = {
        totalUrls: sitemap.urls.length,
        lastUpdated: new Date().toISOString()
      };
    });

    // Проверяем доступность sitemap
    this.sitemapService.checkSitemapAvailability().subscribe(available => {
      this.sitemapAvailable = available;
    });
  }
} 