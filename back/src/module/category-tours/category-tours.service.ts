import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryTours } from './model/category-tours.model';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dto';
import { QuerySearchDTO } from '../../types/dtos.global';
import { IPaginatedResponse } from '../../types';
import { createQueryParams } from '../../utils/querySearch';
import { response } from 'express';

@Injectable()
export class CategoryToursService {
    constructor(
        @InjectModel(CategoryTours)
        private readonly categoryRepository: typeof CategoryTours,
    ) {}

    async createCategory(dto: CreateCategoryDTO): Promise<CategoryTours> {
        if (!dto.priority || dto.priority == 0) {
            const quantityItems = await this.categoryRepository.count();
            dto.priority = quantityItems + 1;
        }

        return this.categoryRepository.create({
            name: dto.name,
            priority: dto.priority,
        });
    }

    async findAllCategories(
        params: QuerySearchDTO,
    ): Promise<IPaginatedResponse<CategoryTours>> {
        const searchFields = ['name'];
        const queryParams = createQueryParams(params, searchFields);

        const { count, rows } = await this.categoryRepository.findAndCountAll({
            ...queryParams,
        });

        return {
            total: count,
            data: rows,
            skip: queryParams.offset,
            limit: queryParams.limit,
        };
    }

    async findById(id: number): Promise<CategoryTours> {
        if (!Number.isInteger(id) || id <= 0) {
            throw new BadRequestException(`Invalid ID: ${id}`);
        }

        try {
            return await this.categoryRepository.findOne({ where: { id } });
        } catch (error) {
            if (error.status === 404) {
                throw new NotFoundException(error.response.message);
            }
            throw new InternalServerErrorException(
                'An error occurred while retrieving the category',
            );
        }
    }

    async deleteCategory(id: number) {
        try {
            await this.categoryRepository.destroy({ where: { id } });
            return response.status(200);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async updateCategory(id: number, dto: UpdateCategoryDTO) {
        const body = { ...dto };

        delete body.updatedAt;
        delete body.createdAt;

        if (!Object.keys(body).length) {
            throw new BadRequestException('Nothing was sent to the body');
        }

        const category = await this.findById(id);

        if (!category) {
            throw new NotFoundException(`Category with id ${id} not found`);
        }

        if (body.priority == 0) {
            body.priority = await this.categoryRepository.count();
        }

        return category.update(body);
    }
}
