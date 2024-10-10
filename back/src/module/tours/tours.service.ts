import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { response } from 'express';

import { IPaginatedResponse } from '../../types';
import { QuerySearchDTO } from '../../types/dtos.global';
import { createQueryParams } from '../../utils/querySearch';
import { CategoryTours } from '../category-tours/model/category-tours.model';
import { Upload } from '../uploads/model/upload.model';
import { CreateTourDTO, UpdateTourDTO } from './dto';
import { Tour } from './model/tours.model';

@Injectable()
export class ToursService {
    constructor(
        @InjectModel(Tour) private readonly tourRepository: typeof Tour,
    ) {}

    async createTour(tourDTO: CreateTourDTO) {
        const tour = await this.tourRepository.create({
            nameDirectionRu: tourDTO.nameDirectionRu,
            nameDirectionUz: tourDTO.nameDirectionUz,
            nameDirectionEn: tourDTO.nameDirectionEn,
            durationDays: tourDTO.durationDays,
            durationNights: tourDTO.durationNights || 0,
            price: tourDTO.price,
            descriptionRu: tourDTO.descriptionRu,
            descriptionUz: tourDTO.descriptionUz,
            descriptionEn: tourDTO.descriptionEn,
            categoryId: tourDTO.categoryId || null,
        });

        await tour.$set('images', tourDTO.imageIds);
        return tour;
    }

    async findAllTours(
        params: QuerySearchDTO,
    ): Promise<IPaginatedResponse<Tour>> {
        const searchFields = ['nameDirection'];
        const queryParams = createQueryParams(params, searchFields);

        const { count, rows } = await this.tourRepository.findAndCountAll({
            ...queryParams,
            include: [
                {
                    model: Upload,
                    required: false,
                    through: { attributes: [] },
                },
                {
                    model: CategoryTours,
                    required: false,
                },
            ],
            distinct: true,
        });

        return {
            total: count,
            data: rows,
            skip: queryParams.offset,
            limit: queryParams.limit,
        };
    }

    async findById(id: number): Promise<Tour> {
        if (!Number.isInteger(id) || id <= 0) {
            throw new BadRequestException(`Invalid ID: ${id}`);
        }

        try {
            return await this.tourRepository.findOne({
                where: { id },
                include: [
                    {
                        model: Upload,
                        required: false,
                        through: { attributes: [] },
                    },
                    {
                        model: CategoryTours,
                        required: false,
                    },
                ],
            });
        } catch (error) {
            if (error.status === 404) {
                throw new NotFoundException(error.response.message);
            }
            throw new InternalServerErrorException(
                'An error occurred while retrieving the tour',
            );
        }
    }

    async deleteTour(id: number) {
        try {
            await this.tourRepository.destroy({ where: { id } });
            return response.status(200);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async updateTour(id: number, dto: UpdateTourDTO) {
        const body = { ...dto };

        if (!Object.keys(body).length) {
            throw new BadRequestException('Nothing was sent to the body');
        }

        const tour = await this.findById(id);

        if (!tour) {
            throw new NotFoundException(`Tour with id ${id} not found`);
        }

        if (body.imageIds.length) {
            await tour.$set('images', body.imageIds);
        }

        return tour.update(body);
    }
}
