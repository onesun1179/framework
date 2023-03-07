import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './models/Message';
import { MessageGroup } from './models/MessageGroup';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(MessageGroup)
    private messageGroupRepository: Repository<MessageGroup>,
  ) {}
  private readonly logger = new Logger(MessageService.name);

  getMessageRepository() {
    return this.messageRepository;
  }
  getMessageGroupRepository() {
    return this.messageGroupRepository;
  }
}
