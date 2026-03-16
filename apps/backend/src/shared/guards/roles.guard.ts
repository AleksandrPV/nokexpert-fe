import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../types/user.types';

interface RequestUser {
  userId: string;
  email: string;
  role: UserRole;
}

interface RequestWithUser {
  user: RequestUser;
}

/**
 * Guard для проверки ролей пользователя
 * Используется вместе с декоратором @Roles()
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    // Если роли не указаны, разрешаем доступ
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    // Проверяем, что пользователь аутентифицирован
    if (!user) {
      throw new ForbiddenException('Пользователь не аутентифицирован');
    }

    // Проверяем, есть ли у пользователя требуемая роль
    const hasRole = requiredRoles.includes(user.role);

    if (!hasRole) {
      throw new ForbiddenException(
        `Недостаточно прав. Требуемые роли: ${requiredRoles.join(', ')}. Ваша роль: ${user.role}`,
      );
    }

    return true;
  }
}
