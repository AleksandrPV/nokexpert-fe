import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  template: `
    <div class="animate-pulse bg-slate-200"
         [class.rounded-full]="rounded === 'full'"
         [class.rounded-xl]="rounded === 'xl'"
         [class.rounded-2xl]="rounded === '2xl'"
         [class.rounded-lg]="rounded === 'lg'"
         [style.width]="width"
         [style.height]="height">
    </div>
  `,
})
export class SkeletonComponent {
  @Input() width = '100%';
  @Input() height = '20px';
  @Input() rounded: 'full' | 'xl' | '2xl' | 'lg' = 'lg';
}
