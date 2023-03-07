import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { Message } from './Message';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType({
  description: '메세지 그룹',
})
export class MessageGroup extends CommonEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 5,
    comment: '메세지 그룹 코드',
  })
  @Field({
    description: '메세지 그룹 코드',
  })
  code: string;

  @Column({
    comment: '메세지 그룹명',
  })
  @Field({
    description: '메세지 그룹명',
  })
  name: string;

  @OneToMany(() => Message, (o) => o.messageGroup)
  @Field(() => [Message], {
    description: '메세지 목록',
  })
  messages: Message[];
}
