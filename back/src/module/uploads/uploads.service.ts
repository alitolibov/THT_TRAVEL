import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Upload } from './model/upload.model';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UploadsService {
    constructor(
        @InjectModel(Upload) private readonly uploadRepository: typeof Upload,
        private readonly configService: ConfigService,
    ) {}

    async createFile(file: Express.Multer.File) {
        const { filename, size, path, originalname } = file;
        const pathWithUrl = this.configService.get('imagesUrl') + path;
        return this.uploadRepository.create({
            filename,
            size,
            path: pathWithUrl,
            originalname,
        });
    }

    async removeImageById(id: number) {
        const image = await this.findById(id);
        const filePath = path.resolve(
            './uploads/media',
            String(image.filename),
        );

        const deleteFile = new Promise((resolve, reject) => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve('successful');
            });
        });

        try {
            await Promise.all([
                deleteFile,
                this.uploadRepository.destroy({ where: { id } }),
            ]);
            return 'successful';
        } catch (error) {
            throw new InternalServerErrorException('Error while deleting');
        }
    }

    async findById(id: number) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new BadRequestException(`Invalid ID: ${id}`);
        }

        try {
            return await this.uploadRepository.findOne({ where: { id } });
        } catch (error) {
            if (error.status === 404) {
                throw new NotFoundException(error.response.message);
            }
            throw new InternalServerErrorException(
                'An error occurred while retrieving the image',
            );
        }
    }
}
