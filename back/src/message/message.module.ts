import { Global, Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './model/Message';
import { MessageGroup } from './model/MessageGroup';

@Global()
@Module({
  exports: [MessageService],
  imports: [TypeOrmModule.forFeature([Message, MessageGroup])],
  providers: [MessageResolver, MessageService],
})
export class MessageModule {}
