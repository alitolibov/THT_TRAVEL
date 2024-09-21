import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Employee} from "./model/employee.model";
import {CreateEmployeeDTO} from "./dto";

@Injectable()
export class EmployeesService {
    constructor(@InjectModel(Employee) private readonly employeesRepository: typeof Employee) {}

    createEmployee(dto: CreateEmployeeDTO) {

    }
}
