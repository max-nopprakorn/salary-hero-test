import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EmployeeRequestTransaction } from './employee-request-transaction.entity';

@Injectable()
export class EmployeeRequestTransactionService {
  constructor(
    @InjectModel(EmployeeRequestTransaction)
    private transactionModel: typeof EmployeeRequestTransaction,
  ) {}

  async getAllHistory(userId: number): Promise<EmployeeRequestTransaction[]> {
    return this.transactionModel.findAll({
      where: {
        userId: userId,
      },
    });
  }
}
