import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { sign } from 'jsonwebtoken';
import { User } from 'src/user/user.entity';
import { SignInDto, SignUpDto, TokenResponse } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

const salt = 2;
const jwtSecret = 'salary-hero';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async signIn(signInDto: SignInDto): Promise<TokenResponse> {
    const hashedPassword = bcrypt.hashSync(signInDto.password, salt);
    const user = await this.userModel.findOne({
      where: {
        username: signInDto.username,
        password: hashedPassword,
      },
    });

    if (!user) throw new NotFoundException('incorrect username/password');

    const token = sign({ ...user }, jwtSecret);

    return { token, user };
  }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const hashedPassword = bcrypt.hashSync(signUpDto.password, salt);
    const param = {
      username: signUpDto.username,
      password: hashedPassword
    }
    const user = await this.userModel.create(param)
    return user
  }
}
