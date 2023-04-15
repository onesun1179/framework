import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { MessageRepository } from '@modules/message/repository/message.repository';
import { MessageEntity } from '@modules/message/entity/message.entity';
import { MsgCode } from '@modules/message/dto/msg-code';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(
    private messageRepository: MessageRepository,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async getMessageBySeqNo(seqNo: number): Promise<MessageEntity | null> {
    return (
      (await this.cache.get<MessageEntity>(`message|${seqNo}`)) ??
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
  ): Promise<MessageEntity | null> {
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
