import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { Message } from './message';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType('GqlMessageGroup')
export class MessageGroup extends CommonEntity {
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

  @OneToMany(() => Message, (o) => o.group, {
    nullable: true,
  })
  messages?: Message[];
}
