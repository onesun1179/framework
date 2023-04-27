import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CommonEntity } from '@common/entity/common.entity';
import { CodeMapEntity } from './code-map.entity';

@Entity('code')
@ObjectType(`CodeEntityOutput`)
export class CodeEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo!: number;

  @Column()
  @Field()
  name!: string;

  @OneToMany(() => CodeMapEntity, (o) => o.child, {
    nullable: true,
  })
  @Field(() => [CodeMapEntity], {
    nullable: true,
  })
  @Type(() => CodeMapEntity)
  children?: Array<CodeMapEntity>;

  @OneToMany(() => CodeMapEntity, (o) => o.parent, {
    nullable: true,
  })
  @Field(() => [CodeMapEntity], {
    nullable: true,
  })
  @Type(() => CodeMapEntity)
  parents?: CodeMapEntity[];
}