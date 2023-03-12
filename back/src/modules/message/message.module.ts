import { Global, Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './resolvers/message.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './models/Message';
import { MessageGroup } from './models/MessageGroup';
import { MessageGroupResolver } from './resolvers/messageGroup.resolver';

@Global()
@Module({
  exports: [MessageService],
  imports: [TypeOrmModule.forFeature([Message, MessageGroup])],
  providers: [MessageResolver, MessageGroupResolver, MessageService],
})
export class MessageModule {}
