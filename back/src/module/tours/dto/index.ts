import {
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
    imageIds: number[];

    @IsInt()
    @IsOptional()
    categoryId?: number;
}

export class UpdateTourDTO {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    nameDirectionRu?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    nameDirectionUz?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    nameDirectionEn?: string;

    @IsInt()
    @IsOptional()
    @IsNotEmpty()
    durationDays?: number;

    @IsInt()
    @IsOptional()
    durationNights?: number;

    @IsInt()
    @IsOptional()
    @IsNotEmpty()
    price?: number;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    descriptionRu?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    descriptionUz?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    descriptionEn?: string;

    @IsArray()
    @IsOptional()
    @IsNotEmpty()
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

    @IsOptional()
    id?: string;
}
