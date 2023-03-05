import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { CodeTree } from './CodeTree';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Code extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => CodeTree, (o) => o.child)
  @Field(() => [CodeTree])
  childList: CodeTree[];

  @OneToMany(() => CodeTree, (o) => o.parent)
  @Field(() => [CodeTree])
  parentList: CodeTree[];
}
