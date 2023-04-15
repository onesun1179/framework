import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { CommonEntity } from '@common/entity';
import { MessageGroupEntity } from '@modules/message/entity';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

@Entity('message')
@InputType({
  isAbstract: true,
})
@ObjectType()
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

  @Column({
    nullable: true,
  })
  @Field({
    nullable: true,
  })
  @IsOptional()
  @IsNotEmpty()
  groupCode?: string;

  @ManyToOne(() => MessageGroupEntity, (o) => o.messages, {
    nullable: true,
  })
  @JoinColumn({
    name: 'group_code',
  })
  @Type(() => MessageGroupEntity)
  group?: MessageGroupEntity;
}
