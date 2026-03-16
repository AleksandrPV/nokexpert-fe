import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../types/user.types';

/**
 * Декоратор для указания требуемых ролей для доступа к эндпоинту
 * @param roles - массив ролей, которые имеют доступ к эндпоинту
 * @example
 * @Roles(UserRole.ADMIN)
 * @Roles(UserRole.ADMIN, UserRole.PROCTOR)
 */
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
