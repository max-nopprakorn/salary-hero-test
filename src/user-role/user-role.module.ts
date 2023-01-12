import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRole } from './user-role.entity';

@Module({
  imports:[SequelizeModule.forFeature([UserRole])],
  controllers: [UserRoleController],
  providers: [UserRoleService]
})
export class UserRoleModule {}
