import { Global, Module } from '@nestjs/common';
import { MessageService } from '@modules/message/service/message.service';
import { MessageGroupService } from '@modules/message/service/message-group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from '@modules/message/entity/message.entity';
import { MessageGroupEntity } from '@modules/message/entity/message-group.entity';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { MessageRepository } from '@modules/message/repository/message.repository';
import { MessageGroupRepository } from '@modules/message/repository/message-group.repository';
import { MessageResolver } from '@modules/message/resolver/message.resolver';
import { MessageGroupResolver } from '@modules/message/resolver/message-group.resolver';

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
