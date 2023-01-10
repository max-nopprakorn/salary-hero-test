import { IsString, IsNotEmpty } from 'class-validator';

export class AuthenticateDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
