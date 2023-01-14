import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRole } from './user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectModel(UserRole)
    private userRoleModel: typeof UserRole,
  ) {}

  async findAll() {
    return this.userRoleModel.findAll()
  }
}
