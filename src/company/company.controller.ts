import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Company } from './company.entity';
import { CompanyService } from './company.service';

@Controller('companies')
@ApiBearerAuth()
@UseGuards(JWTAuthGuard, RoleGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @Roles('SALARY_HERO')
  async create(@Body() createCompanyDto): Promise<Company> {
    return await this.companyService.create(createCompanyDto);
  }

  @Get()
  @Roles('SALARY_HERO')
  async findAll() {
    return await this.companyService.findAll();
  }

  @Get('search')
  @Roles('SALARY_HERO')
  async searchByName(@Query('name') name: string) {
    return await this.companyService.searchByName(name);
  }

  @Get(':id')
  @Roles('SALARY_HERO')
  async findOne(@Param('id') id: string): Promise<Company> {
    return await this.companyService.findOne(+id);
  }

  @Patch(':id')
  @Roles('SALARY_HERO')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto,
  ): Promise<Company> {
    return await this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  @Roles('SALARY_HERO')
  async remove(@Param('id') id: string) {
    const result = await this.companyService.remove(+id);
    if (result) {
      return {
        status: 'success',
        message: `Company with id ${id} has been deleted.`,
      };
    } else {
      return {
        status: 'failed',
        message: `Can't delete company with id ${id}`,
      };
    }
  }
}
