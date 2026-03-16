import { SetMetadata } from '@nestjs/common';

/**
 * Декоратор для обозначения публичных эндпоинтов, не требующих аутентификации
 * @example
 * @Public()
 * async publicEndpoint() {}
 */
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
