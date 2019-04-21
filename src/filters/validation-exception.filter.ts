import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
}                              from '@nestjs/common';
import { ValidationException } from '../exceptions/validation.exception';

// TODO: Intentar reducir el código uniendo este filter con el de HTTP

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorMessage = exception.message;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: errorMessage,
      constrains: exception.constraints
    });
  }
}
