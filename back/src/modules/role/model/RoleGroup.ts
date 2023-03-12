import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../../../common/entity/common.entity';
import { Role } from './Role';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { UtilField } from '@util/Util.field';

@Entity()
@InputType({
  isAbstract: true,
  description: UtilField.getFieldComment('role', 'group'),
})
@ObjectType({
  description: UtilField.getFieldComment('role', 'group'),
})
export class RoleGroup extends CommonEntity {
  @PrimaryGeneratedColumn({
    comment: UtilField.getFieldComment('role', 'group', 'seqNo'),
  })
  @Field(() => Int, {
    description: UtilField.getFieldComment('role', 'group', 'seqNo'),
  })
  seqNo: number;

  @Column({
    nullable: false,
    comment: UtilField.getFieldComment('role', 'group', 'name'),
  })
  @Field({
    description: UtilField.getFieldComment('role', 'group', 'name'),
    nullable: false,
  })
  name: string;

  @OneToMany(() => Role, (o) => o.roleGroup)
  roles: Role[];

  @OneToMany(() => RoleGroup, (o) => o.parent)
  children: RoleGroup[];

  @Column({
    comment: UtilField.getFieldComment('role', 'group', 'parent', 'seqNo'),
  })
  @Field(() => Int, {
    nullable: true,
    description: UtilField.getFieldComment('role', 'group', 'parent', 'seqNo'),
  })
  parentSeqNo?: number;

  @ManyToOne(() => RoleGroup, (o) => o.children, {
    nullable: true,
  })
  @JoinColumn({
    name: 'parent_seq_no',
  })
  parent?: RoleGroup;
}
