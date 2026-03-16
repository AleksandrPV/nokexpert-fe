import { CanDeactivateFn } from '@angular/router';
import { TestSessionComponent } from '../../features/trainer/components/test-session.component';

export const canLeaveTestGuard: CanDeactivateFn<TestSessionComponent> = (component) => {
  if (component.canLeave()) {
    return true;
  }
  return confirm('Вы уверены, что хотите покинуть тест? Ваш прогресс может быть потерян.');
};
