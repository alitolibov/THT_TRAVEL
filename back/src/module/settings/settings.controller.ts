import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';

import { JwtGuards } from '../auth/guards/jwt.guards';
import { UpdateSettingsDTO } from './dto';
import { Settings } from './model/settings.model';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    @Get()
    getSettings(): Promise<Settings> {
        return this.settingsService.getSettings();
    }

    @Patch()
    @UseGuards(JwtGuards)
    updateSettings(@Body() body: UpdateSettingsDTO): Promise<Settings> {
        return this.settingsService.updateSettings(body);
    }
}
