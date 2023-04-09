import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { CodeMap } from './code-map.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType('GqlCode')
export class Code extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo!: number;

  @Column()
  @Field()
  name!: string;

  @OneToMany(() => CodeMap, (o) => o.child, {
    nullable: true,
  })
  @Field(() => [CodeMap], {
    nullable: true,
  })
  children?: CodeMap[];

  @OneToMany(() => CodeMap, (o) => o.parent, {
    nullable: true,
  })
  @Field(() => [CodeMap], {
    nullable: true,
  })
  parents?: CodeMap[];
}
