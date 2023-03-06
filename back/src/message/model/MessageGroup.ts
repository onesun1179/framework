import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { Message } from './Message';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class MessageGroup extends CommonEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 5,
  })
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Message, (o) => o.messageGroup)
  @Field(() => [Message])
  messageList: Message[];
}
