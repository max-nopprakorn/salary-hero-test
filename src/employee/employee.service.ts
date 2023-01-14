import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { EmployeeRequestTransaction } from 'src/employee-request-transaction/employee-request-transaction.entity';
import { User } from 'src/user/user.entity';
import { AddEmployeeDto, EditEmployeeDto } from './dto/employee.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/role/role.entity';
import { UserRole } from 'src/user-role/user-role.entity';

const saltRound = 10;

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(EmployeeRequestTransaction)
    private employeeRequestTransactionModel: typeof EmployeeRequestTransaction,
    @InjectModel(Role)
    private roleModel: typeof Role,
    @InjectModel(UserRole)
    private userRoleModel: typeof UserRole,
  ) {}

  async requestMoney(userId: number, amount: number): Promise<Object> {
    const date = new Date();
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const transactions = await this.employeeRequestTransactionModel.findAll({
      where: {
        userId: userId,
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    const sumAmount = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    const user = await this.userModel.findOne({
      where: {
        id: userId,
        isAdded: true,
      },
    });

    if (!user) {
      return {
        status: 'failed',
        message: `User with id ${userId} has't been added to the company yet.`,
      };
    }

    if (this.checkIfCanRequest(sumAmount, user.salary, amount)) {
      const transactionParam = {
        userId: userId,
        amount: amount,
      };
      await this.employeeRequestTransactionModel.create(transactionParam);
      return {
        status: 'success',
        message: `User with id ${userId} has successfully tranfered money from Salary Hero.`,
      };
    } else {
      return {
        status: 'failed',
        message: `User with id ${userId} has already tranferred money more than 50% of his salary for this month.`,
      };
    }
  }

  checkIfCanRequest(
    sum: number,
    salary: number,
    requestAmount: number,
  ): boolean {
    return salary / 2 >= sum + requestAmount;
  }

  async getAllEmployeesByCompanyId(companyId: number): Promise<User[]> {
    return this.userModel.findAll({
      where: {
        companyId: companyId,
      },
    });
  }

  async getAddedEmployeesByCompanyId(companyId: number): Promise<User[]> {
    return this.userModel.findAll({
      where: {
        companyId: companyId,
        isAdded: true,
      },
    });
  }

  async getNotAddedEmployeesByCompanyId(companyId: number): Promise<User[]> {
    return this.userModel.findAll({
      where: {
        companyId: companyId,
        isAdded: false,
      },
    });
  }

  async addEmployeeToCompany(
    addEmployeeDto: AddEmployeeDto,
    companyId: number,
  ): Promise<User> {
    try {
      const salt = await bcrypt.genSalt(saltRound);
      const hashedPassword = bcrypt.hashSync(addEmployeeDto.password, salt);
      const role = await this.roleModel.findOne({
        where: {
          name: 'EMPLOYEE',
        },
      });
      const userParam = {
        username: addEmployeeDto.username,
        password: hashedPassword,
        companyId: companyId,
        firstName: addEmployeeDto.firstName,
        givenName: addEmployeeDto.givenName,
        salary: addEmployeeDto.salary,
      };

      const user = await this.userModel.create(userParam);

      const userRoleParam = {
        userId: user.id,
        roleId: role.id,
      };

      await this.userRoleModel.create(userRoleParam);
      return user;
    } catch (e) {
      console.log('e :>> ', e);
    }
  }

  async removeEmployeeFromCompany(employeeId: number): Promise<boolean> {
    const countDelete = await this.userModel.destroy({
      where: {
        id: employeeId,
      },
    });
    if (countDelete > 0) {
      return true;
    } else {
      return false;
    }
  }

  async editEmployee(
    employeeId: number,
    editEmployeeDto: EditEmployeeDto,
  ): Promise<User> {
    const user = await this.userModel.findByPk(employeeId);
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = bcrypt.hashSync(editEmployeeDto.password, salt);
    user.password = hashedPassword;
    user.salary = editEmployeeDto.salary;
    user.firstName = editEmployeeDto.firstName;
    user.givenName = editEmployeeDto.givenName;
    return await user.save();
  }

}
