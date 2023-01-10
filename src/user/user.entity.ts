import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Company } from 'src/company/company.entity';
import { Role } from 'src/role/role.entity';
import { UserRole } from 'src/user-role/user-role.entity';

@Table
export class User extends Model {
  @Column
  username: string;

  @Column
  password: string;

  @Column(DataType.FLOAT)
  salary: number;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @ForeignKey(() => Company)
  companyId: number;
}
