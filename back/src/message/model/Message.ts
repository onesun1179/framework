import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { MessageGroup } from './MessageGroup';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Message extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  msg: string;

  @Column({
    type: 'varchar',
    length: 5,
  })
  @Field()
  messageGroupId: string;

  @ManyToOne(() => MessageGroup, (o) => o.messageList)
  messageGroup: MessageGroup;
}
