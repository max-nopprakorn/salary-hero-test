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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/company.dto';

@Controller('companies')
@ApiTags('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('HERO')
  async create(@Body() companyDto:CompanyDto): Promise<Company> {
    return await this.companyService.create(companyDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('HERO')
  async findAll() {
    return await this.companyService.findAll();
  }

  @Get('search')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('HERO')
  async searchByName(@Query('name') name: string) {
    return await this.companyService.searchByName(name);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('HERO')
  async findOne(@Param('id') id: string): Promise<Company> {
    return await this.companyService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('HERO')
  async update(
    @Param('id') id: string,
    @Body() companyDto:CompanyDto,
  ): Promise<Company> {
    return await this.companyService.update(+id, companyDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('HERO')
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
