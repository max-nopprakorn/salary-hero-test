import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Company } from 'src/company/company.entity';
import { Role } from 'src/role/role.entity';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}
  create(createUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return this.userModel.findAll({
      where: {
        username: {
          [Op.not]: 'salary-hero'
        }
      },
      include: [
        {
         model: Role,
         attributes: {exclude:['UserRole']} 
        }, { model: Company }],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
