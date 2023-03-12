import { Injectable, Logger } from '@nestjs/common';
import { InsertMessageGroupRequest } from './models/request/InsertMessageGroup.request';
import { UpdateMessageGroupRequest } from './models/request/UpdateMessageGroup.request';
import { Message } from './models/Message';
import { DataSource, In } from 'typeorm';
import { MessageGroup } from './models/MessageGroup';
import { InsertMessageRequest } from './models/request/InsertMessage.request';
import { UpdateMessageRequest } from './models/request/UpdateMessage.request';

@Injectable()
export class MessageService {
  constructor(private dataSource: DataSource) {}
  private readonly logger = new Logger(MessageService.name);

  async saveMessageGroup(
    p: InsertMessageGroupRequest | UpdateMessageGroupRequest,
  ): Promise<MessageGroup> {
    return await this.dataSource.manager.transaction(async (entityManager) => {
      const messageGroup = await entityManager.save(MessageGroup, {
        name: p.name,
      });

      if (p.messageSeqNos.length > 0) {
        await Message.update(
          {
            seqNo: In(p.messageSeqNos),
          },
          {
            messageGroup,
          },
        );
      }

      return messageGroup;
    });
  }

  async saveMessage(
    p: InsertMessageRequest | UpdateMessageRequest,
  ): Promise<Message> {
    this.logger.log({ ...p });
    return await Message.save({
      seqNo: p instanceof UpdateMessageRequest ? p.seqNo : undefined,
      text: p.text,
      messageGroupCode: p.messageGroupCode,
    });
  }
}
