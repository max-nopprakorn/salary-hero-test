import { IsString, IsNotEmpty } from 'class-validator';
import { User } from 'src/user/user.entity';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export interface TokenResponse {
  user: User;
  token: string;
}
