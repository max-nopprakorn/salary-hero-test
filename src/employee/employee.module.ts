import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { UserModule } from 'src/user/user.module';
import { EmployeeRequestTransactionModule } from 'src/employee-request-transaction/employee-request-transaction.module';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports:[UserModule,EmployeeRequestTransactionModule,RoleModule],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule {}
