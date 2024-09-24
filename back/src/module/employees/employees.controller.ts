import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import {EmployeesService} from "./employees.service";
import {CreateEmployeeDTO} from "./dto";
import { JwtGuards } from "../auth/guards/jwt.guards";

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {}

    @Post()
    @UseGuards(JwtGuards)
    createEmployee(@Body() dto: CreateEmployeeDTO) {
        return this.employeesService.createEmployee(dto);
    }

    @Get()
    getEmployees() {
        return this.employeesService.fetchEmployees();
    }
}
