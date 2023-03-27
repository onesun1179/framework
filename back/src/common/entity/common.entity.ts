import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  isAbstract: true,
})
export class CommonEntity extends BaseEntity {
  @Field()
  @CreateDateColumn({
    type: 'timestamp',
    comment: '생성시간',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({
    type: 'timestamp',
    comment: '수정시간',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Field({
    nullable: true,
  })
  @Column({
    type: 'text',
    comment: '비고',
    nullable: true,
  })
  desc: string;
}
