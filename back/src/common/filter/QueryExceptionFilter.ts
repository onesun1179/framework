import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { GqlError } from '@common/error/GqlError';
import { GqlErrorFilter } from '@common/filter/GqlErrorFilter';
import { MessageService } from '@modules/message/service/message.service';
import { MsgCode } from '@modules/message/dto/msg-code';

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
