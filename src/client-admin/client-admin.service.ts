import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/role/role.entity';
import { UserRole } from 'src/user-role/user-role.entity';
import { User } from 'src/user/user.entity';
import { ClientAdminDto, UpdateCLientAdminDto } from './dto/client-admin.dto';
import * as bcrypt from 'bcrypt';

const clientAdminRole = 'CLIENT_ADMIN';

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
  async create(createClientAdminDto: ClientAdminDto): Promise<User> {
    const user = await this.userModel.create({ ...createClientAdminDto });

    const role = await this.roleModel.findOne({
      where: {
        name: clientAdminRole,
      },
    });

    const userRoleParam = {
      userId: user.id,
      roleId: role.id,
    };

    await this.userRoleModel.create(userRoleParam);
    return user;
  }

  async findAll(): Promise<User[]> {
    const allUsers = await this.userModel.findAll({
      include: [
        {
          model: Role,
        },
      ],
    });
    const filteredUsers = allUsers.filter((user) =>
      user.roles.some((role) => role.name === clientAdminRole),
    );
    return filteredUsers;
  }

  async findAllByCompanyId(companyId: number): Promise<User[]> {
    const users = await this.userModel.findAll({
      where: {
        companyId: companyId,
      },
      include: {
        model: Role,
      },
    });

    const filteredUsers = users.filter((user) =>
      user.roles.some((role) => role.name === clientAdminRole),
    );
    return filteredUsers;
  }

  async findOne(clientAdminId: number) {
    return this.userModel.findByPk(clientAdminId);
  }

  async update(clientAdminId: number, updateClientAdminDto: UpdateCLientAdminDto) {
    const clientAdmin = await this.userModel.findByPk(clientAdminId);
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = bcrypt.hashSync(updateClientAdminDto.password, salt);
    clientAdmin.password = hashedPassword;
    clientAdmin.salary = updateClientAdminDto.salary;
    clientAdmin.firstName = updateClientAdminDto.firstName;
    clientAdmin.givenName = updateClientAdminDto.givenName;
    return await clientAdmin.save();
  }

  async remove(clientAdminId: number): Promise<boolean> {
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
  }
}
