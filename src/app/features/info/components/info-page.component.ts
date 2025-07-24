import { Component } from '@angular/core';

@Component({
  selector: 'app-info-page',
  standalone: true,
  template: `
    <div class="py-8">
      <h2 class="text-2xl font-bold mb-4">Информация о НОК</h2>
      <p>Общая информация о независимой оценке квалификации.</p>
    </div>
  `,
  styles: []
})
export class InfoPageComponent {} 