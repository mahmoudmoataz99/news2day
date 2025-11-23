import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message: any = 'Internal server error';
    if (typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
      message = (exceptionResponse as any).message;
    }

    const apiResponse = {
      success: false,
      message: Array.isArray(message) ? message.join(', ') : message,
      data: null,
      errors: Array.isArray(message) ? message : [message],
    };

    response.status(status).json(apiResponse);
  }
}
