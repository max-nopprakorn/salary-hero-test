import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from 'src/user/user.entity';

@Table
export class Company extends Model {
  @Column
  name: string;

  @HasMany(() => User)
  users: User[]

}
