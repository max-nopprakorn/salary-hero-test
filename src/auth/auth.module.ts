import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JWTStrategy } from './jwt.strategy';

@Module({
  providers: [AuthService,JWTStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
