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
import { Upload } from '../uploads/model/upload.model';
import { UploadsService } from '../uploads/uploads.service';
import { CreateVisaDTO, UpdateVisaDTO } from './dto';
import { Visa } from './model/vises.model';

@Injectable()
export class VisesService {
    constructor(
        @InjectModel(Visa) private readonly visaRepository: typeof Visa,
        private readonly uploadService: UploadsService,
    ) {}

    async createVisa(dto: CreateVisaDTO) {
        const image = await this.uploadService.findById(dto.imageId);
        if (!image) {
            throw new BadRequestException(`Wrong imageId ${dto.imageId}`);
        }
        return this.visaRepository.create({
            nameVisaUz: dto.nameVisaUz,
            nameVisaRu: dto.nameVisaRu,
            nameVisaEn: dto.nameVisaEn,
            reviewPeriods: dto.reviewPeriods,
            descriptionUz: dto.descriptionUz,
            descriptionRu: dto.descriptionRu,
            descriptionEn: dto.descriptionEn,
            locationUz: dto.locationUz,
            locationRu: dto.locationRu,
            locationEn: dto.locationEn,
            imageId: dto.imageId,
        });
    }

    async findById(id: number): Promise<Visa> {
        if (!Number.isInteger(id) || id <= 0) {
            throw new BadRequestException(`Invalid ID: ${id}`);
        }

        try {
            return await this.visaRepository.findOne({
                where: { id },
                include: { model: Upload, required: false },
            });
        } catch (error) {
            if (error.status === 404) {
                throw new NotFoundException(error.response.message);
            }
            throw new InternalServerErrorException(
                'An error occurred while retrieving the visa',
            );
        }
    }

    async findAllVises(
        params: QuerySearchDTO,
    ): Promise<IPaginatedResponse<Visa>> {
        const searchFields = [
            'nameVisaUz',
            'nameVisaRu',
            'nameVisaEn',
            'locationUz',
            'locationRu',
            'locationEn',
        ];
        const queryParams = createQueryParams(params, searchFields);

        const { count, rows } = await this.visaRepository.findAndCountAll({
            ...queryParams,
            include: {
                model: Upload,
                required: false,
            },
            distinct: true,
        });

        return {
            total: count,
            data: rows,
            skip: queryParams.offset,
            limit: queryParams.limit,
        };
    }

    async updateVisa(id: number, dto: UpdateVisaDTO) {
        const body = { ...dto };

        delete body.updatedAt;
        delete body.createdAt;

        if (!Object.keys(body).length) {
            throw new BadRequestException('Nothing was sent to the body');
        }

        const visa = await this.findById(id);

        if (!visa) {
            throw new NotFoundException(`Visa with id ${id} not found`);
        }

        if (body.imageId) {
            const image = await this.uploadService.findById(body.imageId);
            if (!image) {
                throw new BadRequestException(`Wrong imageId ${body.imageId}`);
            }
        }

        return visa.update(body);
    }

    async deleteVisa(id: number) {
        try {
            await this.visaRepository.destroy({ where: { id } });
            return response.status(200);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
