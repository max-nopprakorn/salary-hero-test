import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AuthUser } from 'src/auth/user.decorator';
import { EmployeeRequestTransactionService } from './employee-request-transaction.service';

@Controller('employeeRequestTransactions')
@ApiTags('employeeRequestTransactions')
export class EmployeeRequestTransactionController {
  constructor(
    private readonly transactionService: EmployeeRequestTransactionService,
  ) {}

  @Get('history')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard,RoleGuard)
  @Roles('EMPLOYEE')
  async findAllUserHistory( @AuthUser() user: any) {
    return await this.transactionService.getAllHistory(user.userId)
  }
}
