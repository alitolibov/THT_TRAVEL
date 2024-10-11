import { Module } from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';

import { UploadsModule } from '../uploads/uploads.module';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import {Employee} from './model/employee.model';

@Module({
  imports: [
      SequelizeModule.forFeature([Employee]),
      UploadsModule
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService]
})
export class EmployeesModule {}
