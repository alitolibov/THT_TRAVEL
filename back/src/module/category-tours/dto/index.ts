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
    @IsNotEmpty()
    nameRu?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    nameUz?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    nameEn?: string;

    @IsInt()
    @IsOptional()
    priority?: number;

    @IsOptional()
    createdAt?: string;

    @IsOptional()
    updatedAt?: string;

    @IsOptional()
    id?: string;
}
