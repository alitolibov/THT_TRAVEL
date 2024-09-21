import {IsNotEmpty, IsPhoneNumber, IsString, IsUrl} from "class-validator";

export class CreateEmployeeDTO {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    position: string;

    @IsPhoneNumber('UZ')
    @IsNotEmpty()
    phone: string;

    @IsUrl()
    @IsNotEmpty()
    instagram: string;

    @IsUrl()
    @IsNotEmpty()
    telegram: string;
}