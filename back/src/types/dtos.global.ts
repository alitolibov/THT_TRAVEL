import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class QuerySearchDTO {
    @IsOptional()
    @IsInt()
    limit: number = 100;

    @IsOptional()
    @IsInt()
    offset: number = 0;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    sortBy?: Record<string, number>;

    @IsOptional()
    @IsDateString()
    startDate?: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;
}
