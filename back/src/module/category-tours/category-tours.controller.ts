import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';

import { QuerySearchDTO } from '../../types/dtos.global';
import { JwtGuards } from '../auth/guards/jwt.guards';
import { CategoryToursService } from './category-tours.service';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dto';

@Controller('category-tours')
export class CategoryToursController {
    constructor(private readonly categoryService: CategoryToursService) {}

    @Post()
    @UseGuards(JwtGuards)
    createCategory(@Body() dto: CreateCategoryDTO) {
        return this.categoryService.createCategory(dto);
    }

    @Get()
    getAllCategories(@Query() params: QuerySearchDTO) {
        return this.categoryService.findAllCategories(params);
    }

    @Get(':id')
    getTourById(@Param('id') id: string | number) {
        return this.categoryService.findById(Number(id));
    }

    @Delete(':id')
    @UseGuards(JwtGuards)
    deleteTour(@Param('id') id: string | number) {
        return this.categoryService.deleteCategory(Number(id));
    }

    @Patch(':id')
    @UseGuards(JwtGuards)
    updateEmployee(
        @Param('id') id: number | string,
        @Body() dto: UpdateCategoryDTO,
    ) {
        return this.categoryService.updateCategory(Number(id), dto);
    }
}
