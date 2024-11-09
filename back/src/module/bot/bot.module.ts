import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';

import { BotController } from './bot.controller';
import { BotService } from './bot.service';

@Module({
    imports: [
        TelegrafModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                token: configService.get('botToken'),
            }),
        }),
    ],
    controllers: [BotController],
    providers: [BotService],
})
export class BotModule {}
