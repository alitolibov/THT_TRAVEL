import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Tour } from './model/tours.model';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';

@Module({
    imports: [SequelizeModule.forFeature([Tour])],
    controllers: [ToursController],
    providers: [ToursService],
})
export class ToursModule {}
