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
    nameDirection: string;

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
    description: string;

    @IsArray()
    @IsNotEmpty()
    @ArrayMaxSize(10)
    imageIds: number[];
}

export class UpdateTourDTO {
    @IsString()
    @IsOptional()
    nameDirection?: string;

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
    description?: string;

    @IsArray()
    @IsOptional()
    @ArrayMaxSize(10)
    imageIds: number[];
}
