import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';
import { MessageGroup } from './MessageGroup';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { UtilField } from '@util/Util.field';

@Entity()
@InputType({
  isAbstract: true,
  description: UtilField.getFieldComment('msg'),
})
@ObjectType({
  description: UtilField.getFieldComment('msg'),
})
export class Message extends CommonEntity {
  @PrimaryGeneratedColumn({
    comment: UtilField.getFieldComment('msg', 'seqNo'),
  })
  @Field(() => Int, {
    description: UtilField.getFieldComment('msg', 'seqNo'),
  })
  seqNo: number;

  @Column({
    comment: UtilField.getFieldComment('msg', 'content'),
  })
  @Field({
    description: UtilField.getFieldComment('msg', 'content'),
  })
  text: string;

  @Column({
    comment: UtilField.getFieldComment('msg', 'group', 'code'),
  })
  @Field({
    description: UtilField.getFieldComment('msg', 'group', 'code'),
  })
  messageGroupCode: string;

  @ManyToOne(() => MessageGroup, (o) => o.messages)
  @JoinColumn({
    name: 'message_group_code',
  })
  messageGroup: MessageGroup;
}
