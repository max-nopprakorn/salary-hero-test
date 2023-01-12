import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRole } from './user-role.entity';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { SeedUserRole } from './seeder/user-role.seeder';

@Module({
  imports: [
    SequelizeModule.forFeature([UserRole]),
    SeederModule.forFeature([SeedUserRole]),
  ],
  controllers: [UserRoleController],
  providers: [UserRoleService],
  exports:[SequelizeModule]
})
export class UserRoleModule {}
