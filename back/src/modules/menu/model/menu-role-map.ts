import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Role } from '@modules/role/model/role';
import { CommonEntity } from '../../../common/entity/common.entity';
import { Menu } from './menu';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType()
export class MenuRoleMap extends CommonEntity {
  @PrimaryColumn()
  @Field(() => Int)
  menuSeqNo: number;

  @PrimaryColumn()
  @Field(() => Int)
  roleSeqNo: number;

  @ManyToOne(() => Menu, (o) => o.menuRoleMaps)
  @Field(() => Menu)
  @JoinColumn({
    name: 'menu_seq_no',
  })
  menu: Menu;

  @ManyToOne(() => Role, (o) => o.menuRoleMaps)
  @Field(() => Role)
  @JoinColumn({
    name: 'role_seq_no',
  })
  role: Role;
}
