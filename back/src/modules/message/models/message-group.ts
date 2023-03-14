import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';
import { Message } from './message';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType()
export class MessageGroup extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field()
  seqNo: string;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Message, (o) => o.messageGroup)
  messages: Message[];
}
