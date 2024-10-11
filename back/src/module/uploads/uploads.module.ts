import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Upload } from './model/upload.model';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';

@Module({
    imports: [SequelizeModule.forFeature([Upload])],
    controllers: [UploadsController],
    providers: [UploadsService],
    exports: [UploadsService],
})
export class UploadsModule {}
