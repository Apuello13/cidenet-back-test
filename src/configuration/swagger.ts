import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const initSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Api Cidenet Swagger')
    .setDescription('Documentation of api of Cidenet Test')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });
};
