import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class AppConfig extends CommonEntity {
  @PrimaryColumn()
  @Field()
  name: string;

  @Column()
  @Field()
  value: string;

  @Column()
  @Field()
  initialValue: string;
}
