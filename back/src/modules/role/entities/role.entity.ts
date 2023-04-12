import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { User } from '@modules/user/models/user';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { RoleGroup } from './role-group.entity';
import { RoleRouteMap } from '@modules/role/entities/role-route-map.entity';
import { MenuRoleMap } from '@modules/menu/model/menu-role-map';
import { RoleFrontComponentMap } from '@modules/role/entities/role-front-component-map.entity';
import { Nullable } from '@common/types';

@Entity()
@InputType({
  isAbstract: true,
})
@ObjectType('GqlRole')
export class Role extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo!: number;

  @Column()
  @Field()
  name!: string;

  @Column({
    nullable: true,
    update: false,
  })
  @Field(() => String, {
    nullable: true,
  })
  identifier?: string;

  @Column({
    nullable: true,
  })
  @Field(() => Int, {
    nullable: true,
  })
  roleGroupSeqNo?: Nullable<number>;

  @ManyToOne(() => RoleGroup, (o) => o.roles, {
    nullable: true,
  })
  @JoinColumn({
    name: 'role_group_seq_no',
  })
  roleGroup?: Nullable<RoleGroup>;

  @OneToMany(() => User, (o) => o.role, {
    nullable: true,
  })
  users?: Nullable<User[]>;

  @OneToMany(() => MenuRoleMap, (o) => o.role)
  menuRoleMaps!: MenuRoleMap[];

  @OneToMany(() => RoleRouteMap, (o) => o.route, {
    nullable: true,
  })
  roleRouteMaps?: Nullable<Array<RoleRouteMap>>;

  @OneToMany(() => RoleFrontComponentMap, (o) => o.role, {
    nullable: true,
  })
  roleFrontComponentMaps?: Nullable<Array<RoleFrontComponentMap>>;
}
