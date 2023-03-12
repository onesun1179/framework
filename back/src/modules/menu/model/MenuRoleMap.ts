import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Role } from '../../role/model/Role';
import { CommonEntity } from '../../../common/entity/common.entity';
import { Menu } from './Menu';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { UtilField } from '@util/Util.field';

@Entity()
@InputType({
  isAbstract: true,
  description: UtilField.getFieldComment('menu', 'role', 'map'),
})
@ObjectType({
  description: UtilField.getFieldComment('menu', 'role', 'map'),
})
export class MenuRoleMap extends CommonEntity {
  @PrimaryColumn({
    comment: UtilField.getFieldComment('menu', 'seqNo'),
  })
  @Field(() => Int, {
    description: UtilField.getFieldComment('menu', 'seqNo'),
  })
  menuSeqNo: number;

  @PrimaryColumn({
    comment: UtilField.getFieldComment('role', 'seqNo'),
  })
  @Field(() => Int, {
    description: UtilField.getFieldComment('role', 'seqNo'),
  })
  roleSeqNo: number;

  @ManyToOne(() => Menu, (o) => o.menuRoleMaps)
  @Field(() => Menu, {
    description: UtilField.getFieldComment('menu'),
  })
  @JoinColumn({
    name: 'menu_seq_no',
  })
  menu: Menu;

  @ManyToOne(() => Role, (o) => o.menuRoleMaps)
  @Field(() => Role, {
    description: UtilField.getFieldComment('role'),
  })
  @JoinColumn({
    name: 'role_seq_no',
  })
  role: Role;
}
