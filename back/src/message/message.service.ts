import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './entity/message.entity';
import { MessageGroupEntity } from './entity/messageGroup.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageEntityRepository: Repository<MessageEntity>,
    @InjectRepository(MessageGroupEntity)
    private messageGroupEntityRepository: Repository<MessageGroupEntity>,
  ) {}

  getMessageById(id: MessageEntity['id']) {
    return this.messageEntityRepository;
  }
}
