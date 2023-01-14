import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ClientAdminService } from './client-admin.service';
import { ClientAdminDto, UpdateCLientAdminDto } from './dto/client-admin.dto';

@Controller('clientAdmins')
@ApiTags('clientAdmins')
export class ClientAdminController {
  constructor(private readonly clientAdminService: ClientAdminService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('HERO')
  create(@Body() createClientAdminDto: ClientAdminDto) {
    return this.clientAdminService.create(createClientAdminDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('HERO')
  findAll() {
    return this.clientAdminService.findAll();
  }

  @Get('findAllByCompanyId/:companyId')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('HERO')
  findAllByCompanyId(@Param('companyId' ) companyId: string) {
    return this.clientAdminService.findAllByCompanyId(+companyId)
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('HERO')
  findOne(@Param('id') id: string) {
    return this.clientAdminService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('HERO')
  update(@Param('id') id: string, @Body() updateClientAdminDto:UpdateCLientAdminDto) {
    return this.clientAdminService.update(+id, updateClientAdminDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('HERO')
  remove(@Param('id') id: string) {
    return this.clientAdminService.remove(+id);
  }
}
