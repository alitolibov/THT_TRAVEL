import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tour } from './model/tours.model';
import { CreateTourDTO, UpdateTourDTO } from './dto';
import { Upload } from '../uploads/model/upload.model';
import { QuerySearchDTO } from '../../types/dtos.global';
import { createQueryParams } from '../../utils/querySearch';
import { IPaginatedResponse } from '../../types';
import { response } from 'express';

@Injectable()
export class ToursService {
    constructor(
        @InjectModel(Tour) private readonly tourRepository: typeof Tour,
    ) {}

    async createTour(tourDTO: CreateTourDTO) {
        const tour = await this.tourRepository.create({
            nameDirection: tourDTO.nameDirection,
            durationDays: tourDTO.durationDays,
            durationNights: tourDTO.durationNights || null,
            price: tourDTO.price,
            description: tourDTO.description,
            categoryId: tourDTO.categoryId || null,
        });

        await tour.$set('images', tourDTO.imageIds);
        return tour;
    }

    async findAllTours(
        params: QuerySearchDTO,
    ): Promise<IPaginatedResponse<Tour>> {
        const searchFields = ['nameDirection', 'price', 'description'];
        const queryParams = createQueryParams(params, searchFields);

        const { count, rows } = await this.tourRepository.findAndCountAll({
            ...queryParams,
            include: {
                model: Upload,
                required: false,
                through: {
                    attributes: [],
                },
            },
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
                include: {
                    model: Upload,
                    required: false,
                    through: { attributes: [] },
                },
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

        delete body.updatedAt;
        delete body.createdAt;
        delete body.images;

        if (!Object.keys(body).length) {
            throw new BadRequestException('Nothing was sent to the body');
        }

        const tour = await this.findById(id);

        if (!tour) {
            throw new NotFoundException(`Tour with id ${id} not found`);
        }

        return tour.update(body);
    }
}
