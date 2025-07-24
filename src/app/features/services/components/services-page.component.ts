import { Component } from '@angular/core';

@Component({
  selector: 'app-services-page',
  standalone: true,
  template: `
    <div class="py-8">
      <h2 class="text-2xl font-bold mb-4">Все услуги</h2>
      <ul class="list-disc pl-6 space-y-2">
        <li>Прохождение НОК в строительстве</li>
        <li>Прохождение НОК по проектированию</li>
        <li>Прохождение НОК по изысканиям</li>
        <li>Прохождение НОК для специалистов по промышленной безопасности</li>
      </ul>
    </div>
  `,
  styles: []
})
export class ServicesPageComponent {} 