import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { Auth } from '../../auth/model/Auth';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType({
  description: '사용자',
})
export class User extends CommonEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 50,
    comment: '사용자 식별자',
  })
  @Field({
    description: '사용자 식별자',
  })
  id: string;

  @Column({
    comment: '권한 일련번호',
  })
  @Field(() => Int, {
    description: '권한 일련번호',
  })
  authSeqNo: Auth['seqNo'];

  @ManyToOne(() => Auth, (o) => o.users)
  @Field(() => Auth, {
    description: '권한',
  })
  auth: Auth;
}
