import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from 'config/config';
import { RoleModule } from './role/role.module';
import { CompanyModule } from './company/company.module';
import { UserRoleModule } from './user-role/user-role.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './auth/jwt.strategy';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { User } from './user/user.entity';
import { Role } from './role/role.entity';
import { UserRole } from './user-role/user-role.entity';
import { Company } from './company/company.entity';
import { databaseProviders } from './database.providers';

@Module({
  imports: [
    UserModule,
    RoleModule,
    CompanyModule,
    UserRoleModule,
    AuthModule,
    PassportModule,
    JwtModule.register({
      secret: 'salary-hero',
      signOptions: { expiresIn: '1h' },
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: config.postgres.host,
      port: config.postgres.port,
      username: config.postgres.username,
      password: config.postgres.password,
      database: config.postgres.database,
      models: [User, Role, UserRole, Company],
    }),
  ],
  controllers: [AppController],
  providers: [...databaseProviders, AppService],
})
export class AppModule {}
