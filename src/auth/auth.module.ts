import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JWTStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { UserRoleModule } from 'src/user-role/user-role.module';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports:[UserModule,UserRoleModule,RoleModule],
  providers: [AuthService,JWTStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
