import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './model/Message';
import { MessageGroup } from './model/MessageGroup';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageEntityRepository: Repository<Message>,
    @InjectRepository(MessageGroup)
    private messageGroupEntityRepository: Repository<MessageGroup>,
  ) {}

  getMessageById(id: Message['id']) {
    return this.messageEntityRepository;
  }
}
