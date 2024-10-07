import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsOptional()
    priority: number;
}

export class UpdateCategoryDTO {
    @IsString()
    @IsOptional()
    name?: string;

    @IsInt()
    @IsOptional()
    priority?: number;

    @IsOptional()
    createdAt?: string;

    @IsOptional()
    updatedAt?: string;
}
