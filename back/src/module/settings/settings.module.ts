import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Settings } from './model/settings.model';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
    imports: [SequelizeModule.forFeature([Settings])],
    controllers: [SettingsController],
    providers: [SettingsService],
})
export class SettingsModule {}
