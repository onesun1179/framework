import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class AppMetadata extends CommonEntity {
  @PrimaryColumn()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  value: string;
}
