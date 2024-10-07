import {
    IsDateString,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsUrl,
    MaxDate,
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
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    position?: string;

    @IsPhoneNumber('UZ')
    @IsOptional()
    phone?: string;

    @IsUrl()
    @IsOptional()
    instagram?: string;

    @IsUrl()
    @IsOptional()
    telegram?: string;

    @IsOptional()
    @IsInt()
    imageId?: number;

    @IsOptional()
    createdAt?: string;

    @IsOptional()
    image?: any;

    @IsOptional()
    updatedAt?: string;
}
