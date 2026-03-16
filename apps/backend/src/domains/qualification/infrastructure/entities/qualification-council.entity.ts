import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProfessionalQualificationEntity } from './professional-qualification.entity';

@Entity('qualification_councils')
export class QualificationCouncilEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'council_id' })
  councilId: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => ProfessionalQualificationEntity, (pq) => pq.council)
  qualifications: ProfessionalQualificationEntity[];
}
