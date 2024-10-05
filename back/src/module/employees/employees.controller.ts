import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import {
    CreateEmployeeDTO,
    FilterEmployeesDTO,
    UpdateEmployeeDTO,
} from './dto';
import { JwtGuards } from '../auth/guards/jwt.guards';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {}

    @Get()
    findByQueryParams(@Query() params: FilterEmployeesDTO) {
        return this.employeesService.findAllEmployees(params);
    }

    @Get(':id')
    getEmployeeById(@Param('id') id: number) {
        return this.employeesService.findById(id);
    }

    @Post()
    @UseGuards(JwtGuards)
    createEmployee(@Body() dto: CreateEmployeeDTO) {
        return this.employeesService.createEmployee(dto);
    }

    @Patch(':id')
    @UseGuards(JwtGuards)
    updateEmployee(@Param('id') id: number, @Body() dto: UpdateEmployeeDTO) {
        return this.employeesService.updateEmployee(id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtGuards)
    deleteEmployee(@Param('id') id: number) {
        return this.employeesService.deleteEmployee(id);
    }
}
