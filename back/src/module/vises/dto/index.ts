import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateVisaDTO {
    @IsString()
    @IsNotEmpty()
    nameVisaUz: string;

    @IsString()
    @IsNotEmpty()
    nameVisaRu: string;

    @IsString()
    @IsNotEmpty()
    nameVisaEn: string;

    @IsNumber()
    @IsNotEmpty()
    reviewPeriods: number;

    @IsString()
    @IsNotEmpty()
    descriptionUz: string;

    @IsString()
    @IsNotEmpty()
    descriptionRu: string;

    @IsString()
    @IsNotEmpty()
    descriptionEn: string;

    @IsString()
    @IsNotEmpty()
    locationUz: string;

    @IsString()
    @IsNotEmpty()
    locationRu: string;

    @IsString()
    @IsNotEmpty()
    locationEn: string;

    @IsNumber()
    @IsNotEmpty()
    imageId: number;
}

export class UpdateVisaDTO {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    nameVisaUz?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    nameVisaRu?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    nameVisaEn?: string;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    reviewPeriods?: number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    descriptionUz?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    descriptionRu?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    descriptionEn?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    locationUz?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    locationRu?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    locationEn?: string;

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

    @IsOptional()
    id?: string;
}
