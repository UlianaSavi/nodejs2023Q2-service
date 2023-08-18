import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { SERVER_PORT } from './constants';
import * as yaml from 'yamljs';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/exception.filter';
import { CustomLoggerService } from './Logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(new CustomLoggerService());

  const swaggerDocument = yaml.load('doc/api.yaml');
  SwaggerModule.setup('doc', app, swaggerDocument);

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(+process.env.PORT || SERVER_PORT);
}
bootstrap();
