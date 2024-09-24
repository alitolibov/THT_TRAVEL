import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Employee} from "./model/employee.model";
import { UploadsModule } from "../uploads/uploads.module";

@Module({
  imports: [
      SequelizeModule.forFeature([Employee]),
      UploadsModule
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService]
})
export class EmployeesModule {}
