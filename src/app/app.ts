import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeedbackPopupComponent } from './features/feedback-popup/components/feedback-popup.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FeedbackPopupComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('nokexpert-fe');
}
