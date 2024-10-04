import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Employee} from "./model/employee.model";
import { CreateEmployeeDTO, FilterEmployeesDTO, UpdateEmployeeDTO } from "./dto";
import { Upload } from "../uploads/model/upload.model";
import { UploadsService } from "../uploads/uploads.service";
import { Op } from "sequelize";

@Injectable()
export class EmployeesService {
    constructor(
      @InjectModel(Employee) private readonly employeesRepository: typeof Employee,
      private readonly uploadService: UploadsService
    ) {}

    async createEmployee(dto: CreateEmployeeDTO) {
        const image = await this.uploadService.findById(dto.imageId);
        if(!image) {
            throw new BadRequestException(`Wrong imageId ${dto.imageId}`)
        }
        return this.employeesRepository.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            position: dto.position,
            phone: dto.phone,
            instagram: dto.instagram,
            telegram: dto.telegram,
            imageId: dto.imageId
        })
    }

    async findById(id: number): Promise<Employee> {
        if (!Number.isInteger(id) || id <= 0) {
            throw new BadRequestException(`Invalid ID: ${id}`);
        }

        try {
            const employee = await this.employeesRepository.findOne({
                where: { id },
                include: { model: Upload, required: false },
            });

            if (!employee) {
                throw new NotFoundException(`Employee with ID ${id} not found`);
            }

            return employee;
        } catch (error) {
            throw new InternalServerErrorException('An error occurred while retrieving the employee');
        }
    }

    async findAllEmployees(params: FilterEmployeesDTO) {
        const limit = Number(params.limit) || 10;
        const offset = Number(params.offset) || 0;
        const search = params.search || '';
        const order: [string, 'ASC' | 'DESC'][] = [];
        const date: Record<string, any> = { createdAt: {} };

        const whereCondition = search ? {
            [Op.or]: [
                { firstName: { [Op.iLike]: `%${search}%` } },
                { lastName: { [Op.iLike]: `%${search}%` } },
                { position: { [Op.iLike]: `%${search}%` } },
                { phone: { [Op.iLike]: `%${search}%` } }
            ],
        } : {};

        if (params.endDate) {
            date.createdAt[Op.lt] = params.endDate;
        }

        if (params.startDate) {
            date.createdAt[Op.gt] = params.startDate;
        }

        if (!params.startDate && !params.endDate) {
            delete date.createdAt;
        }

        if (params.sortBy) {
            for (const key in params.sortBy) {
                const direction = params.sortBy[key] == -1 ? 'DESC' : 'ASC';
                order.push([key, direction]);
            }
        }

        const {count, rows} = await this.employeesRepository.findAndCountAll({
            limit,
            offset,
            order: order.length ? order : [['createdAt', 'DESC']],
            where: {...whereCondition, ...date},
            include: {
                model: Upload,
                required: false
            }
        })

        return {
            total: count,
            data: rows,
            skip: offset,
            limit
        }
    }

    async updateEmployee(id: number, dto: UpdateEmployeeDTO) {
        const employee = await this.findById(id);

        if(dto.imageId) {
            const image = await this.uploadService.findById(dto.imageId);
            if(!image) {
                throw new BadRequestException(`Wrong imageId ${dto.imageId}`);
            }
        }

        return employee.update(dto);
    }
}
