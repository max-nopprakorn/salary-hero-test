import { Module } from '@nestjs/common';
import { ClientAdminService } from './client-admin.service';
import { ClientAdminController } from './client-admin.controller';
import { UserModule } from 'src/user/user.module';
import { UserRoleModule } from 'src/user-role/user-role.module';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [UserModule, UserRoleModule, RoleModule],
  controllers: [ClientAdminController],
  providers: [ClientAdminService],
})
export class ClientAdminModule {}
