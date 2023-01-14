import { Body, Controller, HttpStatus, Post, Response } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';

@Controller('auth')
@ApiTags('auth')
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
}
