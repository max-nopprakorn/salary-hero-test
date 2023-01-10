import { BelongsToMany, Column, Model , Table} from "sequelize-typescript";
import { UserRole } from "src/user-role/user-role.entity";
import { User } from "src/user/user.entity";

@Table
export class Role extends Model{
    @BelongsToMany(()=>User, ()=>UserRole)
    users: User[]

    @Column
    name: string
    
}
