import { GqlError } from '@common/error/GqlError';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { MessageService } from '@modules/message/service';

@Catch(GqlError)
export class GqlErrorFilter implements ExceptionFilter {
  constructor(private ms: MessageService) {}

  async catch(e: GqlError, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);

    const { groupCode, code } = e.msgCode!;
    const r = await this.ms.getMessageByCode(groupCode, code);

    if (r) {
      e.setMessage(e.msgCode.text(r.text));
    } else {
      e.setMessage(`메세지 코드를 찾을 수 없습니다.(${groupCode}, ${code})`);
    }

    return e;
  }
}
