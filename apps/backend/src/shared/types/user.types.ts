export enum UserRole {
  USER = 'user', // Обычный пользователь
  CANDIDATE = 'candidate', // Кандидат на квалификацию
  ADMIN = 'admin', // Администратор
  PROCTOR = 'proctor', // Проктор экзамена
}

export enum UserStatus {
  ACTIVE = 'active', // Активен
  INACTIVE = 'inactive', // Неактивен
  SUSPENDED = 'suspended', // Приостановлен
  PENDING = 'pending', // Ожидает активации
}

export enum TestStatus {
  STARTED = 'started',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum QACenterType {
  TEST_CENTER = 'test_center',
  EDUCATIONAL = 'educational',
  EMPLOYER = 'employer',
}

export enum AccreditationStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  REVOKED = 'revoked',
  PENDING = 'pending',
}

export enum CertificateStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  REVOKED = 'revoked',
}

export enum SiteStatus {
  ACTIVE = 'active',
  MAINTENANCE = 'maintenance',
  SUSPENDED = 'suspended',
  CLOSED = 'closed',
}

export interface UserSafeResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string | null;
  username?: string | null;
  middleName?: string | null;
  qualifications?: string[] | null;
  qaCenterId?: string | null;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

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

export interface JwtPayload {
  email: string;
  sub: string;
  role: UserRole;
}

export interface AuthenticatedRequest {
  user: {
    userId: string;
    email: string;
    role: UserRole;
  };
}
