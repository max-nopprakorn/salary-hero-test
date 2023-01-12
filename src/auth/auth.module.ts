import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JWTStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[UserModule],
  providers: [AuthService,JWTStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
