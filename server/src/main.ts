import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';

const serverless = require("@vendia/serverless-express");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = process.env.PORT || 5000;
  await app.listen(port);
}

bootstrap();
