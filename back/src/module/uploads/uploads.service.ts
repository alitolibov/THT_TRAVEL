import { Injectable, InternalServerErrorException } from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Upload} from "./model/upload.model";
import { ConfigService } from "@nestjs/config";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class UploadsService {
    constructor(
      @InjectModel(Upload) private readonly uploadRepository: typeof Upload,
      private readonly configService: ConfigService
      ) {}

    async createFile(file: Express.Multer.File) {
        console.log(file);
        const {filename, size, path, originalname} = file;
        const pathWithUrl = this.configService.get('imagesUrl') + path
        return this.uploadRepository.create({
            filename,
            size,
            path: pathWithUrl,
            originalname
        })
    }

    async removeImageById(id: number) {
        const filePath = path.resolve('./uploads/media', String(id)); // Преобразуем id в строку

        const deleteFile = new Promise((resolve, reject) => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve('successful');
            });
        });

        try {
            await deleteFile;
        } catch (error) {
            throw new InternalServerErrorException('Error while deleting')
        }

        return this.uploadRepository.destroy({ where: { filename: id } });
    }

    findById(id: number) {
        return this.uploadRepository.findOne({where: {id}})
    }
}
