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
      return await res.status(HttpStatus.OK).json({
        status: 'success',
        message: `User with id ${user.userId} has successfully tranfered money from Salary Hero.`,
      });
    } else {
      return await res.status(HttpStatus.OK).json({
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
    return await this.employeeService.getAllEmployeesByCompanyId(
      user.companyId,
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('CLIENT_ADMIN')
  async findOne(@Param('id') id: number, @AuthUser() user: any) {
    return await this.employeeService.findOne(+id, user.companyId);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('CLIENT_ADMIN')
  async addEmployeeToCompany(
    @AuthUser() user: any,
    @Body() addEmployeeDto: AddEmployeeDto,
  ) {
    return await this.employeeService.addEmployeeToCompany(
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
    @AuthUser() user: any,
  ) {
    return this.employeeService.editEmployee(
      employeeId,
      editEmployee,
      user.companyId,
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('CLIENT_ADMIN')
  async deleteEmployee(@Param('id') employeeId: number, @AuthUser() user: any) {
    const result = await this.employeeService.removeEmployeeFromCompany(
      employeeId,
      user.companyId,
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
  async upsert(
    @Body() upsertEmployeeDto: UpsertEmployeeDto[],
    @AuthUser() user: any,
  ): Promise<User[]> {
    return await this.employeeService.upsertEmployees(
      upsertEmployeeDto,
      user.companyId,
    );
  }
}
