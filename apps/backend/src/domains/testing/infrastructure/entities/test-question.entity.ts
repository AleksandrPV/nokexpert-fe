import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TestEntity } from './test.entity';
import { QuestionEntity } from './question.entity';

@Entity('test_questions')
export class TestQuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'test_id', type: 'uuid' })
  testId: string;

  @Column({ name: 'question_id', type: 'uuid' })
  questionId: string;

  @Column({ name: 'order_number', type: 'int' })
  orderNumber: number;

  @ManyToOne(() => TestEntity, (t) => t.testQuestions)
  @JoinColumn({ name: 'test_id' })
  test: TestEntity;

  @ManyToOne(() => QuestionEntity)
  @JoinColumn({ name: 'question_id' })
  question: QuestionEntity;
}
