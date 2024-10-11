import {IsEmail, IsNotEmpty, MinLength} from 'class-validator';

import {UserCreateDTO} from '../../users/dto';

export class SignUpDTO extends UserCreateDTO {}

export class SignInDTO {
    @MinLength(8)
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}