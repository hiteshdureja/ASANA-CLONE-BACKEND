import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponse, ModelError } from '../generated/models';

@Catch()
export class AsanaExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorResponse: ErrorResponse = {
      errors: [
        {
          message: 'An unexpected error occurred',
        } as ModelError,
      ],
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        errorResponse = {
          errors: [
            {
              message: exceptionResponse,
            } as ModelError,
          ],
        };
      } else if (typeof exceptionResponse === 'object') {
        const responseObj = exceptionResponse as any;
        
        // If it's already in Asana format, use it
        if (responseObj.errors && Array.isArray(responseObj.errors)) {
          errorResponse = responseObj as ErrorResponse;
        } else {
          // Convert NestJS error format to Asana format
          const message = responseObj.message || exception.message || 'An error occurred';
          const errors: ModelError[] = Array.isArray(message)
            ? message.map((msg: string) => ({ message: msg } as ModelError))
            : [{ message } as ModelError];

          errorResponse = { errors };
        }
      }
    } else if (exception instanceof Error) {
      errorResponse = {
        errors: [
          {
            message: exception.message || 'An unexpected error occurred',
          } as ModelError,
        ],
      };
    }

    // For 500 errors, add phrase (Asana uses this for support)
    if (status === HttpStatus.INTERNAL_SERVER_ERROR && errorResponse.errors?.[0]) {
      // Generate a simple phrase (in production, use a proper phrase generator)
      const phrase = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const firstError = errorResponse.errors[0] as any;
      if (firstError && typeof firstError === 'object') {
        firstError.phrase = phrase;
      }
    }

    response.status(status).json(errorResponse);
  }
}

