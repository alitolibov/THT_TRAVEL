import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app/app.module';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    }
  }));
  app.enableCors();
  await app.listen(3030, '192.168.110.91');
}
bootstrap();
