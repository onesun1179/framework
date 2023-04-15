import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { CommonEntity } from '@common/entity/common.entity';
import { MessageEntity } from '@modules/message/entity/message.entity';

@Entity('message_group')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class MessageGroupEntity extends CommonEntity {
  @MaxLength(3)
  @PrimaryColumn({
    type: 'varchar',
    length: 3,
  })
  @Field()
  code!: string;

  @Column()
  @Field()
  name!: string;

  @OneToMany(() => MessageEntity, (o) => o.group, {
    nullable: true,
  })
  @Type(() => MessageEntity)
  messages?: Array<MessageEntity>;
}
