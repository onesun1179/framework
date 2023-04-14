import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { MessageRepository } from '@modules/message/repositories/message.repository';
import { MsgCode } from '@modules/message/dto/msg-code';
import { Message } from '@modules/message/entities/message';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class MessageService {
  constructor(
    private messageRepository: MessageRepository,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  private readonly logger = new Logger(MessageService.name);

  async getMessageBySeqNo(seqNo: number): Promise<Message | null> {
    return (
      (await this.cache.get<Message>(`message|${seqNo}`)) ??
      (await (async () => {
        const msg = await this.messageRepository.findOne({
          where: {
            seqNo,
          },
        });
        msg && (await this.cache.set(`message|${seqNo}`, msg));
        return msg;
      })())
    );
  }
  async getMessageByCode(
    groupCode: string,
    code: string,
  ): Promise<Message | null> {
    return await this.messageRepository.findOne({
      where: {
        groupCode,
        code,
      },
    });
  }

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
    const msg = await this.messageRepository.findOne({
      where: {
        groupCode: msgCode.groupCode,
        code: msgCode.code,
      },
    });

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
