import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Option } from './options/option.entity';

@Table
export class Question extends Model<Question> {
  @Column
  hint: string;

  @Column
  text: string;

  @HasMany(() => Option)
  options: Option[];
}
