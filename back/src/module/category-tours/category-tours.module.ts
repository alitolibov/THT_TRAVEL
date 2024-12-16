import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CategoryToursController } from './category-tours.controller';
import { CategoryToursService } from './category-tours.service';
import { CategoryTours } from './model/category-tours.model';

@Module({
    imports: [SequelizeModule.forFeature([CategoryTours])],
    controllers: [CategoryToursController],
    providers: [CategoryToursService],
})
export class CategoryToursModule {}
