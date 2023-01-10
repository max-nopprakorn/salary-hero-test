import { Body, Controller, Get, HttpStatus, Post, Response, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/auth.dto';
import { JWTAuthGuard } from './jwt.guard';
import { RoleGuard } from './role.guard';
import { Roles } from './roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Response() res, @Body() authenticarteDto: AuthenticateDto) {
    try {
      const response = this.authService.authenticate(authenticarteDto);
      return res.status(HttpStatus.OK).json({ response });
    } catch (e) {
      return res.status(e.status).json(e.response);
    }
  }

  @ApiBearerAuth()
  @Roles('SALARY_HERO')
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Get()
  get() {
    return {hello:"WORLD!"}
  }
}
