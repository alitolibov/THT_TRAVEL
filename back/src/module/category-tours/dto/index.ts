import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDTO {
    @IsString()
    @IsNotEmpty()
    nameRu: string;

    @IsString()
    @IsNotEmpty()
    nameUz: string;

    @IsString()
    @IsNotEmpty()
    nameEn: string;

    @IsInt()
    @IsOptional()
    priority: number;
}

export class UpdateCategoryDTO {
    @IsString()
    @IsOptional()
    nameRu?: string;

    @IsString()
    @IsOptional()
    nameUz?: string;

    @IsString()
    @IsOptional()
    nameEn?: string;

    @IsInt()
    @IsOptional()
    priority?: number;

    @IsOptional()
    createdAt?: string;

    @IsOptional()
    updatedAt?: string;
}
