import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserCreateDTO {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(8)
    password: string;
}
