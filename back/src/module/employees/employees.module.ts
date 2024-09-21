import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Employee} from "./model/employee.model";

@Module({
  imports: [
      SequelizeModule.forFeature([Employee])
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService]
})
export class EmployeesModule {}
