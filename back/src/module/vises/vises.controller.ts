import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';

import { QuerySearchDTO } from '../../types/dtos.global';
import { JwtGuards } from '../auth/guards/jwt.guards';
import { CreateVisaDTO, UpdateVisaDTO } from './dto';
import { VisesService } from './vises.service';

@Controller('vises')
export class VisesController {
    constructor(private readonly visesService: VisesService) {}

    @Get()
    findByQueryParams(@Query() params: QuerySearchDTO) {
        return this.visesService.findAllVises(params);
    }

    @Get(':id')
    getVisaById(@Param('id') id: number) {
        return this.visesService.findById(id);
    }

    @Post()
    @UseGuards(JwtGuards)
    createVisa(@Body() dto: CreateVisaDTO) {
        return this.visesService.createVisa(dto);
    }

    @Patch(':id')
    @UseGuards(JwtGuards)
    updateVisa(@Param('id') id: number, @Body() dto: UpdateVisaDTO) {
        return this.visesService.updateVisa(id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtGuards)
    deleteVisa(@Param('id') id: number) {
        return this.visesService.deleteVisa(id);
    }
}
