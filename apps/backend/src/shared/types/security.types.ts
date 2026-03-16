import { UserRole } from './user.types';

/**
 * Интерфейс пользователя в запросе после аутентификации
 */
export interface RequestUser {
  userId: string;
  email: string;
  role: UserRole;
  permissions?: string[];
  qaCenterId?: string;
}

/**
 * Интерфейс запроса с пользователем
 */
export interface RequestWithUser {
  user: RequestUser;
}

/**
 * Интерфейс JWT payload
 */
export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

/**
 * Интерфейс ответа на аутентификацию
 */
export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
  };
}

/**
 * Типы разрешений для системы
 */
export enum Permission {
  // Пользователи
  USERS_CREATE = 'users:create',
  USERS_READ = 'users:read',
  USERS_UPDATE = 'users:update',
  USERS_DELETE = 'users:delete',

  // Профили
  PROFILE_READ = 'profile:read',
  PROFILE_UPDATE = 'profile:update',

  // Администрирование
  ADMIN_ACCESS = 'admin:access',
  SYSTEM_CONFIG = 'system:config',
}
