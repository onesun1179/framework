import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { Message } from './message';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UtilField } from '@common/utils/util.field';
import { MaxLength } from 'class-validator';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType('GqlMessageGroup', {
  description: UtilField.getFieldComment('message', 'group'),
})
export class MessageGroup extends CommonEntity {
  @MaxLength(3)
  @PrimaryColumn({
    type: 'varchar',
    length: 3,
    comment: UtilField.getFieldComment('code'),
  })
  @Field({
    description: UtilField.getFieldComment('code'),
  })
  code!: string;

  @Column({
    comment: UtilField.getFieldComment('name'),
  })
  @Field({
    description: UtilField.getFieldComment('name'),
  })
  name!: string;

  @OneToMany(() => Message, (o) => o.group, {
    nullable: true,
  })
  messages?: Message[];
}
