import { BadRequestException, Injectable } from '@nestjs/common';
import { response } from 'express';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

import { SendAppDTO } from './dto';

@Injectable()
export class BotService {
    constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

    sendApp(body: SendAppDTO): any {
        const sendBody = `
        Заявка на ${body.tourName ? 'тур' : 'визу'}\n
		Имя: ${body.name}
		Номер: ${body.phone}
		Почта: ${body.email}
		${body.tourName ? `Тур: ${body.tourName}` : ''}
		${body.visaName ? `Виза: ${body.visaName}` : ''}
		`;

        try {
            this.bot.telegram.sendMessage('@tht_visa_updates', sendBody);
            return response.status(200);
        } catch (e) {
            throw new BadRequestException(e);
        }
    }
}
