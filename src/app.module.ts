import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from 'config/config';
import { RoleModule } from './role/role.module';
import { CompanyModule } from './company/company.module';
import { UserRoleModule } from './user-role/user-role.module';

@Module({
  imports: [
    UserModule,
    SequelizeModule.forRoot({
      dialect: config.postgres,
    }),
    RoleModule,
    CompanyModule,
    UserRoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
