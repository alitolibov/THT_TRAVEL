import { Module } from '@nestjs/common';
import { CategoryToursController } from './category-tours.controller';
import { CategoryToursService } from './category-tours.service';

@Module({
  controllers: [CategoryToursController],
  providers: [CategoryToursService]
})
export class CategoryToursModule {}
