import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './configuration/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*', methods: '*' });
  app.setGlobalPrefix('cidenet/api');
  initSwagger(app);
  await app.listen(3000);
}
bootstrap();
