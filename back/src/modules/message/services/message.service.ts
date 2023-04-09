import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { MessageRepository } from '@modules/message/repositories/message.repository';
import { MsgCode } from '@modules/message/dto/msg-code';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class MessageService {
  constructor(
    private messageRepository: MessageRepository,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  private readonly logger = new Logger(MessageService.name);

  async getTextByMsgCode(msgCode: MsgCode): Promise<{
    result: true;
    text: string;
  }>;
  async getTextByMsgCode(msgCode: MsgCode): Promise<{
    result: false;
    text: null;
  }>;

  async getTextByMsgCode(msgCode: MsgCode): Promise<{
    result: boolean;
    text: string | null;
  }> {
    console.log(msgCode);
    const msg = await this.messageRepository.findOne({
      where: {
        groupCode: msgCode.groupCode,
        code: msgCode.code,
      },
    });

    console.log(msgCode);
    if (msg) {
      return {
        result: true,
        text: msgCode.text(msg.text),
      };
    } else {
      return {
        result: false,
        text: null,
      };
    }
  }
}
