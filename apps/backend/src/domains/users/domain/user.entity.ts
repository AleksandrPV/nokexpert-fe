import { UserRole, UserStatus } from '../../../shared/types/user.types';

export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly username: string | null,
    public readonly passwordHash: string,
    public readonly firstName: string,
    public readonly middleName: string | null,
    public readonly lastName: string,
    public readonly phone: string | null,
    public readonly role: UserRole,
    public readonly status: UserStatus,
    public readonly qualifications: string[] | null,
    public readonly qaCenterId: string | null,
    public readonly isActive: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  // Бизнес-методы
  public changePassword(newPasswordHash: string): User {
    return new User(
      this.id,
      this.email,
      this.username,
      newPasswordHash,
      this.firstName,
      this.middleName,
      this.lastName,
      this.phone,
      this.role,
      this.status,
      this.qualifications,
      this.qaCenterId,
      this.isActive,
      this.createdAt,
      new Date(),
    );
  }

  public activate(): User {
    if (this.isActive) {
      throw new Error('User is already active');
    }

    return new User(
      this.id,
      this.email,
      this.username,
      this.passwordHash,
      this.firstName,
      this.middleName,
      this.lastName,
      this.phone,
      this.role,
      UserStatus.ACTIVE,
      this.qualifications,
      this.qaCenterId,
      true,
      this.createdAt,
      new Date(),
    );
  }

  public deactivate(): User {
    if (!this.isActive) {
      throw new Error('User is already inactive');
    }

    return new User(
      this.id,
      this.email,
      this.username,
      this.passwordHash,
      this.firstName,
      this.middleName,
      this.lastName,
      this.phone,
      this.role,
      UserStatus.INACTIVE,
      this.qualifications,
      this.qaCenterId,
      false,
      this.createdAt,
      new Date(),
    );
  }

  public updateProfile(
    firstName?: string,
    middleName?: string,
    lastName?: string,
    phone?: string,
    username?: string,
    qualifications?: string[],
  ): User {
    return new User(
      this.id,
      this.email,
      username !== undefined ? username : this.username,
      this.passwordHash,
      firstName || this.firstName,
      middleName !== undefined ? middleName : this.middleName,
      lastName || this.lastName,
      phone !== undefined ? phone : this.phone,
      this.role,
      this.status,
      qualifications !== undefined ? qualifications : this.qualifications,
      this.qaCenterId,
      this.isActive,
      this.createdAt,
      new Date(),
    );
  }

  public isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  public canBeDeactivated(): boolean {
    return this.isActive && this.role !== UserRole.ADMIN;
  }

  public getFullName(): string {
    const middleNamePart = this.middleName ? ` ${this.middleName}` : '';
    return `${this.firstName}${middleNamePart} ${this.lastName}`;
  }

  public toSafeResponse() {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      phone: this.phone,
      role: this.role,
      status: this.status,
      qualifications: this.qualifications,
      qaCenterId: this.qaCenterId,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public static create(
    email: string,
    passwordHash: string,
    firstName: string,
    lastName: string,
    role: UserRole,
    phone?: string,
    username?: string,
    middleName?: string,
    qualifications?: string[],
    qaCenterId?: string,
  ): User {
    const now = new Date();
    return new User(
      '', // ID будет сгенерирован базой данных
      email,
      username || null,
      passwordHash,
      firstName,
      middleName || null,
      lastName,
      phone || null,
      role,
      UserStatus.ACTIVE,
      qualifications || null,
      qaCenterId || null,
      true,
      now,
      now,
    );
  }
}
