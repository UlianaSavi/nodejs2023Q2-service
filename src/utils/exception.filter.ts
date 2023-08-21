import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomLoggerService } from 'src/Logger/logger.service';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  private logger = new CustomLoggerService();

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // logging is implemented for uncaughtException && unhandledRejection events
    this.logger.log(
      `Custom Exception Filter catch error with status code ${status} !`,
    );

    this.logger.uncaughError(status);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
