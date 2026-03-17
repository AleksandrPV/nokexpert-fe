import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { QuestionTypeEntity } from './question-type.entity';
import { AnswerOptionEntity } from './answer-option.entity';
import { ProfessionalQualificationEntity } from '../../../qualification/infrastructure/entities/professional-qualification.entity';

@Entity('questions')
export class QuestionEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'question_id' })
  questionId: string;

  @Column({ type: 'text' })
  text: string;

  @Column({ name: 'prof_qual_id', type: 'uuid' })
  profQualId: string;

  @Column({ name: 'question_type_id', type: 'uuid' })
  questionTypeId: string;

  @ManyToOne(() => ProfessionalQualificationEntity)
  @JoinColumn({ name: 'prof_qual_id' })
  qualification: ProfessionalQualificationEntity;

  @ManyToOne(() => QuestionTypeEntity)
  @JoinColumn({ name: 'question_type_id' })
  questionType: QuestionTypeEntity;

  @OneToMany(() => AnswerOptionEntity, (o) => o.question, { cascade: true })
  options: AnswerOptionEntity[];
}
