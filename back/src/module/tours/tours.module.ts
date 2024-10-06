import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tour } from './model/tours.model';
import { UploadsModule } from '../uploads/uploads.module';

@Module({
    imports: [SequelizeModule.forFeature([Tour])],
    controllers: [ToursController],
    providers: [ToursService],
})
export class ToursModule {}
