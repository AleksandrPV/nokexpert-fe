import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InfoSection, InfoPage, InfoCategory } from '../models/info-page.interface';
import { InfoService } from '../services/info.service';
import { SeoService } from '../../../shared/services/seo.service';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';

/**
 * Компонент страницы информации о НОК
 * Содержит полную информацию о независимой оценке квалификации
 */
@Component({
  selector: 'app-info-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, BreadcrumbsComponent],
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {
  private seoService = inject(SeoService);
  infoSections: InfoSection[] = [];
  featuredPages: InfoPage[] = [];
  searchQuery = '';
  searchResults: InfoPage[] = [];
  
  private searchTimeout: any;

  constructor(private infoService: InfoService) {}

  ngOnInit(): void {
    // Устанавливаем SEO данные для страницы информации о НОК
    this.seoService.setInfoPageSeo();
    this.loadInfoSections();
    this.loadFeaturedPages();
  }

  loadInfoSections(): void {
    this.infoService.getInfoSections().subscribe(sections => {
      this.infoSections = sections;
    });
  }

  loadFeaturedPages(): void {
    this.infoService.getFeaturedPages().subscribe(pages => {
      this.featuredPages = pages;
    });
  }

  onSearchChange(): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    
    this.searchTimeout = setTimeout(() => {
      if (this.searchQuery.trim()) {
        this.infoService.searchPages(this.searchQuery).subscribe(results => {
          this.searchResults = results;
        });
      } else {
        this.searchResults = [];
      }
    }, 300);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'short'
    }).format(date);
  }
} 