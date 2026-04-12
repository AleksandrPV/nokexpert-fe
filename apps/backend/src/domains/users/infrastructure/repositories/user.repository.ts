import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/user.entity';
import { IUserRepository } from '../../domain/user.repository.interface';
import { UserEntity } from '../entities/user.entity';
import { UserRole } from '../../../../shared/types/user.types';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { id },
    });

    return userEntity ? this.mapToDomain(userEntity) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { email },
    });

    return userEntity ? this.mapToDomain(userEntity) : null;
  }

  async create(user: User): Promise<User> {
    const userEntity = this.mapToEntity(user);
    const savedEntity = await this.repository.save(userEntity);
    return this.mapToDomain(savedEntity);
  }

  async update(user: User): Promise<User> {
    const userEntity = this.mapToEntity(user);
    const updatedEntity = await this.repository.save(userEntity);
    return this.mapToDomain(updatedEntity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findAll(): Promise<User[]> {
    const userEntities = await this.repository.find({
      order: { createdAt: 'DESC' },
    });

    return userEntities.map((entity) => this.mapToDomain(entity));
  }

  async findByRole(role: UserRole): Promise<User[]> {
    const userEntities = await this.repository.find({
      where: { role },
      order: { createdAt: 'DESC' },
    });

    return userEntities.map((entity) => this.mapToDomain(entity));
  }

  async findByQACenter(qaCenterId: string): Promise<User[]> {
    const userEntities = await this.repository.find({
      where: { qaCenterId },
      order: { createdAt: 'DESC' },
    });

    return userEntities.map((entity) => this.mapToDomain(entity));
  }

  async countByRole(role: UserRole): Promise<number> {
    return await this.repository.count({
      where: { role },
    });
  }

  async countActiveByRole(role: UserRole): Promise<number> {
    return await this.repository.count({
      where: { role, isActive: true },
    });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({
      where: { id, isActive: true },
    });
    return count > 0;
  }

  // Вспомогательные методы для маппинга
  private mapToDomain(entity: UserEntity): User {
    return new User(
      entity.id,
      entity.email,
      entity.username,
      entity.passwordHash,
      entity.firstName,
      entity.middleName,
      entity.lastName,
      entity.phone,
      entity.role,
      entity.status,
      entity.qualifications,
      entity.qaCenterId,
      entity.isActive,
      entity.activationToken,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async findByActivationToken(token: string): Promise<User | null> {
    const entity = await this.repository.findOne({
      where: { activationToken: token },
    });
    return entity ? this.mapToDomain(entity) : null;
  }

  private mapToEntity(domain: User): UserEntity {
    const entity = new UserEntity();
    // Only set ID if it's not empty, allowing TypeORM to generate UUID for new entities
    if (domain.id && domain.id.trim() !== '') {
      entity.id = domain.id;
    }
    entity.email = domain.email;
    entity.username = domain.username;
    entity.passwordHash = domain.passwordHash;
    entity.firstName = domain.firstName;
    entity.middleName = domain.middleName;
    entity.lastName = domain.lastName;
    entity.phone = domain.phone;
    entity.role = domain.role;
    entity.status = domain.status;
    entity.qualifications = domain.qualifications;
    entity.qaCenterId = domain.qaCenterId;
    entity.isActive = domain.isActive;
    entity.activationToken = domain.activationToken;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    return entity;
  }
}
