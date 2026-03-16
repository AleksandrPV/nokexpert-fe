import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QualificationCouncilEntity } from './qualification-council.entity';

@Entity('professional_qualifications')
export class ProfessionalQualificationEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'prof_qual_id' })
  profQualId: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'int' })
  level: number;

  @Column({ name: 'council_id', type: 'uuid' })
  councilId: string;

  @Column({ name: 'question_count', type: 'int', default: 0 })
  questionCount: number;

  @Column({ name: 'min_passing_score', type: 'int', default: 70 })
  minPassingScore: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => QualificationCouncilEntity, (c) => c.qualifications)
  @JoinColumn({ name: 'council_id' })
  council: QualificationCouncilEntity;
}
