import { BelongsToMany, Column, Model } from "sequelize-typescript";
import { UserRole } from "src/user-role/user-role.entity";
import { User } from "src/user/user.entity";

export class Role extends Model{
    @BelongsToMany(()=>User, ()=>UserRole)
    users: User[]

    @Column
    name: string
    
}
