import { Global, Module } from '@nestjs/common';
import { MessageService } from '@modules/message/service/message.service';
import { MessageGroupService } from '@modules/message/service/message-group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from '@modules/message/dto/output/entity/message.entity';
import { MessageGroupEntity } from '@modules/message/dto/output/entity/message-group.entity';
import { TypeOrmExModule } from '@common/module/TypeOrmExModule';
import { MessageEntityRepository } from '@modules/message/repository/message-entity.repository';
import { MessageGroupEntityRepository } from '@modules/message/repository/message-group-entity.repository';
import { MessageEntityResolver } from '@modules/message/resolver/message-entity.resolver';
import { MessageGroupEntityResolver } from '@modules/message/resolver/message-group-entity.resolver';

@Global()
@Module({
  exports: [MessageService, MessageGroupService],
  imports: [
    TypeOrmModule.forFeature([MessageEntity, MessageGroupEntity]),
    TypeOrmExModule.forCustomRepository([
      MessageEntityRepository,
      MessageGroupEntityRepository,
    ]),
  ],
  providers: [
    MessageEntityResolver,
    MessageGroupEntityResolver,
    MessageService,
    MessageGroupService,
  ],
})
export class MessageModule {}
