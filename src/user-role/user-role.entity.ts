import { Column, ForeignKey, Model,Table } from "sequelize-typescript";
import { Role } from "src/role/role.entity";
import { User } from "src/user/user.entity";

@Table
export class UserRole extends Model{
    @ForeignKey(()=>User)
    @Column
    userId: number

    @ForeignKey(() => Role)
    @Column
    roleId: number
}
