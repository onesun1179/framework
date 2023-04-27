import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { IsInt, IsNotEmpty, MaxLength } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CommonEntity } from '@common/entity/common.entity';
import { MessageGroupOutput } from '@modules/message/dto/output/entity/message-group.output';

@Entity('message')
@InputType({
  isAbstract: true,
})
@ObjectType()
@Unique(['code', 'groupCode'])
export class MessageOutput extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field()
  @IsInt()
  seqNo!: number;

  @Column({
    type: 'char',
    length: '4',
    update: false,
  })
  @IsNotEmpty()
  @MaxLength(4)
  @Field()
  code!: string;

  @Column()
  @Field()
  @IsNotEmpty()
  name!: string;

  @Column()
  @Field()
  @IsNotEmpty()
  text!: string;

  @Column({
    update: false,
  })
  @Field()
  @IsNotEmpty()
  groupCode!: string;

  @ManyToOne(() => MessageGroupOutput, (o) => o.messages)
  @JoinColumn({
    name: 'group_code',
  })
  @Type(() => MessageGroupOutput)
  group!: MessageGroupOutput;
}
