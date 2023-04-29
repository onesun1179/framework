import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CommonEntity } from '@common/entity/common.entity';
import { CodeMapOutput } from './code-map.output';

@Entity('code')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class CodeOutput extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo!: number;

  @Column({
    unique: true,
  })
  @Field()
  name!: string;

  @OneToMany(() => CodeMapOutput, (o) => o.child, {
    nullable: true,
  })
  @Type(() => CodeMapOutput)
  children?: Array<CodeMapOutput>;

  @OneToMany(() => CodeMapOutput, (o) => o.parent, {
    nullable: true,
  })
  @Type(() => CodeMapOutput)
  parents?: Array<CodeMapOutput>;
}
