import { BadRequestException, Injectable } from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Employee} from "./model/employee.model";
import {CreateEmployeeDTO} from "./dto";
import { Upload } from "../uploads/model/upload.model";
import { UploadsService } from "../uploads/uploads.service";

@Injectable()
export class EmployeesService {
    constructor(
      @InjectModel(Employee) private readonly employeesRepository: typeof Employee,
      private readonly uploadService: UploadsService
    ) {}

    async createEmployee(dto: CreateEmployeeDTO) {
        const image = await this.uploadService.findById(dto.imageId);
        if(!image) {
            throw new BadRequestException('Wrong imageId')
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

    fetchEmployees() {
        return this.employeesRepository.findAll({
            include: {
                model: Upload,
                required: false
            }
        })
    }
}
