import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { MessageGroup } from './MessageGroup';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType({
  description: '메세지',
})
export class Message extends CommonEntity {
  @PrimaryGeneratedColumn({
    comment: '메세지 일련번호',
  })
  @Field(() => Int, {
    description: '메세지 일련번호',
  })
  seqNo: number;

  @Column({
    comment: '메세지 내용',
  })
  @Field({
    description: '메세지 내용',
  })
  msg: string;

  @Column({
    comment: '메세지 그룹 코드',
  })
  @Field({
    description: '메세지 그룹 코드',
  })
  messageGroupCode: string;

  @ManyToOne(() => MessageGroup, (o) => o.messages)
  @Field(() => MessageGroup, {
    description: '메세지 그룹',
  })
  @JoinColumn({
    name: 'message_group_code',
  })
  messageGroup: MessageGroup;
}
