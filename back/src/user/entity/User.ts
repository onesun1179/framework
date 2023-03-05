import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { Auth } from '../../auth/model/Auth';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User extends CommonEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 50,
  })
  @Field()
  id: string;

  @ManyToOne(() => Auth, (o) => o.userList)
  @Field(() => Auth)
  auth: Auth;
}
