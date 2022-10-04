import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const openApiConfig = new DocumentBuilder()
    .setTitle('Animes documentation')
    .setDescription('The animes API description')
    .setVersion('1.0')
    .addTag('animes')
    .build();
  const openApiInstance = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup('api', app, openApiInstance);

  await app.listen(3000);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
