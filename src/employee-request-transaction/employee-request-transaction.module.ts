import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeRequestTransaction } from './employee-request-transaction.entity';
import { EmployeeRequestTransactionController } from './employee-request-transaction.controller';

@Module({
    imports: [SequelizeModule.forFeature([EmployeeRequestTransaction])],
    exports: [SequelizeModule],
    controllers: [EmployeeRequestTransactionController]
})
export class EmployeeRequestTransactionModule {}
