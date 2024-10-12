import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsUrl,
} from 'class-validator';

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

    @IsNotEmpty()
    @IsInt()
    imageId: number;
}

export class UpdateEmployeeDTO {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    firstName?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    lastName?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    position?: string;

    @IsPhoneNumber('UZ')
    @IsOptional()
    @IsNotEmpty()
    phone?: string;

    @IsUrl()
    @IsOptional()
    @IsNotEmpty()
    instagram?: string;

    @IsUrl()
    @IsOptional()
    @IsNotEmpty()
    telegram?: string;

    @IsOptional()
    @IsInt()
    @IsNotEmpty()
    imageId?: number;

    @IsOptional()
    createdAt?: string;

    @IsOptional()
    image?: any;

    @IsOptional()
    updatedAt?: string;
}
