import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeController } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RoleDto } from './dto/role.dto';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@ApiExcludeController(true)
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('HERO')
  async create(@Body() roleDto:RoleDto){
    return await this.roleService.create(roleDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('HERO')
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('HERO')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('HERO')
  update(@Param('id') id: string, @Body() updateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('HERO')
  async remove(@Param('id') id: string) {
    const result = await this.roleService.remove(+id);
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
