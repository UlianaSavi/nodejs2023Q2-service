import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SERVER_PORT } from './constants';
import * as yaml from 'yamljs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerDocument = yaml.load('doc/api.yaml');

  SwaggerModule.setup('doc', app, swaggerDocument);

  await app.listen(+process.env.PORT || SERVER_PORT);
}
bootstrap();
