import { User } from './user.entity';
import { UserRole } from '../../../shared/types/user.types';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
  findAll(): Promise<User[]>;
  findByRole(role: UserRole): Promise<User[]>;
  findByQACenter(qaCenterId: string): Promise<User[]>;
  countByRole(role: UserRole): Promise<number>;
  countActiveByRole(role: UserRole): Promise<number>;
  exists(id: string): Promise<boolean>;
}
