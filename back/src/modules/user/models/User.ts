import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';
import { Role } from '../../role/model/Role';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { UtilField } from '@util/Util.field';

@Entity()
@InputType({
  isAbstract: true,
  description: UtilField.getFieldComment('user'),
})
@ObjectType({
  description: UtilField.getFieldComment('user'),
})
export class User extends CommonEntity {
  @PrimaryColumn({
    type: 'varchar',
    length: 50,
    comment: UtilField.getFieldComment('user', 'id'),
  })
  @Field({
    description: UtilField.getFieldComment('user', 'id'),
  })
  id: string;

  @Column({
    comment: UtilField.getFieldComment('role', 'seqNo'),
  })
  @Field(() => Int, {
    description: UtilField.getFieldComment('role', 'seqNo'),
  })
  roleSeqNo: Role['seqNo'];

  @ManyToOne(() => Role, (o) => o.users)
  @Field(() => Role, {
    description: UtilField.getFieldComment('role'),
  })
  role: Role;
}
