import { Global, Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './resolvers/message.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './models/message';
import { MessageGroup } from './models/message-group';
import { MessageGroupResolver } from './resolvers/message-group.resolver';

@Global()
@Module({
  exports: [MessageService],
  imports: [TypeOrmModule.forFeature([Message, MessageGroup])],
  providers: [MessageResolver, MessageGroupResolver, MessageService],
})
export class MessageModule {}
