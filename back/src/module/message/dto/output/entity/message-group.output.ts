import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { CommonEntity } from '@common/entity/common.entity';
import { MessageOutput } from '@modules/message/dto/output/entity/message.output';

@Entity('message_group')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class MessageGroupOutput extends CommonEntity {
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

  @OneToMany(() => MessageOutput, (o) => o.group, {
    nullable: true,
  })
  @Type(() => MessageOutput)
  messages?: Array<MessageOutput>;
}
