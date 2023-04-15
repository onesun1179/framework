import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '@common/entity';
import { CodeMapEntity } from '@modules/code/entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

@Entity('code')
@ObjectType()
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
