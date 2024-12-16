import {
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsUrl,
} from 'class-validator';

export class UpdateSettingsDTO {
    @IsString()
    @IsNotEmpty()
    aboutUsRu: string;

    @IsString()
    @IsNotEmpty()
    aboutUsUz: string;

    @IsString()
    @IsNotEmpty()
    aboutUsEn: string;

    @IsInt()
    @IsNotEmpty()
    yearInTourism: number;

    @IsInt()
    @IsNotEmpty()
    readyTours: number;

    @IsInt()
    @IsNotEmpty()
    clients: number;

    @IsInt()
    @IsNotEmpty()
    sales: number;

    @IsPhoneNumber('UZ')
    @IsNotEmpty()
    phoneFirst: string;

    @IsPhoneNumber('UZ')
    @IsOptional()
    @IsNotEmpty()
    phoneSecond?: string;

    @IsUrl()
    @IsNotEmpty()
    instagram: string;

    @IsUrl()
    @IsNotEmpty()
    telegram: string;

    @IsEmail()
    @IsNotEmpty()
    mail: string;

    @IsOptional()
    createdAt?: string;

    @IsOptional()
    updatedAt?: string;

    @IsOptional()
    id?: string;
}
