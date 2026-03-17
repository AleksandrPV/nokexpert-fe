import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Optional JWT Guard — не выбрасывает ошибку при отсутствии токена.
 * Если токен валидный → req.user заполнен.
 * Если токена нет или он невалидный → req.user = null.
 */
@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(_err: any, user: any) {
    return user || null;
  }
}
