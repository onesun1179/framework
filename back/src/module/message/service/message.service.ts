import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { MessageRepository } from '@modules/message/repository/message.repository';
import { MessageOutput } from '@modules/message/dto/output/entity/message.output';
import { MsgCode } from '@modules/message/dto/msg-code';
import { MessageGroupRepository } from '@modules/message/repository/message-group.repository';
import { MessageGroupsSearchInput } from '@modules/message/dto/input/message-groups-search.input';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { MessageGroupOutput } from '@modules/message/dto/output/entity/message-group.output';
import { UtilSearch } from '@common/util/Util.search';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(
    private messageRepository: MessageRepository,
    private messageGroupEntityRepository: MessageGroupRepository,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  static whereByMessageGroupsInput({
    name,
    code,
  }: MessageGroupsSearchInput): FindOptionsWhere<MessageGroupOutput> {
    return UtilSearch.getSearchWhere({
      name,
      code,
    });
  }

  async getMessageBySeqNo(seqNo: number): Promise<MessageOutput | null> {
    return (
      (await this.cache.get<MessageOutput>(`message|${seqNo}`)) ??
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
  ): Promise<MessageOutput | null> {
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
