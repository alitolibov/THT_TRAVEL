import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {EmployeesService} from "./employees.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateEmployeeDTO} from "./dto";

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    createEmployee(@Body() body: any, @UploadedFile() file: any) {

    }
}
