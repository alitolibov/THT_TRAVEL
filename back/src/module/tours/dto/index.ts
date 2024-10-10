import {
    ArrayMaxSize,
    IsArray,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateTourDTO {
    @IsString()
    @IsNotEmpty()
    nameDirectionRu: string;

    @IsString()
    @IsNotEmpty()
    nameDirectionUz: string;

    @IsString()
    @IsNotEmpty()
    nameDirectionEn: string;

    @IsInt()
    @IsNotEmpty()
    durationDays: number;

    @IsInt()
    @IsOptional()
    durationNights?: number;

    @IsInt()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    descriptionRu: string;

    @IsString()
    @IsNotEmpty()
    descriptionUz: string;

    @IsString()
    @IsNotEmpty()
    descriptionEn: string;

    @IsArray()
    @IsNotEmpty()
    @ArrayMaxSize(10)
    imageIds: number[];

    @IsInt()
    @IsOptional()
    categoryId?: number;
}

export class UpdateTourDTO {
    @IsString()
    @IsOptional()
    nameDirectionRu?: string;

    @IsString()
    @IsOptional()
    nameDirectionUz?: string;

    @IsString()
    @IsOptional()
    nameDirectionEn?: string;

    @IsInt()
    @IsOptional()
    durationDays?: number;

    @IsInt()
    @IsOptional()
    durationNights?: number;

    @IsInt()
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    descriptionRu?: string;

    @IsString()
    @IsOptional()
    descriptionUz?: string;

    @IsString()
    @IsOptional()
    descriptionEn?: string;

    @IsArray()
    @IsOptional()
    @ArrayMaxSize(10)
    imageIds: number[];

    @IsInt()
    @IsOptional()
    categoryId?: number;

    @IsOptional()
    createdAt?: string;

    @IsOptional()
    images?: any;

    @IsOptional()
    categoryTour?: any;

    @IsOptional()
    updatedAt?: string;
}
