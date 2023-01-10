import { Injectable, NotFoundException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { AuthenticateDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  users = [
    {
      id: 1,
      userName: 'hero',
      password: '1234',
      role: 'SALARY_HERO',
    },
    {
      id: 2,
      userName: 'admin',
      password: '1234',
      role: 'CLIENT_ADMIN',
    },
    {
      id: 3,
      userName: 'employee',
      password: '1234',
      role: 'EMPLOYEE',
    },
  ];

  authenticate(authenticateDto: AuthenticateDto) {
    const user = this.users.find(
      (u) =>
        u.userName === authenticateDto.userName &&
        u.password === authenticateDto.password,
    );

    if (!user) throw new NotFoundException('incorrect username/password')

    const token = sign({...user},'salary-hero')

    return {token, user }
  }
}
