import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { User } from 'src/user/user.entity';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignUpDto {

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  companyId: number

}

export interface TokenResponse {

  user: User
  token: string
}
