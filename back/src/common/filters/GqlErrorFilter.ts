import { GqlError } from '@common/errors/GqlError';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { MessageService } from '@modules/message/services/message.service';

@Catch(GqlError)
export class GqlErrorFilter implements ExceptionFilter {
  constructor(private ms: MessageService) {}
  async catch(e: GqlError, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const msgCode = e.msgCode!;
    const r = await this.ms.getTextByMsgCode(e.msgCode);

    console.log(msgCode);
    if (r.result) {
      e.setMessage(r.text);
    } else {
      e.setMessage(
        `메세지 코드를 찾을 수 없습니다.(${msgCode.groupCode}, ${msgCode.code})`,
      );
    }

    return e;
  }
}
