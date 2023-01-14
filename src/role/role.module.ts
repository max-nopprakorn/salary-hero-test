import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './role.entity';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { SeedRole } from './seeder/role.seed';

@Module({
  imports:[
    SequelizeModule.forFeature([Role]),
    SeederModule.forFeature([SeedRole])
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [SequelizeModule]
})
export class RoleModule {}
