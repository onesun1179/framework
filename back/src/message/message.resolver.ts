import { Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './model/Message';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}
}
