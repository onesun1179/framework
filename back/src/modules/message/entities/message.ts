import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { MessageGroup } from './message-group';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UtilField } from '@common/utils/util.field';
import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType('GqlMessage', {
  description: UtilField.getFieldComment('message'),
})
@Unique(['code', 'groupCode'])
export class Message extends CommonEntity {
  @PrimaryGeneratedColumn({
    comment: UtilField.getFieldComment('seqNo'),
  })
  @Field({
    description: UtilField.getFieldComment('seqNo'),
  })
  @IsInt()
  seqNo: number;

  @Column({
    type: 'char',
    length: '4',
    comment: UtilField.getFieldComment('code'),
  })
  @IsString()
  @MaxLength(4)
  @MinLength(4)
  @Field({
    description: UtilField.getFieldComment('code'),
  })
  code: string;

  @Column({
    comment: UtilField.getFieldComment('name'),
  })
  @Field({
    description: UtilField.getFieldComment('name'),
  })
  @IsString()
  name: string;

  @Column({
    comment: UtilField.getFieldComment('text'),
  })
  @Field({
    description: UtilField.getFieldComment('text'),
  })
  @IsString()
  text: string;

  @Column({
    comment: UtilField.getFieldComment('group', 'code'),
    nullable: true,
  })
  @Field({
    description: UtilField.getFieldComment('group', 'code'),
    nullable: true,
  })
  @IsOptional()
  @IsString()
  groupCode?: string;

  @ManyToOne(() => MessageGroup, (o) => o.messages, {
    nullable: true,
  })
  @JoinColumn({
    name: 'group_code',
  })
  group?: MessageGroup;
}
