import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeController } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRoleService } from './user-role.service';

@ApiExcludeController(true)
@Controller('userRoles')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles('HERO')
  findAll() {
    return this.userRoleService.findAll();
  }
}
