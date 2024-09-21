import {
    Controller,
    Get, MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Post,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UploadsService} from "./uploads.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import e from "express";
import {Error} from "sequelize";
import * as path from "path";
import { v4 as uuidv4 } from 'uuid';
import * as process from "process";
import {JwtGuards} from "../auth/guards/jwt.guards";

@Controller('uploads')
export class UploadsController {
    constructor(private readonly uploadsService: UploadsService) {}

    @Post()
    @UseGuards(JwtGuards)
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads/media',
            filename: (req: e.Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) => {
                const filename = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
                const extension = path.parse(file.originalname).ext;

                callback(null, `${filename}${extension}`)
            }
        })
    }))
    create(@UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({maxSize: 10000000}),
            ]
        })
    ) file: Express.Multer.File) {
        return this.uploadsService.createFile(file)
    }

    @Get('/media/:id')
    getImage(@Param('id') id: string, @Res() res) {
        return res.sendFile(`${process.cwd()}/uploads/media/${id}`)
    }
}
