import { Component } from '@angular/core';

@Component({
  selector: 'app-service-detail-page',
  standalone: true,
  template: `
    <div class="py-8">
      <h2 class="text-2xl font-bold mb-4">Детальная страница услуги</h2>
      <p>Здесь будет подробная информация о выбранной услуге.</p>
    </div>
  `,
  styles: []
})
export class ServiceDetailPageComponent {} 