import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity('answer_options')
export class AnswerOptionEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'option_id' })
  optionId: string;

  @Column({ name: 'question_id', type: 'uuid' })
  questionId: string;

  @Column({ type: 'text' })
  text: string;

  @Column({ name: 'is_correct', type: 'boolean', default: false })
  isCorrect: boolean;

  @Column({ name: 'order_number', type: 'int' })
  orderNumber: number;

  @ManyToOne(() => QuestionEntity, (q) => q.options)
  @JoinColumn({ name: 'question_id' })
  question: QuestionEntity;
}
