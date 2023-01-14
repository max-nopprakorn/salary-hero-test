import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  onModuleInit() {
    const salt = 10;
    const password = hashSync('P@ssw0rd', salt);
    const data = {
      username: 'salary-hero',
      password: password,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.userModel.create(data).then(value => {
        console.log(`Created salary-hero user.`);
    })
  }
}
