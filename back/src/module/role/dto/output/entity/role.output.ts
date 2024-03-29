import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Nullable } from '@common/type';
import { CommonEntity } from '@common/entity/common.entity';
import { RoleGroupOutput } from '@modules/role/dto/output/entity/role-group.output';
import { UserOutput } from '@modules/user/dto/output/entity/user.output';
import { MenuRoleMapEntity } from '@modules/menu/dto/output/entity/menu-role-map.entity';
import { RoleRouteMapOutput } from '@modules/role/dto/output/entity/role-route-map.output';
import { RoleFrontComponentMapOutput } from '@modules/role/dto/output/entity/role-front-component-map.output';
import { Type } from 'class-transformer';

@Entity('role')
@InputType({
  isAbstract: true,
})
@ObjectType()
export class RoleOutput extends CommonEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  seqNo!: number;

  @Column()
  @Field()
  name!: string;

  @Column({
    nullable: true,
    update: false,
    unique: true,
  })
  @Field(() => String, {
    nullable: true,
  })
  identifier?: string;

  @Column({
    nullable: false,
  })
  @Field(() => Int)
  roleGroupSeqNo!: number;

  @ManyToOne(() => RoleGroupOutput, (o) => o.roles)
  @JoinColumn({
    name: 'role_group_seq_no',
  })
  @Type(() => RoleGroupOutput)
  roleGroup!: RoleGroupOutput;

  @OneToMany(() => UserOutput, (o) => o.role, {
    nullable: true,
  })
  @Type(() => UserOutput)
  users?: Nullable<UserOutput[]>;

  @OneToMany(() => MenuRoleMapEntity, (o) => o.role)
  @Type(() => MenuRoleMapEntity)
  menuRoleMaps!: MenuRoleMapEntity[];

  @OneToMany(() => RoleRouteMapOutput, (o) => o.route, {
    nullable: true,
  })
  @Type(() => RoleRouteMapOutput)
  roleRouteMaps?: Nullable<Array<RoleRouteMapOutput>>;

  @OneToMany(() => RoleFrontComponentMapOutput, (o) => o.role, {
    nullable: true,
  })
  @Type(() => RoleFrontComponentMapOutput)
  roleFrontComponentMaps?: Nullable<Array<RoleFrontComponentMapOutput>>;
}
