import { Global, Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entity/message.entity';
import { MessageGroupEntity } from './entity/messageGroup.entity';

@Global()
@Module({
  exports: [MessageService],
  imports: [TypeOrmModule.forFeature([MessageEntity, MessageGroupEntity])],
  providers: [MessageResolver, MessageService],
})
export class MessageModule {}
