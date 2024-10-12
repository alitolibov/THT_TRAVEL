import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Settings } from './model/settings.model';
import { UpdateSettingsDTO } from './dto';

@Injectable()
export class SettingsService {
    constructor(
        @InjectModel(Settings)
        private readonly settingsRepository: typeof Settings,
    ) {}

    async getSettings(): Promise<Settings> {
        let settings = await this.settingsRepository.findOne();

        if (!settings) {
            settings = await this.settingsRepository.create({
                aboutUsRu: null,
                aboutUsUz: null,
                aboutUsEn: null,
                yearInTourism: null,
                readyTours: null,
                clients: null,
                sales: null,
                phoneFirst: null,
                phoneSecond: null,
                instagram: null,
                telegram: null,
                mail: null,
            });
        }

        return settings;
    }

    async updateSettings(body: UpdateSettingsDTO): Promise<Settings> {
        const settings = await this.getSettings();

        return settings.update(body);
    }
}
