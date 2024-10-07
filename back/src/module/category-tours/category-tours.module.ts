import { Module } from '@nestjs/common';
import { CategoryToursController } from './category-tours.controller';
import { CategoryToursService } from './category-tours.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryTours } from './model/category-tours.model';

@Module({
    imports: [SequelizeModule.forFeature([CategoryTours])],
    controllers: [CategoryToursController],
    providers: [CategoryToursService],
})
export class CategoryToursModule {}
