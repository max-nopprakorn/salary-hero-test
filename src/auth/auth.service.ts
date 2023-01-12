import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { sign } from 'jsonwebtoken';
import { User } from 'src/user/user.entity';
import { SignInDto, SignUpDto, TokenResponse } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/user-role/user-role.entity';
import { Role } from 'src/role/role.entity';

const saltRound = 10;
const jwtSecret = 'salary-hero';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(UserRole)
    private userRoleModel: typeof UserRole,
    @InjectModel(Role)
    private roleModel: typeof Role,
  ) {}

  async signIn(signInDto: SignInDto): Promise<TokenResponse> {
    const user = await this.userModel.findOne({
      where: {
        username: signInDto.username,
      },
    });

    if (!user) throw new NotFoundException('incorrect username');

    const check = await bcrypt.compare(signInDto.password, user.password);
    if (!check) throw new NotFoundException('incorrect password');

    const userRoles = await this.userRoleModel.findAll({
      where: {
        userId: user.id,
      },
    });

    const roleIds = userRoles.map((userRole) => userRole.roleId);

    const roles = [];

    for (const roleId of roleIds) {
      const role = await this.roleModel.findOne({
        where: {
          id: roleId,
        },
      });

      roles.push(role.name);
    }

    const token = sign({ ...user, roles: roles }, jwtSecret);

    return { token, user };
  }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    try {
      const salt = await bcrypt.genSalt(saltRound);
      const hashedPassword = bcrypt.hashSync(signUpDto.password, salt);
      const role = await this.roleModel.findOne({
        where: {
          name: 'EMPLOYEE',
        },
      });
      const userParam = {
        username: signUpDto.username,
        password: hashedPassword, 
        companyId: signUpDto.companyId,
        isAdded: false,
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
}
