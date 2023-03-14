import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';
import { MessageGroup } from './message-group';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType()
export class Message extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo: number;

  @Column()
  @Field()
  text: string;

  @Column()
  @Field()
  messageGroupCode: string;

  @ManyToOne(() => MessageGroup, (o) => o.messages)
  @JoinColumn({
    name: 'message_group_code',
  })
  messageGroup: MessageGroup;
}
