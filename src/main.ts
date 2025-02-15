import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "https://ihs-client.onrender.com"
    ]
  });
  await app.listen(3000);
}
bootstrap();
