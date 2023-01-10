import { Column, ForeignKey, Model } from "sequelize-typescript";
import { Role } from "src/role/role.entity";
import { User } from "src/user/user.entity";

export class UserRole extends Model{
    @ForeignKey(()=>User)
    @Column
    userId: User

    @ForeignKey(() => Role)
    @Column
    role: Role
}
