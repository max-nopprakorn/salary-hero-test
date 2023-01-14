import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.entity";

@Table
export class EmployeeRequestTransaction extends Model {

    @ForeignKey(() => User)
    @Column
    employeeId: number

    @Column
    amount: number
}