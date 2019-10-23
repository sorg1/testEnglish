import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Question } from '../question.entity';

@Table
export class Option extends Model<Option> {
  @Column
  text: string;

  @ForeignKey(() => Question)
  @Column
  questionId: number;
}
