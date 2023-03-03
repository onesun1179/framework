import { Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { MessageEntity } from './entity/message.entity';

@Resolver(() => MessageEntity)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}
}
