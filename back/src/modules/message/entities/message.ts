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
import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType('GqlMessage')
@Unique(['code', 'groupCode'])
export class Message extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field()
  @IsInt()
  seqNo!: number;

  @Column({
    type: 'char',
    length: '4',
  })
  @IsString()
  @MaxLength(4)
  @MinLength(4)
  @Field({})
  code!: string;

  @Column()
  @Field()
  @IsString()
  name!: string;

  @Column()
  @Field()
  @IsString()
  text!: string;

  @Column({
    nullable: true,
  })
  @Field({
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
