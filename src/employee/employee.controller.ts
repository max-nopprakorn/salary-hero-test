import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { AuthUser } from 'src/auth/user.decorator';
import { User } from 'src/user/user.entity';
import {
  AddEmployeeDto,
  EditEmployeeDto,
  RequestMoneyTransferDto,
  UpsertEmployeeDto,
} from './dto/employee.dto';
import { EmployeeService } from './employee.service';

@Controller('employees')
@ApiTags('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('requestMoneyTransfer')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('EMPLOYEE')
  async requestMoneyTransfer(
    @Res() res,
    @AuthUser() user: any,
    @Body() requestMoneyTransferDto: RequestMoneyTransferDto,
  ) {
    const response = await this.employeeService.requestMoney(
      user.userId,
      requestMoneyTransferDto.amount,
    );
    if (response) {
      return res.status(HttpStatus.OK).json({
        status: 'success',
        message: `User with id ${user.userId} has successfully tranfered money from Salary Hero.`,
      });
    } else {
      return res.status(HttpStatus.OK).json({
        status: 'failed',
        message: `User with id ${user.userId} has been already tranferred money more than 50% of his salary for this month.`,
      });
    }
  }

  @Get('allInCompany')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('CLIENT_ADMIN')
  async findAllEmployeeInCompany(@AuthUser() user: any) {
    return this.employeeService.getAllEmployeesByCompanyId(user.companyId);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('CLIENT_ADMIN')
  async addEmployeeToCompany(
    @AuthUser() user: any,
    @Body() addEmployeeDto: AddEmployeeDto,
  ) {
    return this.employeeService.addEmployeeToCompany(
      addEmployeeDto,
      user.companyId,
    );
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('CLIENT_ADMIN')
  async editEmployee(
    @Param('id') employeeId: number,
    @Body() editEmployee: EditEmployeeDto,
  ) {
    return this.employeeService.editEmployee(employeeId, editEmployee);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('CLIENT_ADMIN')
  async deleteEmployee(@Param('id') employeeId: number) {
    const result = await this.employeeService.removeEmployeeFromCompany(
      employeeId,
    );
    if (result) {
      return {
        status: 'success',
        message: `Employee with id ${employeeId} has been deleted.`,
      };
    } else {
      return {
        status: 'failed',
        message: `Can't delete employee with id ${employeeId}`,
      };
    }
  }

  @Post('upsert')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('CLIENT_ADMIN')
  async upsert(@Body() upsertEmployeeDto: UpsertEmployeeDto[]):Promise<User[]> {
    return await this.employeeService.upsertEmployees(upsertEmployeeDto);
  }
}
