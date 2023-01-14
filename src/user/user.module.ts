import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
  ],
  controllers: [],
  providers: [UserService],
  exports: [SequelizeModule]
})
export class UserModule {}
