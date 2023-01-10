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

@Module({
  imports: [
    UserModule,
    RoleModule,
    CompanyModule,
    UserRoleModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: config.postgres.host,
      port: config.postgres.port,
      username: config.postgres.username,
      password: config.postgres.password,
      database: config.postgres.database,
      models: [],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
