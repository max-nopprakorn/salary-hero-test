import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RequestMoneyTransferDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

export class AddEmployeeDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  companyId: number;

  @IsNumber()
  salary: number;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  givenName: string;
}

export class EditEmployeeDto {

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  salary: number;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  givenName: string;
}
