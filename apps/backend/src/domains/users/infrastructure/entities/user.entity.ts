import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole, UserStatus } from '../../../../shared/types/user.types';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'username', unique: true, nullable: true, type: 'varchar' })
  username: string | null;

  @Column({ name: 'password_hash', type: 'varchar' })
  passwordHash: string;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'middle_name', nullable: true, type: 'varchar' })
  middleName: string | null;

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string;

  @Column({ nullable: true, type: 'varchar' })
  phone: string | null;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Column({ name: 'qualifications', type: 'json', nullable: true })
  qualifications: string[] | null;

  @Column({ name: 'qa_center_id', nullable: true, type: 'uuid' })
  qaCenterId: string | null;

  @Column({ name: 'is_active', default: false, type: 'boolean' })
  isActive: boolean;

  @Column({ name: 'activation_token', nullable: true, type: 'uuid' })
  activationToken: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
