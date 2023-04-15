import { Global, Module } from '@nestjs/common';
import { MessageGroupService, MessageService } from '@modules/message/service';
import {
  MessageGroupResolver,
  MessageResolver,
} from '@modules/message/resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity, MessageGroupEntity } from '@modules/message/entity';
import {
  MessageGroupRepository,
  MessageRepository,
} from '@modules/message/repository';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';

@Global()
@Module({
  exports: [MessageService, MessageGroupService],
  imports: [
    TypeOrmModule.forFeature([MessageEntity, MessageGroupEntity]),
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
