import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { SERVER_PORT } from './constants';
import * as yaml from 'yamljs';
import { AppModule } from './app.module';
import { CustomLoggerService } from './Logger/logger.service';
import { CustomExceptionFilter } from './utils/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger:
      process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'usual'
        ? ['log', 'debug', 'error', 'verbose', 'warn']
        : ['error', 'warn'],
  });

  app.useLogger(new CustomLoggerService());
  app.useGlobalFilters(new CustomExceptionFilter());

  const swaggerDocument = yaml.load('doc/api.yaml');
  SwaggerModule.setup('doc', app, swaggerDocument);

  await app.listen(+process.env.PORT || SERVER_PORT);
}
bootstrap();
