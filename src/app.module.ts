import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from 'config/config';
import { RoleModule } from './role/role.module';
import { CompanyModule } from './company/company.module';
import { UserRoleModule } from './user-role/user-role.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { User } from './user/user.entity';
import { Role } from './role/role.entity';
import { UserRole } from './user-role/user-role.entity';
import { Company } from './company/company.entity';
import { SeederModule } from 'nestjs-sequelize-seeder';
// import { EmployeeRequestTransactionModule } from './employee-request-transactionadasd/employee-request-transaction.module';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeRequestTransactionModule } from './employee-request-transaction/employee-request-transaction.module';
import { EmployeeRequestTransaction } from './employee-request-transaction/employee-request-transaction.entity';
import { ClientAdminModule } from './client-admin/client-admin.module';

@Module({
  imports: [
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
      models: [User, Role, UserRole, Company, EmployeeRequestTransaction],
      synchronize: true,
      autoLoadModels: true,
    }),
    SeederModule.forRoot({
      runOnlyIfTableIsEmpty: false,
      foreignDelay: 2000,
    }),
    UserModule,
    RoleModule,
    CompanyModule,
    UserRoleModule,
    AuthModule,
    PassportModule,
    EmployeeModule,
    EmployeeRequestTransactionModule,
    ClientAdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
