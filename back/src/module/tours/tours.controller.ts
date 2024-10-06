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
import { JwtGuards } from '../auth/guards/jwt.guards';
import { CreateTourDTO, UpdateTourDTO } from './dto';
import { ToursService } from './tours.service';
import { QuerySearchDTO } from '../../types/dtos.global';

@Controller('tours')
export class ToursController {
    constructor(private readonly toursService: ToursService) {}

    @Post()
    @UseGuards(JwtGuards)
    createTour(@Body() body: CreateTourDTO) {
        return this.toursService.createTour(body);
    }

    @Get()
    getAllTours(@Query() params: QuerySearchDTO) {
        return this.toursService.findAllTours(params);
    }

    @Get(':id')
    getTourById(@Param('id') id: string | number) {
        return this.toursService.findById(Number(id));
    }

    @Delete(':id')
    @UseGuards(JwtGuards)
    deleteTour(@Param('id') id: string | number) {
        return this.toursService.deleteTour(Number(id));
    }

    @Patch(':id')
    @UseGuards(JwtGuards)
    updateEmployee(
        @Param('id') id: number | string,
        @Body() dto: UpdateTourDTO,
    ) {
        return this.toursService.updateTour(Number(id), dto);
    }
}
