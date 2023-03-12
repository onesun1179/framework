import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';
import { Message } from './message';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UtilField } from '@util/Util.field';

@Entity()
@InputType({
  isAbstract: true,
  description: UtilField.getFieldComment('msg', 'group'),
})
@ObjectType({
  description: UtilField.getFieldComment('msg', 'group'),
})
export class MessageGroup extends CommonEntity {
  @PrimaryGeneratedColumn({
    comment: UtilField.getFieldComment('msg', 'group', 'cd'),
  })
  @Field({
    description: UtilField.getFieldComment('msg', 'group', 'cd'),
  })
  seqNo: string;

  @Column({
    comment: UtilField.getFieldComment('msg', 'group', 'name'),
  })
  @Field({
    description: UtilField.getFieldComment('msg', 'group', 'name'),
  })
  name: string;

  @OneToMany(() => Message, (o) => o.messageGroup)
  messages: Message[];
}
