import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { IsInt, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CommonEntity } from '@common/entity/common.entity';
import { MessageGroupEntity } from '@modules/message/dto/output/entity/message-group.entity';

@Entity('message')
@InputType({
  isAbstract: true,
})
@ObjectType(`MessageEntityOutput`)
@Unique(['code', 'groupCode'])
export class MessageEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field()
  @IsInt()
  seqNo!: number;

  @Column({
    type: 'char',
    length: '4',
  })
  @IsNotEmpty()
  @MaxLength(4)
  @MinLength(4)
  @Field({})
  code!: string;

  @Column()
  @Field()
  @IsNotEmpty()
  name!: string;

  @Column()
  @Field()
  @IsNotEmpty()
  text!: string;

  @Column()
  @Field()
  @IsNotEmpty()
  groupCode!: string;

  @ManyToOne(() => MessageGroupEntity, (o) => o.messages)
  @JoinColumn({
    name: 'group_code',
  })
  @Type(() => MessageGroupEntity)
  group!: MessageGroupEntity;

  @Column({
    type: 'boolean',
    default: false,
  })
  @Field(() => Boolean)
  sysYn!: boolean;
}
