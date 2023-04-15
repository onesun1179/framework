import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { MessageService } from '@modules/message/service';

@Catch(ValidationError)
export class ValidationErrorFilter implements ExceptionFilter {
  constructor(private ms: MessageService) {}
  async catch(exception: ValidationError, host: ArgumentsHost) {
    console.log({
      exception,
    });
    return exception;
  }
}
