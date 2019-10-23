import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Contact extends Model<Contact> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;
}
