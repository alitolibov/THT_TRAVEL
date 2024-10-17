import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './module/app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    });
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            forbidNonWhitelisted: true,
            whitelist: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    app.enableCors();
    await app.listen(3030);
}
bootstrap();
