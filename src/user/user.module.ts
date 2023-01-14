import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { SeedUser } from './seed/user.seed';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    SeederModule.forFeature([SeedUser]),
  ],
  controllers: [],
  providers: [],
  exports: [SequelizeModule]
})
export class UserModule {}
