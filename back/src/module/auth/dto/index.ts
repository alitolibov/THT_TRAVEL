import {UserCreateDTO} from "../../users/dto";
import {IsEmail, IsNotEmpty, MinLength} from "class-validator";

export class SignUpDTO extends UserCreateDTO {}

export class SignInDTO {
    @MinLength(8)
    password: string

    @IsEmail()
    @IsNotEmpty()
    email: string
}