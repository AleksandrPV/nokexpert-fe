import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

/**
 * JWT Guard для аутентификации пользователей
 * Поддерживает публичные эндпоинты через декоратор @Public()
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Проверяем, является ли эндпоинт публичным
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Если эндпоинт публичный, разрешаем доступ без аутентификации
    if (isPublic) {
      return true;
    }

    // Для защищенных эндпоинтов выполняем стандартную JWT аутентификацию
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any): any {
    // Если есть ошибка или пользователь не найден, выбрасываем исключение
    if (err || !user) {
      throw err || new UnauthorizedException('Неверный токен аутентификации');
    }
    return user;
  }
}
