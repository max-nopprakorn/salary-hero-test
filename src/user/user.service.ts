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

  // I have to use this way to seed salary-hero account because if I use SeederModule it will not increase the index
  // of an ID so it will be stuck at 1 then when USER is gonna be created next time it will cause an error because 
  // id 1 is already existed.
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
