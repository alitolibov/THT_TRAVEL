import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Upload} from "./model/upload.model";

@Module({
  imports: [SequelizeModule.forFeature([Upload])],
  controllers: [UploadsController],
  providers: [UploadsService]
})
export class UploadsModule {}
