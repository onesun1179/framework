import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType({
  description: '앱 메타 데이터',
})
export class AppMetadata extends CommonEntity {
  @PrimaryColumn({
    comment: '앱 메타 데이터 명',
  })
  @Field(() => String, {
    description: '앱 메타 데이터 명',
  })
  name: string;

  @Column({
    comment: '앱 메타 데이터 값',
  })
  @Field(() => String, {
    description: '앱 메타 데이터 값',
  })
  value: string;
}
