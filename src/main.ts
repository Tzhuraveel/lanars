import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';

import { SwaggerHelper } from '#common/helpers/swagger.helper';
import { APP_CONFIG_SERVICE } from '#config/app/app-config.constants';
import { AppConfigService } from '#config/app/app-config.service';

import { AppModule } from './app.module';

function initSwagger(app: INestApplication): void {
  const documentBuilder: DocumentBuilder = new DocumentBuilder()
    .setTitle('ProgGenius API')
    .setDescription('ProgGenius API Documentation')
    .addBearerAuth()
    .setVersion('1.0.0');

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerHelper.setDefaultResponses(document);
  SwaggerHelper.setExplodeQueryStyle(document);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      defaultModelExpandDepth: 1,
      persistAuthorization: true,
    },
  });
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  initSwagger(app);

  app.use(compression());

  const appConfigService = app.get<AppConfigService>(APP_CONFIG_SERVICE);

  await app.listen(appConfigService.port, () => {
    Logger.log(
      `Application is running on: http://localhost:${appConfigService.port}`,
    );
    Logger.log(
      `Swagger is available at: http://localhost:${appConfigService.port}/docs`,
    );
  });
}

bootstrap();
