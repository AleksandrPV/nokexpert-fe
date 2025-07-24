import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  template: `
    <div class="py-8">
      <h2 class="text-2xl font-bold mb-4">Блог</h2>
      <p>Здесь будут размещаться новости и статьи.</p>
    </div>
  `,
  styles: []
})
export class BlogPageComponent {} 