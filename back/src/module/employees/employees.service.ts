import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './model/employee.model';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from './dto';
import { Upload } from '../uploads/model/upload.model';
import { UploadsService } from '../uploads/uploads.service';
import { response } from 'express';
import { QuerySearchDTO } from '../../types/dtos.global';
import { createQueryParams } from '../../utils/querySearch';
import { IPaginatedResponse } from '../../types';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectModel(Employee)
        private readonly employeesRepository: typeof Employee,
        private readonly uploadService: UploadsService,
    ) {}

    async createEmployee(dto: CreateEmployeeDTO) {
        const image = await this.uploadService.findById(dto.imageId);
        if (!image) {
            throw new BadRequestException(`Wrong imageId ${dto.imageId}`);
        }
        return this.employeesRepository.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            position: dto.position,
            phone: dto.phone,
            instagram: dto.instagram,
            telegram: dto.telegram,
            imageId: dto.imageId,
        });
    }

    async findById(id: number): Promise<Employee> {
        if (!Number.isInteger(id) || id <= 0) {
            throw new BadRequestException(`Invalid ID: ${id}`);
        }

        try {
            return await this.employeesRepository.findOne({
                where: { id },
                include: { model: Upload, required: false },
            });
        } catch (error) {
            if (error.status === 404) {
                throw new NotFoundException(error.response.message);
            }
            throw new InternalServerErrorException(
                'An error occurred while retrieving the employee',
            );
        }
    }

    async findAllEmployees(
        params: QuerySearchDTO,
    ): Promise<IPaginatedResponse<Employee>> {
        const searchFields = ['firstName', 'lastName', 'position', 'phone'];
        const queryParams = createQueryParams(params, searchFields);

        const { count, rows } = await this.employeesRepository.findAndCountAll({
            ...queryParams,
            include: {
                model: Upload,
                required: false,
            },
        });

        return {
            total: count,
            data: rows,
            skip: queryParams.offset,
            limit: queryParams.limit,
        };
    }

    async updateEmployee(id: number, dto: UpdateEmployeeDTO) {
        const body = { ...dto };

        delete body.updatedAt;
        delete body.createdAt;

        if (!Object.keys(body).length) {
            throw new BadRequestException('Nothing was sent to the body');
        }

        const employee = await this.findById(id);

        if (!employee) {
            throw new NotFoundException(`Employee with id ${id} not found`);
        }

        if (body.imageId) {
            const image = await this.uploadService.findById(body.imageId);
            if (!image) {
                throw new BadRequestException(`Wrong imageId ${body.imageId}`);
            }
        }

        return employee.update(body);
    }

    async deleteEmployee(id: number) {
        try {
            await this.employeesRepository.destroy({ where: { id } });
            return response.status(200);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
