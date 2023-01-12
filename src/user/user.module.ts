import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { SeedUser } from './seed/user.seed';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    SeederModule.forFeature([SeedUser]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [SequelizeModule]
})
export class UserModule {}
