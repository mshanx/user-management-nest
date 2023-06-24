import { ExceptionFilter } from '@nestjs/common';
import { InternalServerError, InvalidArgumentsError } from './index';
import { HttpException, BadRequestException } from '@nestjs/common/exceptions';

export class ErrorHandler implements ExceptionFilter {
  catch(err, host) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (err instanceof BadRequestException) {
      err = new InvalidArgumentsError(err.message);
    }

    if (!(err instanceof HttpException)) {
      err = new InternalServerError('[UNHANDLED ERROR] ' + JSON.stringify(err.stack));
    }

    console.error(`${err.name}: ${err.stack}`);

    if (err instanceof InternalServerError) {
      err.message = 'Something Went Wrong';
    }

    const status = err.getStatus ? err.getStatus() : 400;

    response.status(status).json({
      statusCode: status,
      message   : err.message,
    });
  }
}