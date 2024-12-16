import {
    Controller,
    Delete,
    FileTypeValidator,
    ForbiddenException,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Post,
    Res,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import e from 'express';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as process from 'process';
import { Error } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import { JwtGuards } from '../auth/guards/jwt.guards';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
    constructor(private readonly uploadsService: UploadsService) {}

    @Post()
    @UseGuards(JwtGuards)
    @UseInterceptors(
        FilesInterceptor('image', 10, {
            storage: diskStorage({
                destination: './uploads/media',
                filename: (
                    req: e.Request,
                    file: Express.Multer.File,
                    callback: (error: Error | null, filename: string) => void,
                ) => {
                    const filename =
                        path.parse(file.originalname).name.replace(/\s/g, '') +
                        uuidv4();
                    const extension = path.parse(file.originalname).ext;

                    callback(null, `${filename}${extension}`);
                },
            }),
        }),
    )
    create(
        @UploadedFiles(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 10000000 }),
                    new FileTypeValidator({
                        fileType: /image\/(jpeg|png|webp|gif|svg\+xml)$/,
                    }),
                ],
            }),
        )
        files: Express.Multer.File[],
    ) {
        return this.uploadsService.createFile(files);
    }

    @Get('media/:id')
    async getImage(@Param('id') id: string, @Res() res) {
        const filePath = `${process.cwd()}/uploads/media/${id}`;

        if (fs.existsSync(filePath)) {
            return res.sendFile(filePath);
        }

        return res.status(404).send('File not found');
    }

    @Get(':id')
    async getImageById(@Param('id') id: number) {
        const image = await this.uploadsService.findById(Number(id));

        if (image) {
            return image;
        }

        throw new ForbiddenException('Image not found');
    }

    @Delete(':id')
    @UseGuards(JwtGuards)
    deleteImage(@Param('id') id: number) {
        return this.uploadsService.removeImageById(id);
    }
}
