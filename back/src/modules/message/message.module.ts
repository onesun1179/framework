import { Global, Module } from '@nestjs/common';
import { MessageService } from './services/message.service';
import { MessageResolver } from './resolvers/message.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message';
import { MessageGroup } from './entities/message-group';
import { MessageGroupResolver } from './resolvers/message-group.resolver';
import { MessageGroupService } from '@modules/message/services/message-group.service';
import { MessageRepository } from '@modules/message/repositories/message.repository';
import { MessageGroupRepository } from '@modules/message/repositories/message-group.repository';
import { TypeOrmExModule } from '@common/modules/TypeOrmExModule';

@Global()
@Module({
  exports: [MessageService, MessageGroupService],
  imports: [
    TypeOrmModule.forFeature([Message, MessageGroup]),
    TypeOrmExModule.forCustomRepository([
      MessageRepository,
      MessageGroupRepository,
    ]),
  ],
  providers: [
    MessageResolver,
    MessageGroupResolver,
    MessageService,
    MessageGroupService,
  ],
})
export class MessageModule {}
