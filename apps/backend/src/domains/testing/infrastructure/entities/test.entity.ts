import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { TestMode, TestStatus } from '../../../../shared/types/testing.types';
import { ProfessionalQualificationEntity } from '../../../qualification/infrastructure/entities/professional-qualification.entity';
import { TestQuestionEntity } from './test-question.entity';
import { UserAnswerEntity } from './user-answer.entity';

@Entity('tests')
export class TestEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'test_id' })
  testId: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId: string | null;

  @Column({ name: 'prof_qual_id', type: 'uuid' })
  profQualId: string;

  @Column({ type: 'enum', enum: TestMode })
  mode: TestMode;

  @Column({ type: 'enum', enum: TestStatus, default: TestStatus.IN_PROGRESS })
  status: TestStatus;

  @Column({ name: 'total_questions', type: 'int' })
  totalQuestions: number;

  @CreateDateColumn({ name: 'started_at' })
  startedAt: Date;

  @Column({ name: 'finished_at', type: 'timestamp', nullable: true })
  finishedAt: Date | null;

  @Column({ type: 'int', nullable: true })
  score: number | null;

  @Column({ name: 'ip_address', type: 'varchar', length: 45, nullable: true })
  ipAddress: string | null;

  @ManyToOne(() => ProfessionalQualificationEntity)
  @JoinColumn({ name: 'prof_qual_id' })
  qualification: ProfessionalQualificationEntity;

  @OneToMany(() => TestQuestionEntity, (tq) => tq.test, { cascade: true })
  testQuestions: TestQuestionEntity[];

  @OneToMany(() => UserAnswerEntity, (ua) => ua.test, { cascade: true })
  userAnswers: UserAnswerEntity[];
}
