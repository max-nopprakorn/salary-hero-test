import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientAdminService } from './client-admin.service';

@Controller('clientAdmins')
@ApiTags('clientAdmins')
export class ClientAdminController {
  constructor(private readonly clientAdminService: ClientAdminService) {}

  @Post()
  create(@Body() createClientAdminDto) {
    return this.clientAdminService.create(createClientAdminDto);
  }

  @Get()
  findAll() {
    return this.clientAdminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientAdminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientAdminDto) {
    return this.clientAdminService.update(+id, updateClientAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientAdminService.remove(+id);
  }
}
