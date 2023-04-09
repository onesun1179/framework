import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { MessageService } from '@modules/message/services/message.service';
import { MsgCode } from '@modules/message/dto/msg-code';
import { GqlError } from '@common/errors/GqlError';
import { GqlErrorFilter } from '@common/filters/GqlErrorFilter';

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
  constructor(private ms: MessageService) {}
  async catch(exception: any, host: ArgumentsHost) {
    return new GqlErrorFilter(this.ms).catch(
      new GqlError(new MsgCode('E', '0001', [exception.code])),
      host,
    );
  }
}
