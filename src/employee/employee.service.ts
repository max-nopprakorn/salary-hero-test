import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

  async requestMoney(employeeId: number, amount: number): Promise<Object> {
    try {
      await this.checkIfExist(employeeId);
      const date = new Date();
      const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
      const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const transactions = await this.employeeRequestTransactionModel.findAll({
        where: {
          employeeId: employeeId,
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
          id: employeeId,
        },
      });

      if (!user) {
        return {
          status: 'failed',
          message: `User with id ${employeeId} has't been added to the company yet.`,
        };
      }

      if (this.checkIfCanRequest(sumAmount, user.salary, amount)) {
        const transactionParam = {
          employeeId: employeeId,
          amount: amount,
        };
        await this.employeeRequestTransactionModel.create(transactionParam);
        return {
          status: 'success',
          message: `User with id ${employeeId} has successfully transferred money from Salary Hero.`,
        };
      } else {
        return {
          status: 'failed',
          message: `User with id ${employeeId} has already transferred money more than 50% of his salary for this month.`,
        };
      }
    } catch (e) {
      throw e;
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
    try {
      return this.userModel.findAll({
        where: {
          companyId: companyId,
        },
        attributes: { exclude: ['password'] },
      });
    } catch (e) {
      throw e;
    }
  }

  async findOne(employeeId: number, adminCompanyId: number): Promise<User> {
    try {
      await this.checkIfExist(employeeId);
      const user = await this.userModel.findByPk(employeeId, {
        attributes: { exclude: ['password'] },
      });
      if(user.companyId !== adminCompanyId) throw new ForbiddenException(`You have no right to access employee from other companies.`)
      return user
    } catch (e) {
      throw e;
    }
  }

  async addEmployeeToCompany(
    addEmployeeDto: AddEmployeeDto,
    companyId: number,
  ): Promise<User> {
    try {
      if(addEmployeeDto.companyId !== companyId) throw new ForbiddenException(`You have no right to access employee from other companies.`)
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
      return this.findOne(user.id,companyId);
    } catch (e) {
      throw e
    }
  }

  async removeEmployeeFromCompany(employeeId: number, adminCompanyId: number): Promise<boolean> {
    try {
      await this.checkIfExist(employeeId);
      const user = await this.userModel.findByPk(employeeId)
      if(user.companyId !== adminCompanyId) throw new ForbiddenException(`You have no right to access employee from other companies.`)
      const countDelete = await this.userModel.destroy({
        where: {
          id: employeeId,
        },
      });
      if (countDelete > 0) {
        await this.userRoleModel.destroy({
          where: {
            userId: employeeId,
          },
        });
        return true;
      } else {
        return false;
      }
    } catch (e) {
      throw e;
    }
  }

  async editEmployee(
    employeeId: number,
    editEmployeeDto: EditEmployeeDto,
    adminCompanyId: number
  ): Promise<User> {
    try {
      await this.checkIfExist(employeeId);
      const user = await this.userModel.findByPk(employeeId);
      const salt = await bcrypt.genSalt(saltRound);
      const hashedPassword = bcrypt.hashSync(editEmployeeDto.password, salt);
      user.password = hashedPassword;
      user.salary = editEmployeeDto.salary;
      user.firstName = editEmployeeDto.firstName;
      user.givenName = editEmployeeDto.givenName;
      return this.findOne(user.id,adminCompanyId);
    } catch (e) {
      throw e;
    }
  }

  async upsertEmployees(upsertEmployeeDto: AddEmployeeDto[], adminCompanyId: number): Promise<User[]> {
    try {
      const res = [];
      const role = await this.roleModel.findOne({
        where: {
          name: 'EMPLOYEE',
        },
      });
      for (const employee of upsertEmployeeDto) {
        const salt = await bcrypt.genSalt(saltRound);
        const hashedPassword = bcrypt.hashSync(employee.password, salt);
        const param = { ...employee, password: hashedPassword };
        const [user, created] = await this.userModel.upsert(param);
        console.log('created :>> ', created);
        if (user) {
          const userWithoutPassword = await this.findOne(user.id,adminCompanyId);
          res.push(userWithoutPassword);

          const userRole = await this.userRoleModel.findOne({
            where: {
              userId: user.id,
              roleId: role.id,
            },
          });

          if (!userRole) {
            const userRoleParam = {
              userId: user.id,
              roleId: role.id,
            };

            await this.userRoleModel.create(userRoleParam);
          }
        }
      }
      return res;
    } catch (e) {
      console.log('e :>> ', e);
      throw e;
    }
  }

  async checkIfExist(id: number) {
    const check = await this.userModel.findByPk(id);
    if (!check)
      throw new NotFoundException(`Could not find company wiht id ${id}`);
  }
}
