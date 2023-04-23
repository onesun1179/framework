import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidationPipe as NestJsValidationPipe } from '@nestjs/common/pipes';
import { MessageService } from '@modules/message/service/message.service';

@Injectable()
export class ValidationPipe extends NestJsValidationPipe {
  constructor(private messageService: MessageService) {
    super({
      transform: true,
      exceptionFactory(errors) {
        console.log(errors);

        return new BadRequestException(errors);
      },
    });
  }

  // exceptionFactory(errors: ValidationError[]) {
  //   console.log(errors);
  //   return true;
  // }
}
