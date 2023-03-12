import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';
import { CodeTree } from './code-tree';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Code extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => CodeTree, (o) => o.child)
  @Field(() => [CodeTree])
  children: CodeTree[];

  @OneToMany(() => CodeTree, (o) => o.parent)
  @Field(() => [CodeTree])
  parents: CodeTree[];
}
