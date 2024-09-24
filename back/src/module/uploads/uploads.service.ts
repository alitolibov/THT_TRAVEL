import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Upload} from "./model/upload.model";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UploadsService {
    constructor(
      @InjectModel(Upload) private readonly uploadRepository: typeof Upload,
      private readonly configService: ConfigService
      ) {}

    async createFile(file: Express.Multer.File) {
        const {filename, size, path, originalname} = file;
        const pathWithUrl = this.configService.get('imagesUrl') + path
        return this.uploadRepository.create({
            filename,
            size,
            path: pathWithUrl,
            originalname
        })
    }

    removeImageById(id: number) {
        return this.uploadRepository.destroy({where: {id}})
    }

    findById(id: number) {
        return this.uploadRepository.findOne({where: {id}})
    }
}
