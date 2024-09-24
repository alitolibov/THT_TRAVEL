import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Upload} from "./model/upload.model";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [SequelizeModule.forFeature([Upload])],
  controllers: [UploadsController],
  providers: [UploadsService],
  exports: [UploadsService]
})
export class UploadsModule {}
