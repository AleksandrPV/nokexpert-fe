import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { TestEntity } from './test.entity';
import { QuestionEntity } from './question.entity';

@Entity('user_answers')
export class UserAnswerEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'user_answer_id' })
  userAnswerId: string;

  @Column({ name: 'test_id', type: 'uuid' })
  testId: string;

  @Column({ name: 'question_id', type: 'uuid' })
  questionId: string;

  @Column({ name: 'selected_option_id', type: 'uuid', nullable: true })
  selectedOptionId: string | null;

  @Column({ name: 'selected_option_ids', type: 'json', nullable: true })
  selectedOptionIds: string[] | null;

  @Column({ name: 'is_correct', type: 'boolean' })
  isCorrect: boolean;

  @CreateDateColumn({ name: 'answered_at' })
  answeredAt: Date;

  @ManyToOne(() => TestEntity, (t) => t.userAnswers)
  @JoinColumn({ name: 'test_id' })
  test: TestEntity;

  @ManyToOne(() => QuestionEntity)
  @JoinColumn({ name: 'question_id' })
  question: QuestionEntity;
}
