import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UploadsModule } from '../uploads/uploads.module';
import { Visa } from './model/vises.model';
import { VisesController } from './vises.controller';
import { VisesService } from './vises.service';

@Module({
    imports: [SequelizeModule.forFeature([Visa]), UploadsModule],
    controllers: [VisesController],
    providers: [VisesService],
})
export class VisesModule {}
