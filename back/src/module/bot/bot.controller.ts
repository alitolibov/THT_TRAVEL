import { Body, Controller, Post } from '@nestjs/common';

import { BotService } from './bot.service';
import { SendAppDTO } from './dto';

@Controller('bot')
export class BotController {
    constructor(private readonly botService: BotService) {}

    @Post('send-application')
    sendApp(@Body() body: SendAppDTO) {
        return this.botService.sendApp(body);
    }
}
