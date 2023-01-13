import { Module } from '@nestjs/common';
import { EmployeeRequestTransactionService } from './employee-request-transaction.service';
import { EmployeeRequestTransactionController } from './employee-request-transaction.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeRequestTransaction } from './employee-request-transaction.entity';

@Module({
  imports:[SequelizeModule.forFeature([EmployeeRequestTransaction])],
  exports: [SequelizeModule],
  controllers: [EmployeeRequestTransactionController],
  providers: [EmployeeRequestTransactionService]
})
export class EmployeeRequestTransactionModule {}
