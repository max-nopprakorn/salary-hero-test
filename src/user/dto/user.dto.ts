import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsArray()
    roles: string[]

    @IsNumber()
    @IsNotEmpty()
    companyId: number
}