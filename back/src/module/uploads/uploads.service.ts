import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Upload} from "./model/upload.model";

@Injectable()
export class UploadsService {
    constructor(@InjectModel(Upload) private readonly uploadRepository: typeof Upload) {}

    async createFile(file: Express.Multer.File) {
        const {filename, size, path, originalname} = file;
        return this.uploadRepository.create({
            filename,
            size,
            path,
            originalname
        })
    }
}
