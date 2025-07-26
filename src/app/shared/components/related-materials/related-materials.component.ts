import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RelatedMaterialsService } from '../../services/related-materials.service';

export interface RelatedMaterial {
  id: string;
  title: string;
  description: string;
  route: string;
  icon: string;
  category: string;
  readTime?: number;
  featured?: boolean;
}

@Component({
  selector: 'app-related-materials',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="mt-12 pt-8 border-t border-brand-sky/20">
      <div class="text-center mb-8">
        <h3 class="text-2xl font-bold text-brand-dark mb-2">Связанные материалы</h3>
        <p class="text-brand-dark/60">Рекомендуем изучить эти материалы для полного понимания темы</p>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <a 
          *ngFor="let material of relatedMaterials"
          [routerLink]="material.route" 
          class="group">
          <div class="p-6 bg-white rounded-xl border border-brand-sky/20 hover:border-brand-sky/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div class="flex items-start gap-4">
              <div class="text-2xl">{{ material.icon }}</div>
              <div class="flex-1">
                <h4 class="font-semibold text-brand-dark group-hover:text-brand-navy transition-colors mb-2">
                  {{ material.title }}
                </h4>
                <p class="text-sm text-brand-dark/60 mb-3 line-clamp-2">
                  {{ material.description }}
                </p>
                <div class="flex items-center justify-between text-xs text-brand-dark/50">
                  <span class="bg-brand-sky/10 text-brand-navy px-2 py-1 rounded-full font-medium">
                    {{ material.category }}
                  </span>
                  <span *ngIf="material.readTime" class="flex items-center gap-1">
                    <span>⏱️</span>
                    {{ material.readTime }} мин
                  </span>
                </div>
              </div>
            </div>
            <div *ngIf="material.featured" class="mt-3">
              <span class="bg-brand-coral text-white px-2 py-1 rounded-full text-xs font-bold">
                ⭐ Рекомендуем
              </span>
            </div>
          </div>
        </a>
      </div>
    </section>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class RelatedMaterialsComponent implements OnInit {
  @Input() currentPageId: string = '';
  @Input() currentCategory: string = '';
  @Input() maxItems: number = 6;
  
  relatedMaterials: RelatedMaterial[] = [];
  
  private relatedMaterialsService = inject(RelatedMaterialsService);

  ngOnInit(): void {
    this.loadRelatedMaterials();
  }

  private loadRelatedMaterials(): void {
    this.relatedMaterialsService.getRelatedMaterials(
      this.currentPageId, 
      this.currentCategory, 
      this.maxItems
    ).subscribe((materials: RelatedMaterial[]) => {
      this.relatedMaterials = materials;
    });
  }
} 