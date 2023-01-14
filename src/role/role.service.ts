import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RoleDto } from './dto/role.dto';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
  ) {}
  async create(createRoleDto: RoleDto): Promise<Role> {
    return this.roleModel.create({...createRoleDto});
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.findAll();
  }

  async findOne(id: number): Promise<Role> {
    return this.roleModel.findByPk(id);
  }

  async update(id: number, updateRoleDto: RoleDto): Promise<Role> {
    await this.roleModel.update(updateRoleDto, {
      where: {
        id: id,
      },
    });
    return this.findOne(id)
  }

  async remove(id: number): Promise<boolean> {
    const countDelete = await this.roleModel.destroy({
      where: {
        id: id,
      },
    });

    if(countDelete > 0) {
      return true
    } else {
      return false
    }
  }
}
