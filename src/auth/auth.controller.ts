import { Body, Controller, Get, HttpStatus, Post, Response, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { JWTAuthGuard } from './jwt.guard';
import { RoleGuard } from './role.guard';
import { Roles } from './roles.decorator';
import { AuthUser } from './user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  async signIn(@Response() res, @Body() signInDto: SignInDto) {
    try {
      const response = await this.authService.signIn(signInDto);
      return res.status(HttpStatus.OK).json({ response });
    } catch (e) {
      return res.status(e.status).json(e.response);
    }
  }

  @Post('signUp')
  async signUp(@Response() res, @Body() signUpDto: SignUpDto) {
    try {
      const response = await this.authService.signUp(signUpDto);
      return res.status(HttpStatus.OK).json({ response });
    } catch (e) {
      return res.status(e.status).json(e.response);
    }
  }



  @ApiBearerAuth()
  @Roles('SALARY_HERO')
  @UseGuards(JWTAuthGuard, RoleGuard)
  @Get()
  get(@AuthUser() user: any) {
    return {hello:"WORLD!"}
  }
}
