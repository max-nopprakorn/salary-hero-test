import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/role/role.entity';
import { UserRole } from 'src/user-role/user-role.entity';
import { User } from 'src/user/user.entity';
import { ClientAdminDto, UpdateCLientAdminDto } from './dto/client-admin.dto';
import * as bcrypt from 'bcrypt';
import { ResponseUser } from 'src/user/dto/user.dto';

const clientAdminRoleValue = 'CLIENT_ADMIN';

const employeeRoleValue = 'EMPLOYEE';

const saltRound = 10;

@Injectable()
export class ClientAdminService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(UserRole)
    private userRoleModel: typeof UserRole,
    @InjectModel(Role)
    private roleModel: typeof Role,
  ) {}
  async create(createClientAdminDto: ClientAdminDto): Promise<ResponseUser> {
    try {
      const duplicate = await this.checkDuplicate(createClientAdminDto.username)
      if(duplicate) throw new ConflictException(`Duplicate username: ${createClientAdminDto.username}`)
      const salt = await bcrypt.genSalt(saltRound);
      const hashedPassword = bcrypt.hashSync(
        createClientAdminDto.password,
        salt,
      );
      const param = { ...createClientAdminDto, password: hashedPassword };
      const user = await this.userModel.create(param);

      const clientAdminRole = await this.roleModel.findOne({
        where: {
          name: clientAdminRoleValue,
        },
      });

      const clientRoleParam = {
        userId: user.id,
        roleId: clientAdminRole.id,
      };

      const employeeRole = await this.roleModel.findOne({
        where: {
          name: employeeRoleValue,
        },
      });

      const employeeRoleParam = {
        userId: user.id,
        roleId: employeeRole.id,
      };

      const userRoleParam = [clientRoleParam, employeeRoleParam];
      await this.userRoleModel.bulkCreate(userRoleParam);
      return this.userModel.findByPk(user.id, {
        attributes: { exclude: ['password'] },
      });
    } catch (e) {
      throw e;
    }
  }

  async checkDuplicate(username: string) {
    const user = await this.userModel.findOne({
      where: {
        username: username
      }
    })

    return user ? true:false
  }

  async findAll(): Promise<User[]> {
    try {
      const allUsers = await this.userModel.findAll({
        include: [
          {
            model: Role,
          },
        ],
        attributes: { exclude: ['password'] },
      });
      const filteredUsers = allUsers.filter((user) =>
        user.roles.some((role) => role.name === clientAdminRoleValue),
      );
      return filteredUsers;
    } catch (e) {
      throw e;
    }
  }

  async findAllByCompanyId(companyId: number): Promise<User[]> {
    try {
      const users = await this.userModel.findAll({
        where: {
          companyId: companyId,
        },
        include: {
          model: Role,
        },
        attributes: { exclude: ['password'] },
      });

      const filteredUsers = users.filter((user) =>
        user.roles.some((role) => role.name === clientAdminRoleValue),
      );
      return filteredUsers;
    } catch (e) {
      throw e;
    }
  }

  async findOne(clientAdminId: number) {
    try {
      await this.checkIfExist(clientAdminId);
      return this.userModel.findByPk(clientAdminId, {
        attributes: { exclude: ['password'] },
      });
    } catch (e) {
      throw e;
    }
  }

  async update(
    clientAdminId: number,
    updateClientAdminDto: UpdateCLientAdminDto,
  ): Promise<User> {
    try {
      await this.checkIfExist(clientAdminId);
      const clientAdmin = await this.userModel.findByPk(clientAdminId);
      const salt = await bcrypt.genSalt(saltRound);
      const hashedPassword = bcrypt.hashSync(
        updateClientAdminDto.password,
        salt,
      );
      clientAdmin.password = hashedPassword;
      clientAdmin.salary = updateClientAdminDto.salary;
      clientAdmin.firstName = updateClientAdminDto.firstName;
      clientAdmin.givenName = updateClientAdminDto.givenName;
      await clientAdmin.save();
      return this.userModel.findByPk(clientAdmin.id, {
        attributes: { exclude: ['password'] },
      });
    } catch (e) {
      throw e;
    }
  }

  async remove(clientAdminId: number): Promise<boolean> {
    try {
      await this.checkIfExist(clientAdminId);
      const countDelete = await this.userModel.destroy({
        where: {
          id: clientAdminId,
        },
      });

      if (countDelete > 0) {
        await this.userRoleModel.destroy({
          where: {
            userId: clientAdminId,
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

  async checkIfExist(id: number) {
    const check = await this.userModel.findByPk(id);
    if (!check)
      throw new NotFoundException(`Could not find company wiht id ${id}`);
  }
}
