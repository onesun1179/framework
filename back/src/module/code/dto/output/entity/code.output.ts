import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CommonEntity } from '@common/entity/common.entity';
import { CodeMapOutput } from './code-map.output';

@Entity('code')
@ObjectType(`CodeEntityOutput`)
export class CodeOutput extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo!: number;

  @Column()
  @Field()
  name!: string;

  @OneToMany(() => CodeMapOutput, (o) => o.child, {
    nullable: true,
  })
  @Field(() => [CodeMapOutput], {
    nullable: true,
  })
  @Type(() => CodeMapOutput)
  children?: Array<CodeMapOutput>;

  @OneToMany(() => CodeMapOutput, (o) => o.parent, {
    nullable: true,
  })
  @Field(() => [CodeMapOutput], {
    nullable: true,
  })
  @Type(() => CodeMapOutput)
  parents?: CodeMapOutput[];
}
