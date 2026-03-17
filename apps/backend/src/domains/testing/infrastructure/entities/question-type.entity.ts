import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('question_types')
export class QuestionTypeEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'question_type_id' })
  questionTypeId: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;
}
