import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignInDTO {
    @MinLength(8)
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}
