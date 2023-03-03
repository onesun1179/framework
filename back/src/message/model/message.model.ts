import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MessageEntity } from '../entity/message.entity';

@ObjectType()
export class Message implements Pick<MessageEntity, 'msg'> {
  @Field(() => Int)
  _id: number;

  @Field()
  msg: string;

  @Field()
  id: string;
}
