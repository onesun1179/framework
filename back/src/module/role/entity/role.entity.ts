import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '@common/entity';
import { UserEntity } from '@modules/user/entity';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  RoleFrontComponentMapEntity,
  RoleGroupEntity,
  RoleRouteMapEntity,
} from '@modules/role/entity';
import { MenuRoleMapEntity } from '@modules/menu/entity';
import { Nullable } from 'src/common/type';

@Entity('role')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class RoleEntity extends CommonEntity {
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

  @ManyToOne(() => RoleGroupEntity, (o) => o.roles, {
    nullable: true,
  })
  @JoinColumn({
    name: 'role_group_seq_no',
  })
  roleGroup?: Nullable<RoleGroupEntity>;

  @OneToMany(() => UserEntity, (o) => o.role, {
    nullable: true,
  })
  users?: Nullable<UserEntity[]>;

  @OneToMany(() => MenuRoleMapEntity, (o) => o.role)
  menuRoleMaps!: MenuRoleMapEntity[];

  @OneToMany(() => RoleRouteMapEntity, (o) => o.route, {
    nullable: true,
  })
  roleRouteMaps?: Nullable<Array<RoleRouteMapEntity>>;

  @OneToMany(() => RoleFrontComponentMapEntity, (o) => o.role, {
    nullable: true,
  })
  roleFrontComponentMaps?: Nullable<Array<RoleFrontComponentMapEntity>>;
}
