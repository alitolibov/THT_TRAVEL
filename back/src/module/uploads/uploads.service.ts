import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

import { Upload } from './model/upload.model';

@Injectable()
export class UploadsService {
    constructor(
        @InjectModel(Upload) private readonly uploadRepository: typeof Upload,
        private readonly configService: ConfigService,
    ) {}

    async createFile(files: Express.Multer.File[]) {
        const filesWithUrl = files.map((file) => ({
            ...file,
            path: this.configService.get('imagesUrl') + file.path,
        }));

        try {
            return await Promise.all(
                filesWithUrl.map((file) =>
                    this.uploadRepository.create({
                        filename: file.filename,
                        size: file.size,
                        path: file.path,
                        originalname: file.originalname,
                    }),
                ),
            );
        } catch (error) {
            throw new Error('Failed to save files: ' + error.message);
        }
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
            return response.status(200);
        } catch (e) {
            throw new InternalServerErrorException('Error while deleting', e);
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
